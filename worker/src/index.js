import { DurableObject } from 'cloudflare:workers'

// Origens autorizadas a abrir o WebSocket de presença. O site roda no
// Cloudflare Pages (host padrão) e também no Netlify, então liberamos esses
// dois domínios + localhost para desenvolvimento.
const ORIGENS_EXATAS = new Set([
  'https://crismadeadultos.pages.dev',
  'http://localhost:5173',
  'http://localhost:4173',
])

function origemPermitida(origem) {
  if (!origem) return true // clientes sem header Origin (ex.: apps nativos)
  if (ORIGENS_EXATAS.has(origem)) return true
  try {
    const host = new URL(origem).hostname
    // Previews do Pages (hash.crismadeadultos.pages.dev) e o deploy Netlify.
    return host.endsWith('.pages.dev') || host.endsWith('.netlify.app')
  } catch {
    return false
  }
}

// Sala única de presença do site inteiro. Cada aba aberta mantém um WebSocket
// vivo; o número de conexões abertas = pessoas online agora. Usa a API de
// Hibernation, então o objeto "dorme" sem cobrar quando ninguém interage e
// acorda sozinho ao conectar/desconectar.
export class PresenceRoom extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env)
    // Responde "ping" -> "pong" automaticamente, sem acordar o DO. Mantém a
    // conexão viva através de proxies sem gastar requisições.
    this.ctx.setWebSocketAutoResponse(
      new WebSocketRequestResponsePair('ping', 'pong')
    )
  }

  async fetch() {
    const { 0: client, 1: server } = new WebSocketPair()
    this.ctx.acceptWebSocket(server)
    // Acabou de entrar mais alguém: avisa todo mundo do novo total.
    this.transmitir()
    return new Response(null, { status: 101, webSocket: client })
  }

  webSocketClose(ws) {
    // A conexão que está fechando ainda aparece em getWebSockets(); exclui ela.
    this.transmitir(ws)
  }

  webSocketError(ws) {
    this.transmitir(ws)
  }

  contar(excluir) {
    return this.ctx.getWebSockets().filter((s) => s !== excluir).length
  }

  transmitir(excluir) {
    const payload = JSON.stringify({ online: this.contar(excluir) })
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === excluir) continue
      try {
        ws.send(payload)
      } catch {
        // socket já caiu; ignora
      }
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/ws') {
      if (request.headers.get('Upgrade') !== 'websocket') {
        return new Response('Esperado um WebSocket', { status: 426 })
      }
      if (!origemPermitida(request.headers.get('Origin'))) {
        return new Response('Origem não autorizada', { status: 403 })
      }
      const stub = env.PRESENCE.getByName('global')
      return stub.fetch(request)
    }

    return new Response('Crisma — serviço de presença ativo.', {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  },
}

import { useEffect, useRef, useState } from 'react'

// Worker de presença no Cloudflare (Durable Object + WebSocket Hibernation).
const PRESENCE_URL = 'wss://crisma-presenca.ricardo-ds-goes.workers.dev/ws'

// Contador discreto de pessoas online agora. Mantém um WebSocket vivo com o
// Worker; o servidor avisa o total sempre que alguém entra ou sai.
export default function OnlineCounter() {
  const [online, setOnline] = useState(null)
  const wsRef = useRef(null)
  const reconnectRef = useRef(null)
  const heartbeatRef = useRef(null)
  const tentativasRef = useRef(0)
  const ativoRef = useRef(true)

  useEffect(() => {
    ativoRef.current = true

    function conectar() {
      if (!ativoRef.current) return
      let ws
      try {
        ws = new WebSocket(PRESENCE_URL)
      } catch {
        agendarReconexao()
        return
      }
      wsRef.current = ws

      ws.onopen = () => {
        tentativasRef.current = 0
        // Heartbeat: mantém a conexão viva através de proxies. O Worker
        // responde "pong" automaticamente, sem custo.
        heartbeatRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) ws.send('ping')
        }, 25000)
      }

      ws.onmessage = (e) => {
        try {
          const dados = JSON.parse(e.data)
          if (typeof dados.online === 'number') setOnline(dados.online)
        } catch {
          // mensagens não-JSON (ex.: "pong") são ignoradas
        }
      }

      ws.onclose = () => {
        clearInterval(heartbeatRef.current)
        agendarReconexao()
      }

      ws.onerror = () => {
        try {
          ws.close()
        } catch {
          /* já fechado */
        }
      }
    }

    function agendarReconexao() {
      if (!ativoRef.current) return
      tentativasRef.current += 1
      const espera = Math.min(30000, 1000 * 2 ** tentativasRef.current)
      reconnectRef.current = setTimeout(conectar, espera)
    }

    conectar()

    return () => {
      ativoRef.current = false
      clearTimeout(reconnectRef.current)
      clearInterval(heartbeatRef.current)
      if (wsRef.current) {
        wsRef.current.onclose = null
        try {
          wsRef.current.close()
        } catch {
          /* já fechado */
        }
      }
    }
  }, [])

  // Enquanto não conectou (ou conexão indisponível), não mostra nada.
  if (online === null || online < 1) return null

  return (
    <p className="flex items-center justify-center gap-1.5 text-xs text-[var(--color-text-muted)]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {online} {online === 1 ? 'pessoa online' : 'pessoas online'}
    </p>
  )
}

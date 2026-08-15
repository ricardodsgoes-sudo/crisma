// Gera src/data/imagensDim.js com a largura/altura real de cada imagem de
// public/. Essas dimensões vão para os atributos width/height das <img>, o que
// faz o navegador reservar o espaço antes da imagem chegar — sem isso o texto
// "pula" enquanto a página carrega (CLS).
//
// Rodar sempre que uma imagem nova for adicionada em public/:
//   npm run img:dims
//
// Se esquecer, nada quebra: a imagem sem entrada no mapa simplesmente volta ao
// comportamento antigo (sem espaço reservado).

import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const PUBLIC_DIR = 'public'
const SAIDA = 'src/data/imagensDim.js'
const EXTENSOES = /\.(webp|png|jpe?g|avif)$/i

const arquivos = (await readdir(PUBLIC_DIR)).filter((f) => EXTENSOES.test(f)).sort()

const entradas = []
for (const arquivo of arquivos) {
  try {
    const { width, height } = await sharp(join(PUBLIC_DIR, arquivo)).metadata()
    if (width && height) entradas.push([`/${arquivo}`, { width, height }])
  } catch {
    // imagem ilegível: fica de fora do mapa
  }
}

const corpo = entradas
  .map(([caminho, { width, height }]) => `  ${JSON.stringify(caminho)}: { width: ${width}, height: ${height} },`)
  .join('\n')

const conteudo = `// ARQUIVO GERADO — não editar à mão.
// Regenerar com: npm run img:dims  (script em scripts/gerar-dimensoes.mjs)
//
// Dimensões reais das imagens de public/, usadas nos atributos width/height
// das <img> para reservar o espaço e evitar o "pulo" de layout no carregamento.
export const IMAGENS_DIM = {
${corpo}
}

// Retorna { width, height } para usar direto na <img>, ou um objeto vazio se a
// imagem não estiver no mapa (nesse caso a <img> fica sem dimensão, como antes).
export function dimensoesDaImagem(caminho) {
  return IMAGENS_DIM[caminho] ?? {}
}
`

await writeFile(SAIDA, conteudo, 'utf8')
console.log(`${SAIDA}: ${entradas.length} imagens mapeadas`)

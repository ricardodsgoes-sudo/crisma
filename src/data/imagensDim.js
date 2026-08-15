// ARQUIVO GERADO — não editar à mão.
// Regenerar com: npm run img:dims  (script em scripts/gerar-dimensoes.mjs)
//
// Dimensões reais das imagens de public/, usadas nos atributos width/height
// das <img> para reservar o espaço e evitar o "pulo" de layout no carregamento.
export const IMAGENS_DIM = {
  "/01.webp": { width: 1028, height: 1529 },
  "/02.webp": { width: 1023, height: 1537 },
  "/03.webp": { width: 1024, height: 1536 },
  "/04.webp": { width: 630, height: 422 },
  "/05.webp": { width: 595, height: 396 },
  "/6 encontro imagem.webp": { width: 473, height: 634 },
  "/Deus Pai.webp": { width: 436, height: 290 },
  "/Espirito Santo.webp": { width: 417, height: 627 },
  "/apple-touch-icon.png": { width: 180, height: 180 },
  "/background-paper-red.webp": { width: 1600, height: 900 },
  "/batismo-jesus.webp": { width: 406, height: 485 },
  "/batismo.webp": { width: 418, height: 597 },
  "/brasao-logo.webp": { width: 160, height: 200 },
  "/celebração.webp": { width: 452, height: 604 },
  "/confirmacao.webp": { width: 440, height: 657 },
  "/crisma-capa.webp": { width: 560, height: 700 },
  "/crisma-capa@2x.webp": { width: 900, height: 1125 },
  "/deus-filho.webp": { width: 287, height: 342 },
  "/eucaristia.webp": { width: 900, height: 1275 },
  "/ilustração enconto 4.webp": { width: 591, height: 475 },
  "/jesus-eucaristia.webp": { width: 800, height: 1297 },
  "/jesus.webp": { width: 536, height: 489 },
  "/liturgia.webp": { width: 382, height: 572 },
  "/logo sem fundo.png": { width: 182, height: 228 },
  "/maria mae de deus.webp": { width: 826, height: 407 },
  "/nossa senhora.webp": { width: 516, height: 776 },
  "/pai nosso.webp": { width: 474, height: 592 },
  "/pomba.webp": { width: 383, height: 480 },
  "/pwa-192.png": { width: 192, height: 192 },
  "/pwa-512-maskable.png": { width: 512, height: 512 },
  "/pwa-512.png": { width: 512, height: 512 },
  "/sagrada-comunhao.webp": { width: 800, height: 1639 },
  "/santa igreja.webp": { width: 351, height: 533 },
  "/sete petições.webp": { width: 517, height: 776 },
  "/simbolos-batismo.webp": { width: 428, height: 627 },
  "/trindade 2.webp": { width: 491, height: 393 },
  "/trindade.webp": { width: 643, height: 428 },
  "/ultima-ceia.webp": { width: 800, height: 1478 },
}

// Retorna { width, height } para usar direto na <img>, ou um objeto vazio se a
// imagem não estiver no mapa (nesse caso a <img> fica sem dimensão, como antes).
export function dimensoesDaImagem(caminho) {
  return IMAGENS_DIM[caminho] ?? {}
}

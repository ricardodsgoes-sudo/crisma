// Imagem da capa completa (com fundo vermelho) — usada no hero da home
export function CrismaCapa({ className = '' }) {
  return (
    <img
      src="./crisma-capa.png"
      alt="Crisma de Adultos 2026 — Paróquia Maria Mãe de Deus"
      className={className}
      loading="eager"
      width="600"
      height="800"
    />
  )
}

// Brasão da paróquia com fundo transparente — navbar e rodapé
export function ParishCrest({ className = '' }) {
  return (
    <img
      src="./brasao-logo.png"
      alt="Brasão da Paróquia Maria Mãe de Deus"
      className={className}
      loading="lazy"
      width="200"
      height="240"
    />
  )
}

// Pomba do Espírito Santo com fundo transparente — ícones e decorações
export function DoveIcon({ className = '', style = {} }) {
  return (
    <img
      src="./pomba.png"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
      style={style}
      width="400"
      height="480"
      loading="lazy"
    />
  )
}

// Imagem da capa completa (com fundo vermelho) — usada no hero da home.
// Usa <picture> com srcset para servir 2x em telas Retina, mas mantém
// imagem leve no mobile. Webp dá ~50KB em vez dos 2MB do PNG original.
export function CrismaCapa({ className = '' }) {
  return (
    <img
      src="./crisma-capa.webp"
      srcSet="./crisma-capa.webp 1x, ./crisma-capa@2x.webp 2x"
      alt="Crisma de Adultos 2026 — Paróquia Maria Mãe de Deus"
      className={className}
      loading="eager"
      fetchPriority="high"
      width="561"
      height="701"
    />
  )
}

// Brasão da paróquia com fundo transparente — navbar e rodapé
export function ParishCrest({ className = '' }) {
  return (
    <img
      src="./logo sem fundo.png"
      alt="Brasão da Paróquia Maria Mãe de Deus"
      className={className}
      loading="lazy"
      width="182"
      height="228"
    />
  )
}

// Pomba do Espírito Santo com fundo transparente — ícones e decorações
export function DoveIcon({ className = '', style = {} }) {
  return (
    <img
      src="./pomba.webp"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
      style={style}
      width="383"
      height="480"
      loading="lazy"
    />
  )
}

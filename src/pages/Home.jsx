import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import MensagemEncerramento from '../components/MensagemEncerramento'
import { InstallAppCallout } from '../components/InstallAppButton'
import { CrismaCapa, DoveIcon } from '../components/Logo'
import { getEncontrosOrdenados } from '../data/encontros'

export default function Home() {
  const todosCarrossel = getEncontrosOrdenados()
  const encontroDestaque = todosCarrossel[todosCarrossel.length - 1]

  return (
    <PageTransition>
      <section className="relative bg-gradient-to-b from-[var(--color-surface-warm)] to-[var(--color-surface)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 sm:py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-center md:text-left order-1"
            >
              <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.28em] sm:tracking-[0.4em] uppercase text-[var(--color-gold-dark)] font-medium mb-3 sm:mb-4">
                Paróquia Maria Mãe de Deus
              </p>
              <h1
                className="text-4xl sm:text-5xl md:text-7xl text-[var(--color-primary)] mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600 }}
              >
                Crisma de Adultos
              </h1>
              <p
                className="text-lg sm:text-xl md:text-2xl text-[var(--color-gold-dark)] mb-5 sm:mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Uma caminhada de fé para toda a vida
              </p>

              <p className="font-quote italic text-base sm:text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
                "{encontroDestaque.versiculoDestaque}"
                <span className="block text-sm not-italic mt-1 text-[var(--color-text-muted)]">
                  — {encontroDestaque.versiculoRef}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  to={`/encontros/${todosCarrossel[0].numero}`}
                  className="crisma-primary-action w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full font-medium transition-all text-center shadow-lg hover:shadow-xl"
                >
                  Começar formação →
                </Link>
                <Link
                  to="/encontros"
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-medium hover:bg-[var(--color-primary)] hover:text-white transition-all text-center"
                >
                  Ver encontros
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="order-2 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[var(--color-primary)] blur-3xl opacity-20 rounded-full" />
                <CrismaCapa className="relative w-52 min-[390px]:w-60 sm:w-64 md:w-80 h-auto rounded-2xl shadow-2xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="text-white py-14 sm:py-16 md:py-20 relative overflow-hidden"
        style={{
          backgroundColor: '#C41230',
          backgroundImage: 'url("/background-paper-red.webp?v=1")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 50%',
        }}
      >
        <div className="absolute inset-0 bg-[#7E061D]/5" />
        <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-gold-light)]/35" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-gold-light)]/25" />
        <div className="pointer-events-none hidden sm:block absolute right-[-42px] md:right-[6vw] top-1/2 -translate-y-1/2 w-64 h-64 md:w-[360px] md:h-[360px] opacity-25 mix-blend-screen">
          <DoveIcon className="w-full h-full" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-8">
          <MensagemEncerramento />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold-dark)] font-medium">
            Para aprofundar sua fé
          </span>
          <h2 className="text-3xl md:text-4xl mt-2">Formação em destaque</h2>
          <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[var(--color-border)] overflow-hidden grid md:grid-cols-2"
        >
          <div className="red-paper-bg p-6 sm:p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden min-h-[300px] md:min-h-[320px]">
            <div className="pointer-events-none absolute right-[-78px] sm:right-[-54px] md:right-[-28px] top-1/2 -translate-y-1/2 w-72 h-72 md:w-[360px] md:h-[360px] opacity-[0.2] sm:opacity-[0.24] mix-blend-screen">
              <DoveIcon className="w-full h-full" />
            </div>
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-light)] font-semibold mb-3">
                Encontro {encontroDestaque.numero}
              </p>
              <h3
                className="text-3xl sm:text-4xl md:text-5xl text-[var(--color-gold-light)] mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  textShadow: '0 2px 10px rgba(0,0,0,0.18)',
                }}
              >
                {encontroDestaque.titulo}
              </h3>
              <p className="font-quote italic text-xl sm:text-2xl text-white/95 mb-6">
                {encontroDestaque.subtitulo}
              </p>
              <blockquote className="font-quote italic text-base sm:text-lg text-white border-l-2 border-[var(--color-gold-light)] pl-4 mt-6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
                "{encontroDestaque.versiculoDestaque}"
                <footer className="text-sm not-italic mt-2 text-[var(--color-gold-light)]">
                  — {encontroDestaque.versiculoRef}
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <h4 className="text-2xl mb-4">O que você vai ver</h4>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              {encontroDestaque.formacao.map((f) => (
                <li key={f.titulo} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full mt-2.5 flex-shrink-0" />
                  <span>{f.titulo}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col lg:flex-row gap-3 mt-8">
              <Link
                to={`/encontros/${encontroDestaque.numero}`}
                className="crisma-primary-action w-full lg:w-auto px-6 py-3.5 rounded-full font-medium transition-colors text-center shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Iniciar formação →
              </Link>
              <Link
                to={`/encontros/${encontroDestaque.numero}/quiz`}
                className="w-full lg:w-auto px-6 py-3.5 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors text-center whitespace-nowrap"
              >
                Fazer o quiz
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <CarrosselEncontros cards={todosCarrossel} />

      <InstallAppCallout />
    </PageTransition>
  )
}

function CarrosselEncontros({ cards }) {
  const trilhaRef = useRef(null)
  const [podePrev, setPodePrev] = useState(false)
  const [podeNext, setPodeNext] = useState(true)
  const CARD_W = 270

  // O acervo começa pelo primeiro encontro para acolher novas turmas.
  const inicializado = useRef(false)
  function refTrilha(el) {
    trilhaRef.current = el
    if (el && !inicializado.current) {
      inicializado.current = true
      requestAnimationFrame(() => {
        el.scrollLeft = 0
        atualizarBotoes(el)
      })
    }
  }

  function atualizarBotoes(el = trilhaRef.current) {
    if (!el) return
    setPodePrev(el.scrollLeft > 8)
    setPodeNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  function deslizar(direcao) {
    const el = trilhaRef.current
    if (!el) return
    const passo = Math.min(CARD_W, el.clientWidth * 0.86)
    el.scrollBy({ left: direcao * passo, behavior: 'smooth' })
  }

  return (
    <section className="pt-2 pb-16 sm:pt-0 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl mb-1">Explore os encontros</h3>
            <p className="text-[var(--color-text-muted)] text-sm">
              Formação para todas as turmas · arraste para navegar
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => deslizar(-1)}
              disabled={!podePrev}
              aria-label="Anterior"
              className="w-11 h-11 rounded-full border border-[var(--color-border-strong)] bg-white text-[var(--color-text-muted)] shadow-sm flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-35 disabled:cursor-not-allowed transition-all"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              onClick={() => deslizar(1)}
              disabled={!podeNext}
              aria-label="Próximo"
              className="w-11 h-11 rounded-full border border-[var(--color-border-strong)] bg-white text-[var(--color-text-muted)] shadow-sm flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-35 disabled:cursor-not-allowed transition-all"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={refTrilha}
        onScroll={() => atualizarBotoes()}
        className="flex gap-4 overflow-x-auto pb-6 px-0 sm:px-4 md:px-8 scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex-shrink-0 w-[9vw] sm:w-[max(0px,calc((100vw-72rem)/2))]" />

        {cards.map((encontro, i) => (
          <Link key={encontro.numero} to={`/encontros/${encontro.numero}`} className="contents">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 8) * 0.05, duration: 0.35 }}
              style={{
                scrollSnapAlign: 'center',
              }}
              className="w-[68vw] min-[420px]:w-[260px] sm:w-64 flex-shrink-0"
              data-card-numero={encontro.numero}
            >
              <CardEncontro encontro={encontro} />
            </motion.div>
          </Link>
        ))}

        <div className="flex-shrink-0 w-[9vw] sm:w-4" />
      </div>
    </section>
  )
}

function CardEncontro({ encontro }) {
  return (
    <div className="h-full red-paper-bg rounded-2xl border border-[var(--color-primary)] p-5 sm:p-6 flex flex-col transition-all select-none hover:shadow-md">
      <p className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-gold-light)] mb-3">
        Encontro {String(encontro.numero).padStart(2, '0')}
      </p>

      <p
        className="text-xl leading-snug mb-2 flex-1 text-[var(--color-gold-light)]"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 600,
          textShadow: '0 1px 6px rgba(0,0,0,0.16)',
        }}
      >
        {encontro.titulo}
      </p>

      {encontro.subtitulo && (
        <p
          className="text-xs italic mb-3 text-white/90"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {encontro.subtitulo}
        </p>
      )}

      <p className="text-xs mt-auto pt-3 border-t text-white/90 border-white/20">
        Acessar formação →
      </p>
    </div>
  )
}

function ArrowIcon({ direction }) {
  const rotate = direction === 'left' ? 'rotate(180deg)' : undefined

  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      style={{ transform: rotate }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

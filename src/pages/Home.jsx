import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Countdown from '../components/Countdown'
import { CrismaCapa, DoveIcon } from '../components/Logo'
import { encontros, gerarCalendarioEncontros } from '../data/encontros'
import { getHoje, SIMULANDO } from '../data/dataSimulada'

export default function Home() {
  const calendario = gerarCalendarioEncontros()
  const hoje = getHoje()

  const todosCarrossel = calendario.map((c) => ({
    ...c,
    dataObj: new Date(c.data + 'T00:00:00'),
    conteudoDisponivel: encontros.find((e) => e.numero === c.numero),
    passado: new Date(c.data + 'T00:00:00') < hoje,
  }))

  // Mostra o encontro do sábado mais recente que já aconteceu.
  // Se ainda não houve nenhum, cai no primeiro disponível.
  const passados = calendario
    .map((c) => ({
      ...c,
      dataObj: new Date(c.data + 'T00:00:00'),
      conteudo: encontros.find((e) => e.numero === c.numero),
    }))
    .filter((c) => c.dataObj <= hoje && c.conteudo)

  const encontroAtual =
    passados.length > 0
      ? passados[passados.length - 1].conteudo
      : encontros[0]

  return (
    <PageTransition>
      {SIMULANDO && (
        <div className="bg-amber-400 text-amber-900 text-[11px] sm:text-xs font-semibold text-center py-2 px-3 sm:px-4 tracking-wide">
          <span className="sm:hidden">Modo simulação · {hoje.toLocaleDateString('pt-BR')}</span>
          <span className="hidden sm:inline">⚠ MODO SIMULAÇÃO — data: {hoje.toLocaleDateString('pt-BR')} · edite <code>src/data/dataSimulada.js</code> para mudar</span>
        </div>
      )}
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
                className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.3em] text-[var(--color-gold-dark)] mb-5 sm:mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                2026
              </p>

              <p className="font-quote italic text-base sm:text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
                "{encontroAtual.versiculoDestaque}"
                <span className="block text-sm not-italic mt-1 text-[var(--color-text-muted)]">
                  — {encontroAtual.versiculoRef}
                </span>
              </p>

              <div className="flex flex-col min-[390px]:flex-row gap-3 justify-center md:justify-start">
                <Link
                  to={`/encontros/${encontroAtual.numero}`}
                  className="w-full min-[390px]:w-auto px-6 sm:px-7 py-3.5 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-dark)] transition-all text-center shadow-lg hover:shadow-xl"
                >
                  Encontro {encontroAtual.numero} →
                </Link>
                <Link
                  to="/encontros"
                  className="w-full min-[390px]:w-auto px-6 sm:px-7 py-3.5 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-medium hover:bg-[var(--color-primary)] hover:text-white transition-all text-center"
                >
                  Ver todos
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
          backgroundImage: 'url("./background-paper-red.webp?v=1")',
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
          <Countdown />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold-dark)] font-medium">
            Em destaque
          </span>
          <h2 className="text-3xl md:text-4xl mt-2">Encontro atual</h2>
          <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[var(--color-border)] overflow-hidden grid md:grid-cols-2"
        >
          <div className="red-paper-bg p-6 sm:p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden min-h-[300px] md:min-h-[320px]">
            <div className="pointer-events-none absolute right-[-78px] sm:right-[-54px] md:right-[-28px] top-1/2 -translate-y-1/2 w-72 h-72 md:w-[360px] md:h-[360px] opacity-[0.2] sm:opacity-[0.24] mix-blend-screen">
              <DoveIcon className="w-full h-full" />
            </div>
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-light)] font-semibold mb-3">
                Encontro {encontroAtual.numero}
              </p>
              <h3
                className="text-3xl sm:text-4xl md:text-5xl text-[var(--color-gold-light)] mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  textShadow: '0 2px 10px rgba(0,0,0,0.18)',
                }}
              >
                {encontroAtual.titulo}
              </h3>
              <p className="font-quote italic text-xl sm:text-2xl text-white/95 mb-6">
                {encontroAtual.subtitulo}
              </p>
              <blockquote className="font-quote italic text-base sm:text-lg text-white border-l-2 border-[var(--color-gold-light)] pl-4 mt-6" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
                "{encontroAtual.versiculoDestaque}"
                <footer className="text-sm not-italic mt-2 text-[var(--color-gold-light)]">
                  — {encontroAtual.versiculoRef}
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <h4 className="text-2xl mb-4">O que você vai ver</h4>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              {encontroAtual.formacao.map((f) => (
                <li key={f.titulo} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full mt-2.5 flex-shrink-0" />
                  <span>{f.titulo}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col lg:flex-row gap-3 mt-8">
              <Link
                to={`/encontros/${encontroAtual.numero}`}
                className="w-full lg:w-auto px-6 py-3.5 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-dark)] transition-colors text-center shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Iniciar formação →
              </Link>
              <Link
                to={`/encontros/${encontroAtual.numero}/quiz`}
                className="w-full lg:w-auto px-6 py-3.5 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors text-center whitespace-nowrap"
              >
                Fazer o quiz
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <CarrosselProximos cards={todosCarrossel} encontroAtualNumero={encontroAtual.numero} />
    </PageTransition>
  )
}

function CarrosselProximos({ cards, encontroAtualNumero }) {
  const trilhaRef = useRef(null)
  const [podePrev, setPodePrev] = useState(false)
  const [podeNext, setPodeNext] = useState(true)
  const CARD_W = 270

  // Rola até o encontro atual no primeiro render — APENAS o carrossel
  // horizontalmente. NÃO usar scrollIntoView, que rola a página inteira
  // verticalmente até o carrossel.
  const inicializado = useRef(false)
  function refTrilha(el) {
    trilhaRef.current = el
    if (el && !inicializado.current) {
      inicializado.current = true
      const idx = cards.findIndex((c) => c.numero === encontroAtualNumero)
      requestAnimationFrame(() => {
        const alvo = el.querySelector(`[data-card-numero="${encontroAtualNumero}"]`)
        if (alvo) {
          // Centraliza o alvo dentro do carrossel sem mexer no scroll da página
          const alvoLeft = alvo.offsetLeft
          const alvoWidth = alvo.offsetWidth
          el.scrollLeft = Math.max(0, alvoLeft - (el.clientWidth - alvoWidth) / 2)
        } else {
          el.scrollLeft = Math.max(0, idx) * CARD_W
        }
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
            <h3 className="text-2xl md:text-3xl mb-1">Calendário de encontros</h3>
            <p className="text-[var(--color-text-muted)] text-sm">
              Todo sábado às 15h · arraste para navegar
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

        {cards.map((p, i) => {
          const isAtual = p.numero === encontroAtualNumero
          const temConteudo = !!p.conteudoDisponivel

          const card = (
            <motion.div
              key={p.numero}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 8) * 0.05, duration: 0.35 }}
              style={{
                scrollSnapAlign: 'center',
              }}
              className="w-[68vw] min-[420px]:w-[260px] sm:w-64 flex-shrink-0"
              data-card-numero={p.numero}
            >
              <CardProximo p={p} isAtual={isAtual} temConteudo={temConteudo} />
            </motion.div>
          )

          return temConteudo ? (
            <Link key={p.numero} to={`/encontros/${p.numero}`} className="contents">
              {card}
            </Link>
          ) : card
        })}

        <div className="flex-shrink-0 w-[9vw] sm:w-4" />
      </div>
    </section>
  )
}

function CardProximo({ p, isAtual, temConteudo }) {
  const bg = p.passado
    ? 'bg-[var(--color-surface-warm)]'
    : 'bg-white'

  const borda = isAtual
    ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-lg'
    : p.passado
    ? 'border-[var(--color-border-strong)]'
    : 'border-[var(--color-border)]'

  const numColor = p.passado
    ? 'text-[var(--color-text-muted)]'
    : 'text-[var(--color-primary)]'

  const tituloColor = p.passado
    ? 'text-[var(--color-text-muted)]'
    : 'text-[var(--color-text)]'

  return (
    <div
      className={`h-full ${bg} rounded-2xl border p-5 sm:p-6 flex flex-col transition-all select-none ${borda} ${
        temConteudo && !p.passado ? 'hover:shadow-lg hover:-translate-y-1' : ''
      } ${temConteudo && p.passado ? 'hover:shadow-md' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className={`text-xs uppercase tracking-[0.2em] font-medium ${
          p.passado ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-gold-dark)]'
        }`}>
          Encontro {String(p.numero).padStart(2, '0')}
        </p>
        {isAtual && (
          <span className="text-xs px-2 py-0.5 bg-[var(--color-primary)] text-white rounded-full font-semibold uppercase tracking-wide">
            Atual
          </span>
        )}
        {p.passado && !isAtual && (
          <span className="text-xs px-2 py-0.5 text-[var(--color-text-muted)] border border-[var(--color-border-strong)] rounded-full">
            ✓
          </span>
        )}
      </div>

      <p
        className={`text-xl leading-snug mb-2 flex-1 ${tituloColor}`}
        style={{ fontFamily: "'Playfair Display', serif", fontWeight: p.passado ? 500 : 600 }}
      >
        {p.conteudoDisponivel?.titulo || 'Em breve'}
      </p>

      {p.conteudoDisponivel?.subtitulo && (
        <p
          className="text-xs italic text-[var(--color-text-muted)] mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {p.conteudoDisponivel.subtitulo}
        </p>
      )}

      <p className={`text-xs capitalize mt-auto pt-3 border-t ${
        p.passado ? 'text-[var(--color-text-muted)]/70 border-[var(--color-border)]' : 'text-[var(--color-text-muted)] border-[var(--color-border)]'
      }`}>
        {p.dataObj.toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
        })}
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

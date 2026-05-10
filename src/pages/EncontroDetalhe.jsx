import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { DoveIcon } from '../components/Logo'
import { getEncontroById } from '../data/encontros'

const TABS = [
  { id: 'formacao', label: 'Formação', short: 'Formação' },
  { id: 'palavra', label: 'Palavra de Deus', short: 'Palavra' },
  { id: 'reflexao', label: 'Reflexão', short: 'Reflexão' },
  { id: 'recursos', label: 'Para saber mais', short: 'Recursos' },
]

export default function EncontroDetalhe() {
  const { id } = useParams()
  const encontro = getEncontroById(id)
  const [aba, setAba] = useState('formacao')
  const [compromissoFeito, setCompromissoFeito] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem(`crisma:encontro-${id}`)
    if (data) {
      const parsed = JSON.parse(data)
      setCompromissoFeito(parsed.compromisso || false)
    }

    const visitas = JSON.parse(localStorage.getItem('crisma:visitados') || '[]')
    if (!visitas.includes(Number(id))) {
      visitas.push(Number(id))
      localStorage.setItem('crisma:visitados', JSON.stringify(visitas))
    }
  }, [id])

  if (!encontro) return <Navigate to="/encontros" replace />

  function toggleCompromisso() {
    const novo = !compromissoFeito
    setCompromissoFeito(novo)
    const data = JSON.parse(localStorage.getItem(`crisma:encontro-${id}`) || '{}')
    localStorage.setItem(
      `crisma:encontro-${id}`,
      JSON.stringify({ ...data, compromisso: novo })
    )
  }

  return (
    <PageTransition>
      <section className="red-paper-bg text-white relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-120px] sm:right-[-80px] md:right-[5vw] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[440px] md:h-[440px] opacity-[0.16] sm:opacity-[0.22] mix-blend-screen">
          <DoveIcon className="w-full h-full" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 md:px-8 py-10 sm:py-12 md:py-20">
          <Link
            to="/encontros"
            className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-[var(--color-gold-light)] transition-colors mb-5 sm:mb-6"
          >
            ← Todos os encontros
          </Link>

          <p className="text-xs md:text-sm uppercase tracking-[0.24em] sm:tracking-[0.3em] text-[var(--color-gold-light)] font-medium mb-3">
            Encontro {encontro.numero}
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-6xl text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            {encontro.titulo}
          </h1>
          <p
            className="text-xl sm:text-2xl md:text-3xl italic text-[var(--color-gold-light)] mb-6 sm:mb-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {encontro.subtitulo}
          </p>

          <blockquote className="font-quote italic text-lg sm:text-xl md:text-2xl text-white border-l-2 border-[var(--color-gold-light)] pl-4 sm:pl-6 max-w-2xl" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
            "{encontro.versiculoDestaque}"
            <footer className="text-base not-italic mt-3 text-[var(--color-gold-light)]">
              — {encontro.versiculoRef}
            </footer>
          </blockquote>
        </div>
      </section>

      <div className="sticky top-[91px] sm:top-[57px] md:top-[65px] z-40 bg-[var(--color-surface)]/95 backdrop-blur border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-8 py-2 sm:py-0">
          <nav className="encounter-tabs-nav">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setAba(t.id)}
                className={`min-w-0 rounded-lg sm:rounded-none px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm md:text-base font-medium text-center relative transition-colors ${
                  aba === t.id
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] sm:bg-transparent'
                    : 'bg-white/70 text-[var(--color-text-muted)] hover:text-[var(--color-text)] sm:bg-transparent'
                }`}
              >
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>
                {aba === t.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-2 right-2 sm:left-0 sm:right-0 h-0.5 bg-[var(--color-primary)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 md:px-8 py-10 sm:py-12 md:py-16">
        <AnimatePresence mode="wait">
          {aba === 'formacao' && (
            <motion.div
              key="formacao"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-10 sm:space-y-12"
            >
              {encontro.formacao.map((secao, i) => (
                <motion.article
                  key={secao.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 text-[var(--color-primary)]">
                    {secao.titulo}
                  </h2>
                  {secao.conteudo.split('\n\n').map((paragrafo, j) => (
                    <p
                      key={j}
                      className="text-[var(--color-text)] leading-relaxed mb-4 text-[15px] sm:text-base md:text-lg"
                    >
                      {paragrafo}
                    </p>
                  ))}
                </motion.article>
              ))}

              <div className="border-t border-[var(--color-border)] pt-8 mt-12">
                <Link
                  to={`/encontros/${encontro.numero}/quiz`}
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-6 sm:px-8 py-4 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-dark)] transition-all shadow-lg hover:shadow-xl group"
                >
                  Testar o que aprendi com o quiz
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          )}

          {aba === 'palavra' && (
            <motion.div
              key="palavra"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl mb-2 text-[var(--color-primary)]">
                Palavra de Deus
              </h2>
              <p className="text-[var(--color-text-muted)] mb-6">
                Leituras propostas para o encontro:
              </p>

              {encontro.leituras.map((l, i) => (
                <motion.div
                  key={l.ref}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[var(--color-surface-warm)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold-dark)] font-medium mb-2">
                    Leitura {i + 1}
                  </p>
                  <h3
                    className="text-lg sm:text-xl md:text-2xl mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                  >
                    {l.ref}
                  </h3>
                  <p
                    className="italic text-[var(--color-text-muted)]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}
                  >
                    {l.titulo}
                  </p>
                </motion.div>
              ))}

              <div className="bg-[var(--color-primary)]/5 border-l-4 border-[var(--color-primary)] rounded-lg p-6 mt-8">
                <p className="text-sm text-[var(--color-text-muted)] mb-1">Oração Inicial</p>
                <p className="font-quote italic text-lg text-[var(--color-text)]">
                  Antes de começar a leitura, faça o sinal da cruz e peça a luz do Espírito Santo
                  para acolher a Palavra de Deus em seu coração.
                </p>
              </div>
            </motion.div>
          )}

          {aba === 'reflexao' && (
            <motion.div
              key="reflexao"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl mb-6 text-[var(--color-primary)]">
                Para Reflexão
              </h2>

              <ol className="space-y-6">
                {encontro.reflexao.map((pergunta, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 flex gap-3 sm:gap-4"
                  >
                    <span
                      className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {i + 1}
                    </span>
                    <p
                      className="text-base sm:text-lg md:text-xl pt-1.5 text-[var(--color-text)]"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
                    >
                      {pergunta}
                    </p>
                  </motion.li>
                ))}
              </ol>

              <div className="mt-12 bg-gradient-to-br from-[var(--color-gold-light)]/20 to-[var(--color-gold)]/10 rounded-2xl p-6 md:p-8 border border-[var(--color-gold)]/30">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-dark)] font-semibold mb-3">
                  Compromisso da Semana
                </p>
                <p className="text-lg md:text-xl text-[var(--color-text)] mb-6">
                  {encontro.compromisso}
                </p>
                <button
                  onClick={toggleCompromisso}
                  className={`inline-flex w-full sm:w-auto justify-center items-center gap-3 px-6 py-3.5 rounded-full font-medium transition-all ${
                    compromissoFeito
                      ? 'bg-[var(--color-primary)] text-white shadow-lg'
                      : 'bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
                  }`}
                >
                  <motion.span
                    animate={{ scale: compromissoFeito ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {compromissoFeito ? '✓' : '○'}
                  </motion.span>
                  {compromissoFeito ? 'Assumido!' : 'Assumir compromisso'}
                </button>
              </div>
            </motion.div>
          )}

          {aba === 'recursos' && (
            <motion.div
              key="recursos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl mb-6 text-[var(--color-primary)]">
                Para Saber Mais
              </h2>
              <p className="text-[var(--color-text-muted)] mb-8">
                Materiais para aprofundar o tema do encontro durante a semana.
              </p>

              <div className="space-y-4">
                {encontro.recursos.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl border border-[var(--color-border)] p-5 hover:border-[var(--color-gold)] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-semibold uppercase tracking-wider">
                        {r.tipo}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[var(--color-text)]">{r.titulo}</p>
                        {r.autor && (
                          <p className="text-sm text-[var(--color-text-muted)] mt-1 italic">
                            {r.autor}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

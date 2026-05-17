import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { encontros, gerarCalendarioEncontros } from '../data/encontros'

export default function Progresso() {
  const [dados, setDados] = useState(null)

  useEffect(() => {
    const calendario = gerarCalendarioEncontros()
    const visitados = JSON.parse(localStorage.getItem('crisma:visitados') || '[]')

    const lista = calendario.map((c) => {
      const conteudo = encontros.find((e) => e.numero === c.numero)
      const local = JSON.parse(
        localStorage.getItem(`crisma:encontro-${c.numero}`) || '{}'
      )
      return {
        numero: c.numero,
        titulo: conteudo?.titulo || 'Em breve',
        visitado: visitados.includes(c.numero),
        compromisso: local.compromisso || false,
        quizConcluido: local.quizConcluido || false,
        quizScore: local.quizScore || null,
        disponivel: !!conteudo,
      }
    })

    const totais = {
      visitados: lista.filter((e) => e.visitado).length,
      compromissos: lista.filter((e) => e.compromisso).length,
      quizzes: lista.filter((e) => e.quizConcluido).length,
      mediaQuiz:
        lista.filter((e) => e.quizScore !== null).reduce((s, e) => s + e.quizScore, 0) /
          (lista.filter((e) => e.quizScore !== null).length || 1) || 0,
      total: lista.length,
      disponiveis: lista.filter((e) => e.disponivel).length,
    }

    setDados({ lista, totais })
  }, [])

  function limparProgresso() {
    if (
      confirm(
        'Tem certeza? Isso vai apagar todo seu progresso (encontros visitados, compromissos e resultados do quiz).'
      )
    ) {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('crisma:'))
        .forEach((k) => localStorage.removeItem(k))
      window.location.reload()
    }
  }

  if (!dados) return null

  const { lista, totais } = dados

  return (
    <PageTransition>
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-10 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] sm:tracking-[0.3em] text-[var(--color-gold-dark)] font-medium">
            Sua caminhada
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">Meu Progresso</h1>
          <div className="w-20 h-px bg-[var(--color-gold)] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
          <StatCard
            label="Encontros visitados"
            valor={totais.visitados}
            total={totais.disponiveis}
            delay={0}
          />
          <StatCard
            label="Compromissos assumidos"
            valor={totais.compromissos}
            total={totais.disponiveis}
            delay={0.1}
          />
          <StatCard
            label="Quizzes concluídos"
            valor={totais.quizzes}
            total={totais.disponiveis}
            delay={0.2}
          />
          <StatCard
            label="Média no quiz"
            valor={`${Math.round(totais.mediaQuiz)}%`}
            delay={0.3}
            destaque
          />
        </div>

        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 md:p-8">
          <h2 className="text-2xl mb-6">Por encontro</h2>
          <div className="space-y-2 sm:space-y-3">
            {lista.map((item, i) => {
              const conteudo = (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-[var(--color-border)] transition-colors ${
                    item.disponivel
                      ? 'hover:border-[var(--color-gold)] active:bg-[var(--color-surface-warm)]'
                      : 'opacity-70'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                      item.visitado
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-surface-warm)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                    }`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.numero}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm sm:text-base">{item.titulo}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {item.visitado && <Badge cor="primary">Lido</Badge>}
                      {item.compromisso && <Badge cor="gold">Compromisso</Badge>}
                      {item.quizConcluido && <Badge cor="green">Quiz {item.quizScore}%</Badge>}
                      {!item.visitado && item.disponivel && <Badge cor="muted">Não iniciado</Badge>}
                    </div>
                  </div>

                  {item.disponivel && (
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 text-[var(--color-text-muted)] text-xl leading-none"
                    >
                      ›
                    </span>
                  )}
                </motion.div>
              )

              const semLink = !item.disponivel

              return !semLink ? (
                <Link
                  key={item.numero}
                  to={`/encontros/${item.numero}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-xl"
                >
                  {conteudo}
                </Link>
              ) : (
                <div key={item.numero}>{conteudo}</div>
              )
            })}
          </div>
        </div>

        {(totais.visitados > 0 || totais.compromissos > 0 || totais.quizzes > 0) && (
          <div className="text-center mt-12">
            <button
              onClick={limparProgresso}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] underline transition-colors"
            >
              Limpar todo o progresso
            </button>
          </div>
        )}

        <div className="text-center mt-12 p-6 bg-[var(--color-surface-warm)] rounded-2xl border border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)]">
            💡 Seu progresso é salvo apenas no seu navegador. Não usamos contas ou servidores.
          </p>
        </div>
      </div>
    </PageTransition>
  )
}

function StatCard({ label, valor, total, delay, destaque }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-2xl p-4 sm:p-6 text-center ${
        destaque
          ? 'red-paper-bg text-white shadow-lg'
          : 'bg-white border border-[var(--color-border)]'
      }`}
    >
      <p
        className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
          destaque ? 'text-white' : 'text-[var(--color-primary)]'
        }`}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {valor}
        {total !== undefined && (
          <span
            className={`text-xl sm:text-2xl font-normal ${
              destaque ? 'text-white/70' : 'text-[var(--color-text-muted)]'
            }`}
          >
            /{total}
          </span>
        )}
      </p>
      <p
        className={`text-[10px] sm:text-xs uppercase tracking-wider mt-2 ${
          destaque ? 'text-white/80' : 'text-[var(--color-text-muted)]'
        }`}
      >
        {label}
      </p>
    </motion.div>
  )
}

function Badge({ children, cor }) {
  const cores = {
    primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
    gold: 'bg-[var(--color-gold-light)]/30 text-[var(--color-gold-dark)]',
    green: 'bg-green-100 text-green-700',
    muted: 'bg-[var(--color-surface-warm)] text-[var(--color-text-muted)]',
  }
  return (
    <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium ${cores[cor]}`}>
      {children}
    </span>
  )
}

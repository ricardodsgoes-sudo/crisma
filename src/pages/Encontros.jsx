import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { encontros, gerarCalendarioEncontros, getEncontroAtual } from '../data/encontros'
import { getHoje } from '../data/dataSimulada'

export default function Encontros() {
  const calendario = gerarCalendarioEncontros()
  const hoje = getHoje()
  const encontroAtual = getEncontroAtual(hoje)

  const lista = calendario.map((c) => {
    const dataObj = new Date(c.data + 'T00:00:00')
    const conteudo = encontros.find((e) => e.numero === c.numero)
    let status = 'futuro'
    if (dataObj < hoje) status = 'realizado'
    else if (conteudo && c.numero === encontroAtual.numero) status = 'atual'
    else if (conteudo && dataObj <= hoje) status = 'disponivel'

    return { ...c, dataObj, conteudo, status }
  })

  return (
    <PageTransition>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] sm:tracking-[0.3em] text-[var(--color-gold-dark)] font-medium">
            17 sábados de formação
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            Os Encontros
          </h1>
          <div className="w-20 h-px bg-[var(--color-gold)] mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-[var(--color-text-muted)] text-base sm:text-lg">
            Uma jornada de fé, encontro e descoberta a cada sábado, das 17h às 18h.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {lista.map((item, i) => {
            const isClickable = item.conteudo
            const isRealizado = item.status === 'realizado'

            const cardBg = {
              atual: 'bg-white',
              disponivel: 'bg-white',
              realizado: 'red-paper-bg',
              futuro: 'bg-white',
            }
            const cardBorder = {
              atual: 'ring-2 ring-[var(--color-primary)] shadow-xl',
              disponivel: 'border-[var(--color-border)]',
              realizado: 'border-[var(--color-primary)]',
              futuro: 'border-[var(--color-border)]',
            }

            const card = (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={isClickable ? { y: -4 } : {}}
                className={`${cardBg[item.status]} rounded-2xl border p-5 sm:p-6 h-full flex flex-col ${cardBorder[item.status]} ${
                  isClickable ? 'cursor-pointer hover:shadow-lg' : ''
                } transition-all`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <span className={`text-xs uppercase tracking-[0.2em] font-medium ${
                      isRealizado ? 'text-[var(--color-gold-light)]' : 'text-[var(--color-gold-dark)]'
                    }`}>
                      Encontro
                    </span>
                    <p
                      className={`text-4xl sm:text-5xl mt-1 leading-none ${
                        isRealizado ? 'text-white' : 'text-[var(--color-primary)]'
                      }`}
                      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                    >
                      {String(item.numero).padStart(2, '0')}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>

                <h2
                  className="text-xl sm:text-2xl mb-2 leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    color: isRealizado ? 'var(--color-gold-light)' : 'inherit',
                    textShadow: isRealizado ? '0 1px 6px rgba(0,0,0,0.16)' : 'none',
                  }}
                >
                  {item.conteudo?.titulo || 'Em breve'}
                </h2>

                {item.conteudo?.subtitulo && (
                  <p
                    className={`text-sm italic mb-3 ${
                      isRealizado ? 'text-white/90' : 'text-[var(--color-text-muted)]'
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.conteudo.subtitulo}
                  </p>
                )}

                <p className={`text-sm capitalize mt-auto pt-4 border-t ${
                  isRealizado
                    ? 'text-white/70 border-white/20'
                    : 'text-[var(--color-text-muted)] border-[var(--color-border)]'
                }`}>
                  {item.dataObj.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'short',
                  })}
                </p>
              </motion.article>
            )

            return isClickable ? (
              <Link
                key={item.numero}
                to={`/encontros/${item.numero}`}
                className="focus:outline-none"
              >
                {card}
              </Link>
            ) : (
              <div key={item.numero}>{card}</div>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}

function StatusBadge({ status }) {
  const config = {
    atual: { label: 'Atual', short: 'Atual', cls: 'bg-[var(--color-primary)] text-white' },
    disponivel: { label: 'Disponível', short: 'Ok', cls: 'bg-[var(--color-gold-light)] text-[var(--color-gold-dark)]' },
    realizado: { label: '✓ Realizado', short: '✓', cls: 'bg-white/20 text-white border border-white/30' },
    futuro: { label: 'Em breve', short: 'Breve', cls: 'bg-[var(--color-surface-warm)] text-[var(--color-text-muted)] border border-[var(--color-border)]' },
  }
  const { label, short, cls } = config[status]
  return (
    <span className={`text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full font-medium uppercase tracking-wider whitespace-nowrap ${cls}`}>
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{label}</span>
    </span>
  )
}

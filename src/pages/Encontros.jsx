import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { getEncontrosOrdenados } from '../data/encontros'

export default function Encontros() {
  const lista = getEncontrosOrdenados()

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
            {lista.length} encontros para crescer na fé
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            Os Encontros
          </h1>
          <div className="w-20 h-px bg-[var(--color-gold)] mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-[var(--color-text-muted)] text-base sm:text-lg">
            Uma jornada de fé, encontro e descoberta. Explore os temas no seu ritmo,
            individualmente ou com sua turma.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {lista.map((encontro, i) => (
            <Link key={encontro.numero} to={`/encontros/${encontro.numero}`} className="rounded-2xl">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="red-paper-bg rounded-2xl border border-[var(--color-primary)] p-5 sm:p-6 h-full flex flex-col cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-gold-light)]">
                    Encontro
                  </span>
                  <p
                    className="text-4xl sm:text-5xl mt-1 leading-none text-white"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                  >
                    {String(encontro.numero).padStart(2, '0')}
                  </p>
                </div>

                <h2
                  className="text-xl sm:text-2xl mb-2 leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    color: 'var(--color-gold-light)',
                    textShadow: '0 1px 6px rgba(0,0,0,0.16)',
                  }}
                >
                  {encontro.titulo}
                </h2>

                {encontro.subtitulo && (
                  <p
                    className="text-sm italic mb-3 text-white/90"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {encontro.subtitulo}
                  </p>
                )}

                <p className="text-sm mt-auto pt-4 border-t text-white/90 border-white/20">
                  Acessar formação →
                </p>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

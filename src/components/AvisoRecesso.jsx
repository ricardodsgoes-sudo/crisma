import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getRecessoAtivo } from '../data/encontros'
import { getHoje } from '../data/dataSimulada'
import { DoveIcon } from './Logo'

// Popup breve de recesso. Aparece UMA vez por dispositivo (controlado por
// localStorage) e somente enquanto o recesso estiver ativo. A chave inclui a
// data de retorno: se a data do recesso mudar, o aviso volta a aparecer.
export default function AvisoRecesso() {
  const recesso = getRecessoAtivo(getHoje())
  const chave = recesso ? `aviso-recesso-${recesso.retorno.toISOString().slice(0, 10)}` : null
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    if (!chave) return
    if (!localStorage.getItem(chave)) {
      setAberto(true)
    }
  }, [chave])

  function fechar() {
    if (chave) localStorage.setItem(chave, '1')
    setAberto(false)
  }

  if (!recesso) return null

  const dataFormatada = recesso.retorno.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={fechar}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="aviso-recesso-titulo"
            className="red-paper-bg relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden text-white text-center px-6 sm:px-8 py-9 sm:py-10"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 w-44 h-44 opacity-20 mix-blend-screen">
              <DoveIcon className="w-full h-full" />
            </div>

            <button
              onClick={fechar}
              aria-label="Fechar"
              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="relative">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[var(--color-gold-light)] font-semibold mb-3">
                ✦ Comunicado
              </p>
              <h2
                id="aviso-recesso-titulo"
                className="text-3xl sm:text-4xl text-[var(--color-gold-light)] mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
              >
                Estamos em recesso
              </h2>
              <p className="text-base sm:text-lg text-white/95 leading-relaxed mb-2">
                Nossos encontros estão em pausa. Retomaremos a caminhada juntos no dia
              </p>
              <p
                className="font-quote italic text-xl sm:text-2xl text-white capitalize mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
              >
                {dataFormatada} · 17h
              </p>

              <button
                onClick={fechar}
                className="px-7 py-3 rounded-full bg-[var(--color-gold-light)] text-[var(--color-primary)] font-semibold hover:brightness-105 transition-all shadow-lg"
              >
                Entendi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

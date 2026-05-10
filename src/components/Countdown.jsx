import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProximoSabado } from '../data/encontros'
import { getHoje } from '../data/dataSimulada'

function FlipDigit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[0.85] min-h-12 sm:min-h-16 max-h-28 bg-white/15 border border-white/25 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-2xl sm:text-4xl md:text-6xl font-bold text-white tabular-nums"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1.5 sm:mt-2 text-[9px] sm:text-xs md:text-sm uppercase tracking-widest text-white/80 font-semibold">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [tempo, setTempo] = useState(calcularTempo())

  function calcularTempo() {
    const proximoSabado = getProximoSabado(getHoje())
    proximoSabado.setHours(17, 0, 0, 0)
    const diff = proximoSabado.getTime() - Date.now()
    const ms = Math.max(0, diff)
    return {
      dias: Math.floor(ms / (1000 * 60 * 60 * 24)),
      horas: Math.floor((ms / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((ms / (1000 * 60)) % 60),
      segundos: Math.floor((ms / 1000) % 60),
      data: proximoSabado,
    }
  }

  useEffect(() => {
    const interval = setInterval(() => setTempo(calcularTempo()), 1000)
    return () => clearInterval(interval)
  }, [])

  const dataFormatada = tempo.data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="text-center">
      <p className="text-xs md:text-sm uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[var(--color-gold-light)] font-semibold mb-2">
        Próximo Encontro
      </p>
      <p
        className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 capitalize"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
      >
        {dataFormatada} · 17h às 18h
      </p>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-6 w-full max-w-[18rem] sm:max-w-md md:max-w-xl mx-auto">
        <FlipDigit value={tempo.dias} label="Dias" />
        <FlipDigit value={tempo.horas} label="Horas" />
        <FlipDigit value={tempo.minutos} label="Min" />
        <FlipDigit value={tempo.segundos} label="Seg" />
      </div>
    </div>
  )
}

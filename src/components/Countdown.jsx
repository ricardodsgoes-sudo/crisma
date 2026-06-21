import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProximoSabado, getRecessoAtivo } from '../data/encontros'
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
    const agora = new Date()
    const hoje = getHoje()
    const diaSemana = hoje.getDay()

    let alvo

    // Durante o recesso, conta para o sábado da retomada, ignorando os
    // sábados intermediários (que estão em pausa).
    const recesso = getRecessoAtivo(hoje)
    if (recesso) {
      alvo = recesso.retorno
      alvo.setHours(17, 0, 0, 0)
      const ms = Math.max(0, alvo.getTime() - agora.getTime())
      return {
        emAndamento: false,
        recesso: true,
        dias: Math.floor(ms / (1000 * 60 * 60 * 24)),
        horas: Math.floor((ms / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((ms / (1000 * 60)) % 60),
        segundos: Math.floor((ms / 1000) % 60),
        data: alvo,
      }
    }

    if (diaSemana === 6) {
      const inicio = new Date(hoje)
      inicio.setHours(17, 0, 0, 0)
      const fim = new Date(hoje)
      fim.setHours(18, 0, 0, 0)

      if (agora < inicio) {
        alvo = inicio
      } else if (agora < fim) {
        return { emAndamento: true }
      } else {
        const proximoSabado = getProximoSabado(hoje)
        proximoSabado.setHours(17, 0, 0, 0)
        alvo = proximoSabado
      }
    } else {
      const proximoSabado = getProximoSabado(hoje)
      proximoSabado.setHours(17, 0, 0, 0)
      alvo = proximoSabado
    }

    const ms = Math.max(0, alvo.getTime() - agora.getTime())
    return {
      emAndamento: false,
      dias: Math.floor(ms / (1000 * 60 * 60 * 24)),
      horas: Math.floor((ms / (1000 * 60 * 60)) % 24),
      minutos: Math.floor((ms / (1000 * 60)) % 60),
      segundos: Math.floor((ms / 1000) % 60),
      data: alvo,
    }
  }

  useEffect(() => {
    const interval = setInterval(() => setTempo(calcularTempo()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (tempo.emAndamento) {
    return (
      <div className="text-center">
        <p className="text-xs md:text-sm uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[var(--color-gold-light)] font-semibold mb-4">
          Encontro em andamento
        </p>
        <p
          className="text-2xl sm:text-3xl md:text-4xl text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
        >
          Seja bem-vindo!
        </p>
      </div>
    )
  }

  const dataFormatada = tempo.data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const isSabadoHoje = getHoje().getDay() === 6
  const emRecesso = tempo.recesso

  return (
    <div className="text-center">
      {emRecesso && (
        <p className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[var(--color-gold-light)]/15 border border-[var(--color-gold-light)]/40 text-[var(--color-gold-light)] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
          ✦ Estamos em recesso
        </p>
      )}
      <p className="text-xs md:text-sm uppercase tracking-[0.28em] sm:tracking-[0.35em] text-[var(--color-gold-light)] font-semibold mb-2">
        {emRecesso ? 'Voltamos em' : isSabadoHoje ? 'O encontro começa em' : 'Próximo Encontro'}
      </p>
      <p
        className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 capitalize"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
      >
        {dataFormatada} · 17h às 18h
      </p>
      {emRecesso && (
        <p className="text-sm sm:text-base text-white/90 -mt-3 mb-7 sm:mb-8 max-w-md mx-auto leading-relaxed">
          Os encontros estão em pausa. Retomaremos a caminhada juntos nesta data. Você pode revisitar os encontros anteriores e os quizzes.
        </p>
      )}

      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-6 w-full max-w-[18rem] sm:max-w-md md:max-w-xl mx-auto">
        <FlipDigit value={tempo.dias} label="Dias" />
        <FlipDigit value={tempo.horas} label="Horas" />
        <FlipDigit value={tempo.minutos} label="Min" />
        <FlipDigit value={tempo.segundos} label="Seg" />
      </div>
    </div>
  )
}

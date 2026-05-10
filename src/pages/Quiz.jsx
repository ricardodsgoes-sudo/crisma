import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import PageTransition from '../components/PageTransition'
import { getEncontroById } from '../data/encontros'

export default function Quiz() {
  const { id } = useParams()
  const encontro = getEncontroById(id)
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState(null)
  const [respondida, setRespondida] = useState(false)
  const [respostas, setRespostas] = useState([])
  const [terminado, setTerminado] = useState(false)
  const [shake, setShake] = useState(false)

  if (!encontro) return <Navigate to="/encontros" replace />

  const pergunta = encontro.quiz[perguntaAtual]
  const total = encontro.quiz.length
  const acertos = respostas.filter((r) => r.acertou).length

  function selecionar(idx) {
    if (respondida) return
    setRespostaSelecionada(idx)
    setRespondida(true)
    const acertou = idx === pergunta.correta
    setRespostas([...respostas, { idx, acertou }])

    if (acertou) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C41230', '#F5C842', '#B8860B', '#FFFFFF'],
        scalar: 0.85,
      })
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }

  function proxima() {
    if (perguntaAtual < total - 1) {
      setPerguntaAtual(perguntaAtual + 1)
      setRespostaSelecionada(null)
      setRespondida(false)
    } else {
      finalizar()
    }
  }

  function finalizar() {
    setTerminado(true)
    const acertosFinais = respostas.filter((r) => r.acertou).length
    const score = Math.round((acertosFinais / total) * 100)

    const data = JSON.parse(localStorage.getItem(`crisma:encontro-${id}`) || '{}')
    localStorage.setItem(
      `crisma:encontro-${id}`,
      JSON.stringify({
        ...data,
        quizConcluido: true,
        quizScore: score,
        quizData: new Date().toISOString(),
      })
    )

    if (score >= 60) {
      setTimeout(() => dispararConfetti(score), 300)
    }
  }

  function dispararConfetti(score) {
    const cores = ['#C41230', '#F5C842', '#B8860B', '#FFFFFF']
    const intensidade = score === 100 ? 200 : score >= 80 ? 120 : 80
    confetti({
      particleCount: intensidade,
      spread: 100,
      origin: { y: 0.5 },
      colors: cores,
    })
    if (score === 100) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: cores,
        })
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: cores,
        })
      }, 300)
    }
  }

  function reiniciar() {
    setPerguntaAtual(0)
    setRespostaSelecionada(null)
    setRespondida(false)
    setRespostas([])
    setTerminado(false)
  }

  if (terminado) {
    const score = Math.round((acertos / total) * 100)
    return (
      <PageTransition>
        <ResultadoFinal
          score={score}
          acertos={acertos}
          total={total}
          encontro={encontro}
          onReiniciar={reiniciar}
        />
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 sm:py-8 md:py-12">
        <Link
          to={`/encontros/${id}`}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-6"
        >
          ← Voltar ao encontro
        </Link>

        <header className="mb-6 sm:mb-8">
          <p className="text-xs uppercase tracking-[0.24em] sm:tracking-[0.3em] text-[var(--color-gold-dark)] font-medium mb-2">
            Quiz · Encontro {encontro.numero}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-1">{encontro.titulo}</h1>
        </header>

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-3 mb-2 text-xs sm:text-sm text-[var(--color-text-muted)]">
            <span>Pergunta {perguntaAtual + 1} de {total}</span>
            <span>
              {acertos}/{respostas.length} acertos
            </span>
          </div>
          <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--color-primary)] rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((perguntaAtual + (respondida ? 1 : 0)) / total) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={perguntaAtual}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: shake ? [-8, 8, -6, 6, 0] : 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={shake ? { duration: 0.4 } : { duration: 0.3 }}
            className="bg-white rounded-2xl sm:rounded-3xl border border-[var(--color-border)] shadow-lg p-4 sm:p-6 md:p-10"
          >
            <h2
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-snug"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              {pergunta.pergunta}
            </h2>

            <div className="space-y-3">
              {pergunta.opcoes.map((opcao, idx) => {
                const isSelected = respostaSelecionada === idx
                const isCorrect = idx === pergunta.correta
                const showCorrect = respondida && isCorrect
                const showWrong = respondida && isSelected && !isCorrect

                let cls =
                  'border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-warm)]'
                if (showCorrect)
                  cls =
                    'border-green-600 bg-green-50 ring-2 ring-green-600/20'
                else if (showWrong)
                  cls = 'border-red-600 bg-red-50 ring-2 ring-red-600/20'
                else if (respondida) cls = 'border-[var(--color-border)] opacity-50'

                return (
                  <motion.button
                    key={idx}
                    onClick={() => selecionar(idx)}
                    disabled={respondida}
                    whileTap={!respondida ? { scale: 0.97 } : {}}
                    animate={
                      showCorrect
                        ? { scale: [1, 1.02, 1] }
                        : showWrong
                        ? { x: [0, -4, 4, 0] }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                    className={`w-full text-left p-3.5 sm:p-4 md:p-5 rounded-xl border-2 transition-all ${cls} ${
                      !respondida ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                          showCorrect
                            ? 'bg-green-600 text-white'
                            : showWrong
                            ? 'bg-red-600 text-white'
                            : 'bg-[var(--color-surface-warm)] text-[var(--color-text)]'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm sm:text-base md:text-lg pt-0.5">{opcao}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence>
              {respondida && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 overflow-hidden"
                >
                  <div
                    className={`p-4 md:p-5 rounded-xl ${
                      respostaSelecionada === pergunta.correta
                        ? 'bg-green-50 border-l-4 border-green-600'
                        : 'bg-amber-50 border-l-4 border-amber-600'
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {respostaSelecionada === pergunta.correta
                        ? '✓ Resposta correta!'
                        : '✗ Não foi dessa vez.'}
                    </p>
                    <p className="text-[var(--color-text)] text-sm md:text-base">
                      {pergunta.explicacao}
                    </p>
                  </div>

                  <button
                    onClick={proxima}
                    className="mt-6 w-full sm:w-auto px-8 py-3.5 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-dark)] transition-colors shadow-md"
                  >
                    {perguntaAtual < total - 1 ? 'Próxima pergunta →' : 'Ver resultado'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

function ResultadoFinal({ score, acertos, total, encontro, onReiniciar }) {
  let mensagem, emoji
  if (score === 100) {
    mensagem = 'Perfeito! Você dominou todo o conteúdo.'
    emoji = '🌟'
  } else if (score >= 80) {
    mensagem = 'Excelente! Você está muito atento à formação.'
    emoji = '✨'
  } else if (score >= 60) {
    mensagem = 'Bom trabalho! Vale revisar alguns pontos.'
    emoji = '👍'
  } else {
    mensagem = 'Que tal reler a formação e tentar de novo?'
    emoji = '📖'
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-10 sm:py-12 md:py-20">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-2xl sm:rounded-3xl border border-[var(--color-border)] shadow-xl p-6 sm:p-8 md:p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl sm:text-7xl mb-4"
        >
          {emoji}
        </motion.div>

        <p className="text-xs uppercase tracking-[0.24em] sm:tracking-[0.3em] text-[var(--color-gold-dark)] font-medium mb-2">
          Quiz concluído
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2">{mensagem}</h1>

        <div className="my-8">
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-[var(--color-primary)] leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {score}%
          </motion.p>
          <p className="text-[var(--color-text-muted)] mt-3">
            {acertos} de {total} respostas corretas
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReiniciar}
            className="px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            Tentar novamente
          </button>
          <Link
            to={`/encontros/${encontro.numero}`}
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-dark)] transition-colors shadow-md"
          >
            Voltar ao encontro
          </Link>
          <Link
            to="/progresso"
            className="px-6 py-3 bg-[var(--color-gold)] text-white rounded-full font-medium hover:bg-[var(--color-gold-dark)] transition-colors shadow-md"
          >
            Meu progresso
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

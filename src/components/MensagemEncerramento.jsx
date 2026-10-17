export default function MensagemEncerramento() {
  return (
    <div className="text-center">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-2xl mx-auto"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
      >
        Os encontros terminaram, mas a caminhada de fé continua.
      </h2>
      <p className="text-base sm:text-lg text-white/90 mt-6 max-w-2xl mx-auto leading-relaxed">
        Nosso ciclo de catequese foi concluído com gratidão. Os materiais, reflexões e quizzes
        continuam disponíveis para você revisitar e para acolher novas turmas. Siga aprendendo
        e crescendo na fé, no seu ritmo.
      </p>
    </div>
  )
}

import { ParishCrest } from './Logo'
import OnlineCounter from './OnlineCounter'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-warm)] mt-24">
      {/* pb com safe-area: com o app instalado na tela de início do iPhone, o
          conteúdo vai até a borda e o rodapé encostaria no indicador de home. */}
      <div
        className="max-w-6xl mx-auto px-4 md:px-8 pt-12 flex flex-col items-center text-center gap-4"
        style={{ paddingBottom: 'max(3rem, calc(env(safe-area-inset-bottom) + 1.5rem))' }}
      >
        <ParishCrest className="w-20 h-24" />
        <div>
          <p
            className="text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase font-medium text-[var(--color-text-muted)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Paróquia Maria Mãe de Deus
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Desde 09 de Maio de 2000
          </p>
        </div>
        <div className="w-16 h-px bg-[var(--color-gold)] my-2" />
        <p
          className="font-quote italic text-[var(--color-text-muted)] max-w-md text-base"
        >
          "No princípio, Deus criou o céu e a terra."
        </p>
        <p className="text-xs text-[var(--color-text-muted)] mt-4">
          © 2026 — Crisma de Adultos
        </p>
        <OnlineCounter />
      </div>
    </footer>
  )
}

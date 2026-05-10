import { ParishCrest } from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-warm)] mt-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center text-center gap-4">
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
      </div>
    </footer>
  )
}

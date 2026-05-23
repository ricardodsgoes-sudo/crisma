import { motion } from 'framer-motion'

const denominacoes = [
  {
    nome: 'Espírito\nPrometido',
    nomeMobile: 'Espírito Prometido',
    ref: 'Gl 3,14',
    cor: 'var(--color-gold-dark)',
    icone: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 32l3-16 7 7 6-11 6 11 7-7 3 16z" />
        <path d="M8 36h32" />
        <circle cx="11" cy="16" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="37" cy="16" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="24" cy="12" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    nome: 'Espírito\nde Adoção',
    nomeMobile: 'Espírito de Adoção',
    ref: 'Rm 8,15',
    cor: '#a85e2b',
    icone: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <circle cx="14" cy="14" r="4" />
        <circle cx="34" cy="14" r="4" />
        <circle cx="24" cy="22" r="3" />
        <path d="M6 36c0-5 4-9 8-9s8 4 8 9v4H6z" />
        <path d="M26 36c0-5 4-9 8-9s8 4 8 9v4H26z" />
        <path d="M18 40c0-3.5 2.7-6.5 6-6.5s6 3 6 6.5v2H18z" />
      </svg>
    ),
  },
  {
    nome: 'Espírito\nde Cristo',
    nomeMobile: 'Espírito de Cristo',
    ref: 'Rm 8,11',
    cor: 'var(--color-primary)',
    icone: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <rect x="21" y="6" width="6" height="36" rx="1" />
        <rect x="10" y="17" width="28" height="6" rx="1" />
      </svg>
    ),
  },
  {
    nome: 'Espírito\ndo Senhor',
    nomeMobile: 'Espírito do Senhor',
    ref: '2Cor 3,17',
    cor: 'var(--color-gold)',
    icone: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 12C20 9 14 8 8 9v28c6-1 12 0 16 3" fill="currentColor" fillOpacity="0.15" />
        <path d="M24 12c4-3 10-4 16-3v28c-6-1-12 0-16 3" fill="currentColor" fillOpacity="0.15" />
        <path d="M24 12v28" />
        <path d="M24 12C20 9 14 8 8 9v28c6-1 12 0 16 3 4-3 10-4 16-3V9c-6-1-12 0-16 3z" />
      </svg>
    ),
  },
  {
    nome: 'Espírito\nde Deus',
    nomeMobile: 'Espírito de Deus',
    ref: 'Rm 8,9.14',
    cor: 'var(--color-primary-dark)',
    icone: (
      <svg viewBox="0 0 48 48" fill="currentColor">
        <path d="M24 42s-14-9-14-21a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 12-14 21-14 21z" />
      </svg>
    ),
  },
]

export default function DenominacoesEspirito() {
  return (
    <div className="my-8 sm:my-10">
      <div
        className="denominacoes-card relative rounded-2xl px-4 sm:px-6 md:px-8 py-7 sm:py-10 overflow-hidden"
        style={{
          backgroundColor: 'var(--color-surface-warm)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 2px 12px rgba(45, 36, 22, 0.06), inset 0 0 0 1px rgba(184, 134, 11, 0.08)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 18% 12%, rgba(184, 134, 11, 0.06), transparent 40%),
              radial-gradient(circle at 82% 88%, rgba(196, 18, 48, 0.05), transparent 45%),
              repeating-linear-gradient(2deg, transparent 0 28px, rgba(184, 134, 11, 0.025) 28px 29px),
              repeating-linear-gradient(94deg, transparent 0 34px, rgba(45, 36, 22, 0.02) 34px 35px)
            `,
          }}
        />

        <div className="pointer-events-none absolute top-3 left-3 w-5 h-5 sm:w-6 sm:h-6 border-t border-l rounded-tl-md" style={{ borderColor: 'var(--color-gold)' }} />
        <div className="pointer-events-none absolute top-3 right-3 w-5 h-5 sm:w-6 sm:h-6 border-t border-r rounded-tr-md" style={{ borderColor: 'var(--color-gold)' }} />
        <div className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 sm:w-6 sm:h-6 border-b border-l rounded-bl-md" style={{ borderColor: 'var(--color-gold)' }} />
        <div className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 sm:w-6 sm:h-6 border-b border-r rounded-br-md" style={{ borderColor: 'var(--color-gold)' }} />

        <div className="relative flex justify-center mb-6 sm:mb-11">
          <div className="relative">
            <div
              className="px-5 sm:px-9 py-2.5 sm:py-3 rounded-full text-center shadow-md"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
                border: '1.5px solid var(--color-gold-light)',
                boxShadow: '0 3px 10px rgba(154, 14, 38, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
              }}
            >
              <p
                className="text-[11px] sm:text-[13px] font-semibold uppercase leading-tight"
                style={{
                  color: 'var(--color-gold-light)',
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '0.14em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                }}
              >
                Denominações nas Cartas
                <br />
                de São Paulo
              </p>
            </div>
            {/* Setas leque — só no desktop, onde os 5 itens ficam em linha */}
            <svg
              className="hidden md:block absolute left-1/2 -translate-x-1/2 top-full"
              width="240"
              height="26"
              viewBox="0 0 240 26"
              fill="none"
              aria-hidden="true"
            >
              <path d="M120 0 Q 65 10 16 22" stroke="var(--color-gold-dark)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
              <path d="M120 0 Q 85 10 64 22" stroke="var(--color-gold-dark)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
              <path d="M120 0 L 120 22" stroke="var(--color-gold-dark)" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
              <path d="M120 0 Q 155 10 176 22" stroke="var(--color-gold-dark)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
              <path d="M120 0 Q 175 10 224 22" stroke="var(--color-gold-dark)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
              <polygon points="13,18 19,18 16,25" fill="var(--color-gold-dark)" opacity="0.85" />
              <polygon points="61,18 67,18 64,25" fill="var(--color-gold-dark)" opacity="0.85" />
              <polygon points="117,18 123,18 120,25" fill="var(--color-gold-dark)" opacity="0.85" />
              <polygon points="173,18 179,18 176,25" fill="var(--color-gold-dark)" opacity="0.85" />
              <polygon points="221,18 227,18 224,25" fill="var(--color-gold-dark)" opacity="0.85" />
            </svg>
            {/* Conector vertical sutil no mobile/tablet */}
            <div
              className="md:hidden absolute left-1/2 -translate-x-1/2 top-full w-px h-5"
              style={{ background: 'linear-gradient(to bottom, var(--color-gold-dark), transparent)' }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Mobile / tablet: lista vertical com linha conectora à esquerda */}
        <div className="relative md:hidden max-w-md mx-auto">
          <div
            className="absolute left-[2.25rem] top-2 bottom-2 w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--color-gold-dark) 8%, var(--color-gold-dark) 92%, transparent)',
              opacity: 0.45,
            }}
            aria-hidden="true"
          />
          <ul className="relative space-y-3">
            {denominacoes.map((d, i) => (
              <motion.li
                key={d.nome}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-xl py-2 pl-1 pr-3"
              >
                <div
                  className="flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center relative z-10"
                  style={{
                    backgroundColor: 'var(--color-surface-warm)',
                    border: `2px solid ${d.cor}`,
                    color: d.cor,
                    boxShadow: `0 2px 8px rgba(45, 36, 22, 0.08), inset 0 0 0 3px var(--color-surface-warm), inset 0 0 0 4px ${d.cor}33`,
                  }}
                >
                  <div className="w-10 h-10">{d.icone}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[15px] font-bold uppercase leading-tight"
                    style={{
                      color: d.cor,
                      fontFamily: "'Playfair Display', serif",
                      letterSpacing: '0.04em',
                    }}
                  >
                    {d.nomeMobile}
                  </p>
                  <p
                    className="italic mt-0.5"
                    style={{
                      color: 'var(--color-text-muted)',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '0.95rem',
                    }}
                  >
                    ({d.ref})
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Desktop: 5 colunas com setas leque */}
        <div className="relative hidden md:grid md:grid-cols-5 gap-x-4 gap-y-8 max-w-3xl mx-auto">
          {denominacoes.map((d, i) => (
            <motion.div
              key={d.nome}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
                style={{
                  backgroundColor: 'var(--color-surface-warm)',
                  border: `2px solid ${d.cor}`,
                  color: d.cor,
                  boxShadow: `0 2px 8px rgba(45, 36, 22, 0.08), inset 0 0 0 3px var(--color-surface-warm), inset 0 0 0 4px ${d.cor}33`,
                }}
              >
                <div className="w-11 h-11">{d.icone}</div>
              </div>
              <p
                className="text-[13px] font-bold uppercase leading-tight whitespace-pre-line"
                style={{
                  color: d.cor,
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '0.06em',
                }}
              >
                {d.nome}
              </p>
              <p
                className="mt-1.5 italic"
                style={{
                  color: 'var(--color-text-muted)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.85rem',
                }}
              >
                ({d.ref})
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

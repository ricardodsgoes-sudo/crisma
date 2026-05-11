import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ParishCrest } from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const links = [
    { to: '/', label: 'Início', short: 'Início' },
    { to: '/encontros', label: 'Encontros', short: 'Encontros' },
    { to: '/progresso', label: 'Meu Progresso', short: <>Meu<br />progresso</> },
  ]

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)] relative"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
        <div className="relative w-full md:w-auto flex items-center justify-center md:justify-start">
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start gap-3 group min-w-0"
            aria-label="Página inicial"
          >
            <span className="flex-shrink-0">
              <ParishCrest className="h-12 md:h-16 w-auto drop-shadow-sm group-hover:drop-shadow-md transition-all" />
            </span>
            <div className="hidden md:flex flex-col leading-tight min-w-0">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] font-medium truncate">
                Paróquia Maria Mãe de Deus
              </span>
              <span
                className="text-lg text-[var(--color-primary)] truncate"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
              >
                Crisma de Adultos 2026
              </span>
            </div>
          </Link>

          <div className="absolute right-0 md:hidden">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex w-full md:w-auto md:flex-1 items-center justify-center md:justify-end gap-2 min-w-0">
          <div className="hidden md:block md:flex-shrink-0">
            <ThemeToggle />
          </div>

          <nav className="grid grid-cols-3 w-full md:w-[31rem] gap-1.5 md:gap-3 min-w-0">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative min-w-0 px-0.5 md:px-3 py-3.5 md:py-2 text-[13px] md:text-[17px] text-center font-semibold md:font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="block md:hidden leading-snug">{link.short}</span>
                    <span className="hidden md:inline">{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 md:left-3 md:right-3 h-0.5 bg-[var(--color-primary)] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

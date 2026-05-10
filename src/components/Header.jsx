import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ParishCrest } from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const links = [
    { to: '/', label: 'Início', short: 'Início' },
    { to: '/encontros', label: 'Encontros', short: 'Encontros' },
    { to: '/progresso', label: 'Meu Progresso', short: 'Meu progresso' },
  ]

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)] relative"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="relative w-full sm:w-auto flex items-center justify-center sm:justify-start">
          <Link
            to="/"
            className="flex items-center justify-center sm:justify-start gap-3 group min-w-0"
            aria-label="Página inicial"
          >
            <span className="flex-shrink-0">
              <ParishCrest className="h-12 sm:h-16 w-auto drop-shadow-sm group-hover:drop-shadow-md transition-all" />
            </span>
            <div className="hidden sm:flex flex-col leading-tight min-w-0">
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

        </div>

        <div className="flex w-full sm:w-auto sm:flex-1 items-center gap-2 min-w-0">
          <nav className="grid grid-cols-[2.25rem_minmax(0,0.55fr)_minmax(0,0.85fr)_minmax(0,1.55fr)] w-[90vw] max-w-[90vw] mx-auto sm:w-auto sm:max-w-none sm:flex sm:flex-1 sm:items-center sm:justify-end gap-1 md:gap-2 min-w-0">
            <div className="flex items-center justify-center">
              <ThemeToggle />
            </div>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative min-w-0 px-0.5 sm:px-2 md:px-3 py-3 sm:py-2 text-[9.5px] min-[380px]:text-[10px] sm:text-sm md:text-base text-center font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="block sm:hidden truncate">{link.short}</span>
                    <span className="hidden sm:inline">{link.label}</span>
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

import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ParishCrest } from './Logo'

export default function Header() {
  const links = [
    { to: '/', label: 'Início', short: 'Início' },
    { to: '/encontros', label: 'Encontros', short: 'Encontros' },
    { to: '/progresso', label: 'Meu Progresso', short: 'Progresso' },
  ]

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <Link
          to="/"
          className="flex items-center justify-center sm:justify-start gap-3 group min-w-0"
          aria-label="Página inicial"
        >
          <span className="brasao-shine flex-shrink-0">
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

        <nav className="grid grid-cols-[0.9fr_1fr_1.45fr] w-[calc(100vw-0.5rem)] max-w-[24rem] mx-auto sm:w-auto sm:max-w-none sm:flex sm:flex-1 sm:items-center sm:justify-end gap-1 md:gap-2 min-w-0">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative px-1 sm:px-2 md:px-3 py-3 sm:py-2 text-[10.5px] min-[380px]:text-[11.5px] sm:text-sm md:text-base text-center font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text)] hover:text-[var(--color-primary)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="sm:hidden">{link.short}</span>
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
    </motion.header>
  )
}

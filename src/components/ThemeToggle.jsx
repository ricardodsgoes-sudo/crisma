import { useEffect, useState } from 'react'

// Três estados de tema: 'light' (claro), 'dark' (escuro), 'auto' (segue sistema).
// Default é 'light'. O usuário cicla entre os 3 clicando no botão.
// O tema escolhido fica salvo no navegador (localStorage).

const STORAGE_KEY = 'crisma:theme'

function aplicarTema(modo) {
  const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches
  const ativarDark = modo === 'dark' || (modo === 'auto' && prefereEscuro)
  document.documentElement.classList.toggle('dark', ativarDark)
}

export default function ThemeToggle() {
  const [modo, setModo] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'light'
    } catch {
      return 'light'
    }
  })

  // Aplica o tema sempre que o modo mudar
  useEffect(() => {
    aplicarTema(modo)
    try {
      localStorage.setItem(STORAGE_KEY, modo)
    } catch {}
  }, [modo])

  // No modo 'auto', escuta mudanças do sistema (ex.: usuário muda no celular)
  useEffect(() => {
    if (modo !== 'auto') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => aplicarTema('auto')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [modo])

  function alternar() {
    setModo((m) => (m === 'light' ? 'dark' : m === 'dark' ? 'auto' : 'light'))
  }

  const config = {
    light: { icone: <SolIcon />, label: 'Tema claro · clique para mudar para escuro' },
    dark: { icone: <LuaIcon />, label: 'Tema escuro · clique para seguir o sistema' },
    auto: { icone: <AutoIcon />, label: 'Tema automático (segue sistema) · clique para voltar ao claro' },
  }
  const atual = config[modo]

  return (
    <button
      onClick={alternar}
      aria-label={atual.label}
      title={atual.label}
      className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-card)] text-[var(--color-primary)] shadow-sm hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-warm)] transition-colors"
    >
      {atual.icone}
    </button>
  )
}

function SolIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function LuaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function AutoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

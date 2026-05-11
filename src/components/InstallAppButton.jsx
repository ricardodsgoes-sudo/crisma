import { useEffect, useMemo, useState } from 'react'

// PWA (Progressive Web App) = site que pode ser instalado como app.
// O navegador controla o prompt real de instalação. Este botão captura
// esse prompt quando disponível e, no iPhone, mostra o passo manual.

function jaEstaInstalado() {
  if (typeof window === 'undefined') return false

  const modosApp = ['standalone', 'fullscreen', 'minimal-ui', 'window-controls-overlay']
  const rodandoComoApp = modosApp.some((modo) =>
    window.matchMedia?.(`(display-mode: ${modo})`).matches
  )

  return (
    rodandoComoApp ||
    window.navigator.standalone === true ||
    document.referrer.startsWith('android-app://')
  )
}

function detectarIOS() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  // iPadOS 13+ pode se apresentar como "Macintosh" no Safari.
  return /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function useAppInstalado() {
  const [instalado, setInstalado] = useState(() => jaEstaInstalado())

  useEffect(() => {
    function atualizarEstadoInstalado() {
      setInstalado(jaEstaInstalado())
    }

    atualizarEstadoInstalado()

    window.addEventListener('appinstalled', atualizarEstadoInstalado)
    window.addEventListener('focus', atualizarEstadoInstalado)

    const modosApp = ['standalone', 'fullscreen', 'minimal-ui', 'window-controls-overlay']
    const mediaQueries = modosApp
      .map((modo) => window.matchMedia?.(`(display-mode: ${modo})`))
      .filter(Boolean)

    mediaQueries.forEach((mq) => mq.addEventListener?.('change', atualizarEstadoInstalado))

    return () => {
      window.removeEventListener('appinstalled', atualizarEstadoInstalado)
      window.removeEventListener('focus', atualizarEstadoInstalado)
      mediaQueries.forEach((mq) => mq.removeEventListener?.('change', atualizarEstadoInstalado))
    }
  }, [])

  return instalado
}

export function InstallAppCallout() {
  const instalado = useAppInstalado()

  if (instalado) return null

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 pb-14 sm:pb-18">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] px-5 py-5 text-center shadow-sm">
        <p
          className="text-lg text-[var(--color-text)]"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
        >
          Se preferir, baixe o app
        </p>
        <InstallAppButton />
      </div>
    </section>
  )
}

export default function InstallAppButton({ className = '' }) {
  const [prompt, setPrompt] = useState(null)
  const [instaladoAposPrompt, setInstaladoAposPrompt] = useState(false)
  const [mostrarAjuda, setMostrarAjuda] = useState(false)
  const isIOS = useMemo(() => detectarIOS(), [])
  const instalado = useAppInstalado() || instaladoAposPrompt

  useEffect(() => {
    function onBeforeInstallPrompt(event) {
      if (jaEstaInstalado()) return
      event.preventDefault()
      setPrompt(event)
    }

    function onAppInstalled() {
      setInstaladoAposPrompt(true)
      setPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  if (instalado) return null

  async function instalar() {
    if (prompt) {
      prompt.prompt()
      const escolha = await prompt.userChoice
      if (escolha.outcome === 'accepted') setInstaladoAposPrompt(true)
      setPrompt(null)
      return
    }

    setMostrarAjuda(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={instalar}
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-card)] px-5 py-3 text-sm font-semibold text-[var(--color-primary)] shadow-sm transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-warm)] hover:shadow-md ${className}`}
      >
        <PhoneIcon />
        <span>Instalar app</span>
      </button>

      {mostrarAjuda && (
        <div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/45 px-4 py-6 safe-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-app-title"
        >
          <div className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-card)] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="install-app-title"
                  className="text-xl text-[var(--color-primary)]"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                >
                  Instalar no celular
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {isIOS
                    ? 'No iPhone, a instalação é feita pelo Safari.'
                    : 'Se o navegador não abriu o aviso automático, use o menu dele.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMostrarAjuda(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <ol className="mt-5 space-y-3 text-sm text-[var(--color-text)]">
              {isIOS ? (
                <>
                  <li><strong>1.</strong> Abra este site no Safari.</li>
                  <li><strong>2.</strong> Toque no botão de compartilhar.</li>
                  <li><strong>3.</strong> Escolha “Adicionar à Tela de Início”.</li>
                </>
              ) : (
                <>
                  <li><strong>1.</strong> Abra o menu do navegador.</li>
                  <li><strong>2.</strong> Toque em “Instalar app” ou “Adicionar à tela inicial”.</li>
                  <li><strong>3.</strong> Confirme para criar o ícone do Crisma 2026.</li>
                </>
              )}
            </ol>

            <button
              type="button"
              onClick={() => setMostrarAjuda(false)}
              className="mt-6 w-full rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[var(--color-primary-dark)]"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  )
}

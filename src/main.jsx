import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

requestAnimationFrame(() => {
  const el = document.getElementById('preloader')
  if (el) {
    el.style.opacity = '0'
    setTimeout(() => el.remove(), 500)
  }
})

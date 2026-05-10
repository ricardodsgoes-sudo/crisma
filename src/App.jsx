import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

// Code splitting — só Home entra no bundle inicial. As outras rotas
// carregam sob demanda no primeiro acesso.
const Encontros = lazy(() => import('./pages/Encontros'))
const EncontroDetalhe = lazy(() => import('./pages/EncontroDetalhe'))
const Quiz = lazy(() => import('./pages/Quiz'))
const Progresso = lazy(() => import('./pages/Progresso'))

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/encontros" element={<Encontros />} />
          <Route path="/encontros/:id" element={<EncontroDetalhe />} />
          <Route path="/encontros/:id/quiz" element={<Quiz />} />
          <Route path="/progresso" element={<Progresso />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

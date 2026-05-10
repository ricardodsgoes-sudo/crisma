import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Encontros from './pages/Encontros'
import EncontroDetalhe from './pages/EncontroDetalhe'
import Quiz from './pages/Quiz'
import Progresso from './pages/Progresso'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/encontros" element={<Encontros />} />
        <Route path="/encontros/:id" element={<EncontroDetalhe />} />
        <Route path="/encontros/:id/quiz" element={<Quiz />} />
        <Route path="/progresso" element={<Progresso />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
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

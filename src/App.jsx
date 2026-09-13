import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import About from './pages/About'
import Motorway from './pages/Motorway'
import Project2 from './pages/Project2'
import Project3 from './pages/Project3'
import Benchmark from './pages/Benchmark'
import Toyota from './pages/Toyota'
import Tu from './pages/Tu'
import Components from './pages/Components'
import HeroExperiments from './pages/HeroExperiments'
import { useLenis } from './hooks/useLenis'
import GlobalCursor from './components/GlobalCursor'
import DevPanel from './components/DevPanel'

function ScrollApp() {
  useLenis()
  const location = useLocation()
  useEffect(() => {
    document.body.removeAttribute('data-cursor-hidden')
  }, [location.pathname])
  return (
    <>
    <GlobalCursor />
    <DevPanel />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/project/motorway" element={<Motorway />} />
      <Route path="/project/toyota" element={<Toyota />} />
      <Route path="/project/tu-help-pages" element={<Tu />} />
      <Route path="/project/2" element={<Project2 />} />
      <Route path="/project/3" element={<Project3 />} />
      <Route path="/project/benchmark" element={<Benchmark />} />
      <Route path="/components" element={<Components />} />
      <Route path="/hero-experiments" element={<HeroExperiments />} />
    </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollApp />
      <Analytics />
    </BrowserRouter>
  )
}


import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import About from './pages/About'
import Project2 from './pages/Project2'
import Project3 from './pages/Project3'
import ProjectPage from './pages/ProjectPage'
import Components from './pages/Components'
import HeroExperiments from './pages/HeroExperiments'
import { useLenis } from './hooks/useLenis'
import GlobalCursor from './components/GlobalCursor'
import DevPanel from './components/DevPanel'
import FaviconWink from './components/FaviconWink'

// Page editor: dev server only, never bundled into the live site
const Editor = import.meta.env.DEV ? lazy(() => import('./editor/Editor')) : null

function ScrollApp() {
  useLenis()
  const location = useLocation()
  useEffect(() => {
    document.body.removeAttribute('data-cursor-hidden')
    // scroll to top instantly on route change
    requestAnimationFrame(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo(0, 0)
      }
    })
  }, [location.pathname])
  return (
    <>
    <GlobalCursor />
    <DevPanel />
    <FaviconWink />
    {Editor && <Suspense fallback={null}><Editor /></Suspense>}
    <div key={location.pathname} className="page-enter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project/motorway" element={<ProjectPage slug="motorway" />} />
        <Route path="/project/toyota" element={<ProjectPage slug="toyota" />} />
        <Route path="/project/tu-help-pages" element={<ProjectPage slug="tu-help-pages" />} />
        <Route path="/project/2" element={<Project2 />} />
        <Route path="/project/3" element={<Project3 />} />
        <Route path="/project/benchmark" element={<ProjectPage slug="benchmark" />} />
        <Route path="/components" element={<Components />} />
        <Route path="/hero-experiments" element={<HeroExperiments />} />
      </Routes>
    </div>
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


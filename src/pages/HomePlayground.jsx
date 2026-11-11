import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PillOverlay from '../components/PillOverlay'
import ChrisBubble from '../components/ChrisBubble'
import ProjectCursor from '../components/ProjectCursor'
import { useReveal } from '../hooks/useReveal'
import { useLineReveal } from '../hooks/useLineReveal'
import CGLogo from '../components/CGLogo'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Button from '../components/Button'
import toyotaThumb from '../assets/ToyotaThumb.jpg'
import chrisIcon from '../assets/chris-icon.png'
import sonyMusicLogo from '../assets/logos/sony-music.png'
import motorwayLogo from '../assets/logos/motorway.png'
import toyotaLogo from '../assets/logos/toyota.png'
import sainsburysLogo from '../assets/logos/sainsburys.png'
import './Home.css'
import './HomeHero.css'
import './HomePlayground.css'

function HeroPill({ src, icon, label, body, chip, variant = 'light', renderOverlay, cursor }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [chipCenter, setChipCenter] = useState({ cx: 0, cy: 0 })
  const spanRef = useRef(null)
  const [entryX, setEntryX] = useState(null)

  function handleMouseMove(e) {
    setPos({ x: e.clientX, y: e.clientY })
  }

  function handleMouseEnter(e) {
    if (spanRef.current) {
      const r = spanRef.current.getBoundingClientRect()
      setChipCenter({ cx: r.left + r.width / 2, cy: r.top + r.height / 2, rect: r })
      setEntryX(e.clientX)
    }
    setOpen(true)
  }

  return (
    <span
      ref={spanRef}
      className={`hero-pill hero-pill--${variant}`}
      style={cursor ? { cursor } : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setOpen(false)}
      onMouseMove={handleMouseMove}
    >
      {icon && <img className="brand-chip__logo" src={icon} alt="" />}
      {label}
      {open && renderOverlay && renderOverlay({ x: pos.x, y: pos.y, cx: chipCenter.cx, cy: chipCenter.cy, rect: chipCenter.rect, entryX })}
    </span>
  )
}

// Splits copy into word units (spaces stay as plain text so wrapping is
// unchanged) so useLineReveal can animate each rendered line separately.
function Words({ children }) {
  return children.split(/(\s+)/).map((t, i) =>
    t === '' || /^\s+$/.test(t) ? t : <span key={i} className="hx-unit">{t}</span>
  )
}

// Outlined brand chip (Mobbin-style): app-icon logo + name, inline with the copy.
function BrandChip({ name, logo, href }) {
  return (
    <a className="brand-chip" href={href} target="_blank" rel="noopener noreferrer">
      <img className="brand-chip__logo" src={logo} alt="" />
      {name}
    </a>
  )
}


const projects = [
  {
    to: '/project/motorway',
    name: 'Motorway top of funnel',
    description: 'Increasing conversion by 6+% through multiple A/B tests',
    body: 'Optimising the first four pages a new seller sees. Rounds of A/B tests delivered 5%+ uplifts, including a 106% lift in price modal interaction.',
    tags: ['A/B testing', 'Web App', 'Growth'],
    image: 'https://framerusercontent.com/images/uxJV8RIR1IpcytkQgqSpaBWaz4.jpg',
  },
  {
    to: '/project/toyota',
    name: 'Toyota One App Onboarding',
    description: 'Shifting the goal from education to speed',
    body: 'A 1.4-star app and an onboarding that asked for trust before explaining anything. Testing showed users wanted speed, so we reset the goal. The rating is now 4.5.',
    tags: ['App', 'User Interviews'],
    image: toyotaThumb,
    disabled: true,
  },
  {
    to: '/project/benchmark',
    name: 'Benchmark',
    description: 'Web App for managing cost and carbon',
    body: 'Led design on a multi-app construction estimating tool, and built its design system from nothing, shipping it in code with an offshore team.',
    tags: ['Web App', 'B2B SaaS', 'Design System'],
    image: 'https://framerusercontent.com/images/LLDFfpjjrcOi88bo03WcWV6lufg.jpg',
  },
  {
    to: '/project/tu-help-pages',
    name: 'Tu',
    description: 'Reimagining the Help experience for TU Web',
    body: 'An accordion request uncovered that 1 in 5 orders ended in a call. A self-serve Help redesign cut time on task from 34s to 24s.',
    tags: ['Benchmarking', 'Design System', 'Cross Squad'],
    image: 'https://framerusercontent.com/images/je31xtRH6AFwAKWAAPhZkdRhyc.jpg',
  },
]

// Full-width stacking card: sticks to the top of the viewport so the next
// card slides up and layers over it.
function StackCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    return () => document.body.removeAttribute('data-cursor-hidden')
  }, [])

  return (
    <div className="pg-layer" data-layer style={{ zIndex: index + 1 }}>
      <Link
        to={project.to}
        className="pg-card"
        style={hovered ? { cursor: 'none' } : undefined}
        onClick={e => { if (project.disabled) e.preventDefault() }}
        onMouseEnter={e => { setPos({ x: e.clientX, y: e.clientY }); setHovered(true); document.body.setAttribute('data-cursor-hidden', 'true') }}
        onMouseLeave={() => { setHovered(false); document.body.removeAttribute('data-cursor-hidden') }}
        onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
      >
        <div className="pg-card__media">
          <img className="pg-card__image" src={project.image} alt={project.name} />
        </div>
        <div className="pg-card__info">
          <span className="pg-card__index">{String(index + 1).padStart(2, '0')}</span>
          <h2 className="pg-card__name">{project.name}</h2>
          <p className="pg-card__description">{project.description}</p>
          <p className="pg-card__body">{project.body}</p>
          <ul className="pg-card__tags">
            {project.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        {hovered && (
          <ProjectCursor
            x={pos.x}
            y={pos.y}
            label={project.disabled ? 'Sorry, not ready right now' : project.name}
            hideArrow={project.disabled}
          />
        )}
      </Link>
    </div>
  )
}

// As the next card slides over a layer, shrink and blur the one underneath (never the one on top).
function useLayerDepth(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const update = () => {
      const layers = [...root.querySelectorAll('[data-layer]')]
      layers.forEach((layer, i) => {
        const next = layers[i + 1]
        let cover = 0
        if (next) {
          // 0 while the next layer is just below this one, 1 once it has fully covered it
          const { top, height } = layer.getBoundingClientRect()
          const nextTop = next.getBoundingClientRect().top
          cover = Math.min(1, Math.max(0, 1 - (nextTop - top) / height))
        }
        layer.style.setProperty('--cover', cover.toFixed(3))
      })
    }
    // runs synchronously on scroll (4 cheap reads) so the blur never lags behind the layers
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref])
}

export default function HomePlayground() {
  const heroRef = useLineReveal()
  const stackRef = useRef(null)
  useLayerDepth(stackRef)

  return (
    <div className="home home--playground">

      <Nav />

      {/* Hero */}
      <section className="hero">
        <div ref={heroRef} className="hero-text hx-copy is-measuring">
          <h1>
            <Words>{"Hi, I'm "}</Words>
            <span className="hx-keep hx-unit"><HeroPill
              src="https://framerusercontent.com/images/7JaK76epjAcaHSNBbj2wWGOWQI.jpeg"
              label="Chris"
              icon={chrisIcon}
              variant="chip"
              cursor="none"
              renderOverlay={({ x, y }) => <ChrisBubble x={x} y={y} />}
            />,</span>
            <Words>{' currently a Lead Product Designer across Data and Insights '}</Words>
            <span className="hx-keep hx-unit">at <BrandChip name="Sony Music" logo={sonyMusicLogo} href="https://www.sonymusic.com" />.</span>
          </h1>
          <p>
            <Words>{'Previously at UK start '}</Words>
            <span className="hx-keep hx-unit">up <BrandChip name="Motorway" logo={motorwayLogo} href="https://www.motorway.co.uk" /></span>{' '}
            <span className="hx-keep hx-unit">and <BrandChip name="Toyota" logo={toyotaLogo} href="https://www.toyota.com" />,</span>
            <Words>{' working on onboarding and funnel conversion.'}</Words>
          </p>
          <p>
            <Words>{'Before that I was '}</Words>
            <span className="hx-keep hx-unit">at <BrandChip name="Sainsbury's" logo={sainsburysLogo} href="https://www.sainsburys.co.uk" />,</span>
            <Words>{' working across multiple squads.'}</Words>
          </p>
        </div>

        {/* Secondary CTA, 12px above the project card container */}
        <Button
          variant="secondary"
          size="sm"
          className="hero-cta"
          onClick={() => {
            if (window.lenis) window.lenis.scrollTo('#work')
            else document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          View selected work
          {/* Same arrow as the project cursor */}
          <svg className="btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <line x1="2" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <polyline points="9,4 13,8 9,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </section>

      {/* Work — each project is a full-width layer that stacks over the last */}
      <section id="work" className="pg-work">
        <div ref={stackRef} className="pg-stack">
          {projects.map((project, i) => (
            <StackCard key={project.to} project={project} index={i} />
          ))}
        </div>
        <div className="pg-footer">
          <Footer />
        </div>
      </section>

    </div>
  )
}

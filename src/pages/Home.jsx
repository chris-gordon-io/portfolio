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
import memojiImg from '../assets/memoji.png'
import sonyMusicLogo from '../assets/logos/sony-music.png'
import motorwayLogo from '../assets/logos/motorway.png'
import toyotaLogo from '../assets/logos/toyota.png'
import sainsburysLogo from '../assets/logos/sainsburys.png'
import './Home.css'
import './HomeHero.css'

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
    tags: ['A/B testing', 'Web App', 'Growth'],
    image: 'https://framerusercontent.com/images/uxJV8RIR1IpcytkQgqSpaBWaz4.jpg',
  },
  {
    to: '/project/toyota',
    name: 'Toyota One App Onboarding',
    description: 'Shifting the goal from education to speed',
    tags: ['App', 'User Interviews'],
    image: toyotaThumb,
    disabled: true,
  },
  {
    to: '/project/benchmark',
    name: 'Benchmark',
    description: 'Web App for managing cost and carbon',
    tags: ['Web App', 'B2B SaaS', 'Design System'],
    image: 'https://framerusercontent.com/images/LLDFfpjjrcOi88bo03WcWV6lufg.jpg',
  },
  {
    to: '/project/tu-help-pages',
    name: 'Tu',
    description: 'Reimagining the Help experience for TU Web',
    tags: ['Benchmarking', 'Design System', 'Cross Squad'],
    image: 'https://framerusercontent.com/images/je31xtRH6AFwAKWAAPhZkdRhyc.jpg',
  },
]

function ProjectCardWithCursor({ project }) {
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    return () => document.body.removeAttribute('data-cursor-hidden')
  }, [])

  return (
    <div>
      <Link
        to={project.to}
        className="project-card"
        style={hovered ? { cursor: 'none' } : undefined}
        onClick={e => { if (project.disabled) e.preventDefault() }}
        onMouseEnter={e => { setPos({ x: e.clientX, y: e.clientY }); setHovered(true); document.body.setAttribute('data-cursor-hidden', 'true') }}
        onMouseLeave={() => { setHovered(false); document.body.removeAttribute('data-cursor-hidden') }}
        onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}
      >
        <div className="project-image">
          <img src={project.image} alt={project.name} />
        </div>
        <div className="project-info">
          <span className="project-name">{project.name}</span>
          <p className="project-description">{project.description}</p>
          <ul className="project-tags">
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

export default function Home() {
  const heroRef = useLineReveal()

  return (
    <div className="home">

      <Nav />

      {/* Hero */}
      <section className="hero">
        <div ref={heroRef} className="hero-text hx-copy is-measuring">
          <h1>
            <Words>{"Hi, I'm "}</Words>
            <span className="hx-keep hx-unit"><HeroPill
              src="https://framerusercontent.com/images/7JaK76epjAcaHSNBbj2wWGOWQI.jpeg"
              label="Chris"
              icon={memojiImg}
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

      {/* Work — cards stagger in on scroll */}
      <section id="work" className="work">
        <div className="work-bottom">
          <div id="project-grid" className="project-grid">
            {projects.map((project, i) => (
              <ProjectCardWithCursor key={project.to} project={project} />
            ))}
          </div>
          <Footer />
        </div>
      </section>

    </div>
  )
}

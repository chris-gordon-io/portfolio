import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PillOverlay from '../components/PillOverlay'
import ChrisBubble from '../components/ChrisBubble'
import ProjectCursor from '../components/ProjectCursor'
import EastLondonCursor from '../components/EastLondonCursor'
import { useReveal } from '../hooks/useReveal'
import CGLogo from '../components/CGLogo'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import './Home.css'

/* variant: "light" | "solid" | "outline" */
function HeroPill({ src, label, body, chip, variant = 'light', renderOverlay, cursor, children, onMouseEnter: onMouseEnterProp }) {
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
    onMouseEnterProp?.()
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
      {children ?? label}
      {open && renderOverlay && renderOverlay({ x: pos.x, y: pos.y, cx: chipCenter.cx, cy: chipCenter.cy, rect: chipCenter.rect, entryX })}
    </span>
  )
}

const PREFIXES = ['Digital', 'Interaction', 'UI/UX', 'Experience', 'Product']

function CyclingDesignerPill() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('entering')
  const [containerWidth, setContainerWidth] = useState(null)
  const currentRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    if (currentRef.current) setContainerWidth(currentRef.current.offsetWidth)
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase('visible')))
  }, [])

  useEffect(() => {
    if (index >= PREFIXES.length - 1) return

    const delay = index === 0 ? 200 : 450
    const timer = setTimeout(() => {
      const nextWidth = nextRef.current?.offsetWidth
      if (nextWidth) setContainerWidth(nextWidth)
      setPhase('exiting')
      setTimeout(() => {
        setIndex(i => i + 1)
        setPhase('entering')
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase('visible')))
      }, 110)
    }, delay)
    return () => clearTimeout(timer)
  }, [index])

  const wordStyle = {
    visible:  { opacity: 1, transform: 'translateY(0)',     transition: 'opacity 0.1s ease-out, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)' },
    exiting:  { opacity: 0, transform: 'translateY(8px)',   transition: 'opacity 0.08s, transform 0.08s' },
    entering: { opacity: 0, transform: 'translateY(-14px)', transition: 'none' },
  }[phase]

  const nextIndex = (index + 1) % PREFIXES.length

  function handleReplay() {
    if (index < PREFIXES.length - 1) return
    setIndex(0)
    setPhase('entering')
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase('visible')))
  }

  return (
    <HeroPill variant="solid" onMouseEnter={handleReplay}>
      <span style={{ display: 'inline-block', position: 'relative', width: containerWidth ? `${containerWidth}px` : 'auto', transition: 'width 0.28s ease', marginRight: '0.25em' }}>
        <span ref={currentRef} style={{ display: 'inline-block', whiteSpace: 'nowrap', color: index === PREFIXES.length - 1 ? '#ffffff' : '#F0B4A4', ...wordStyle }}>{PREFIXES[index]}</span>
        <span ref={nextRef} style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap', pointerEvents: 'none', top: 0, left: 0 }} aria-hidden="true">{PREFIXES[nextIndex]}</span>
      </span>
      <span>Designer</span>
    </HeroPill>
  )
}

/** Reveals each child with a staggered delay using IntersectionObserver */
function RevealCard({ children, delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const projects = [
  {
    to: '/project/motorway',
    name: 'Motorway',
    description: 'Increasing conversion by 6+% through multiple A/B tests',
    tags: ['A/B testing', 'Web App', 'Growth'],
    image: 'https://framerusercontent.com/images/uxJV8RIR1IpcytkQgqSpaBWaz4.jpg',
  },
  {
    to: '/project/toyota',
    name: 'Toyota One App',
    description: 'A sprints worth of problem solving to delivery quickly',
    tags: ['App', 'User Interviews'],
    image: 'https://framerusercontent.com/images/ErArvAXIhunriTeaNeFJeOzS1s.jpg',
  },
  {
    to: '/project/benchmark',
    name: 'Benchmark',
    description: 'Web App for managing cost and carbon',
    tags: ['Web App', 'B2B SaaS', 'Design System'],
    image: 'https://framerusercontent.com/images/LLDFfpjjrcOi88bo03WcWV6lufg.jpg',
  },
  {
    to: '/project/4',
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
    <RevealCard delay={0}>
      <Link
        to={project.to}
        className="project-card"
        style={hovered ? { cursor: 'none' } : undefined}
        onMouseEnter={() => { setHovered(true); document.body.setAttribute('data-cursor-hidden', 'true') }}
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
        {hovered && <ProjectCursor x={pos.x} y={pos.y} label={project.name} />}
      </Link>
    </RevealCard>
  )
}

export default function Home() {
  const heroRef    = useReveal({ threshold: 0.05, rootMargin: '0px' })
  const workLabelRef = useReveal()

  return (
    <div className="home">

      <Nav />

      {/* Hero — fades up on load */}
      <section className="hero">
        <div ref={heroRef} className="hero-text reveal reveal--hero">
          <div className="availability-badge">
            <span className="availability-dot" />
            <span className="availability-text">Currently unavailable</span>
          </div>
          <div className="hero-row">
            <h1>Hi, I'm <HeroPill
              src="https://framerusercontent.com/images/7JaK76epjAcaHSNBbj2wWGOWQI.jpeg"
              label="Chris"
              variant="light"
              cursor="none"
              renderOverlay={({ x, y }) => <ChrisBubble x={x} y={y} />}
            />,</h1>
          </div>
          <div className="hero-row">
            <h1>a <CyclingDesignerPill /><br className="hero-mobile-break" /> who turns trust into conversion,</h1>
          </div>
          <div className="hero-row">
            <h1>based in <HeroPill
              label="East London"
              variant="outline"
              renderOverlay={({ x, y, rect }) => <EastLondonCursor x={x} y={y} rect={rect} />}
            /></h1>
          </div>
        </div>
      </section>

      {/* Work — label + cards stagger in on scroll */}
      <section id="work" className="work">
        <div ref={workLabelRef} className="work-label reveal">
          <span>Selected work</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3.5L8 12.5M8 12.5L4.5 9M8 12.5L11.5 9" stroke="#272737" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="project-grid">
          {projects.map((project, i) => (
            <ProjectCardWithCursor key={project.to} project={project} />
          ))}
        </div>
      </section>

      <Footer />

    </div>
  )
}

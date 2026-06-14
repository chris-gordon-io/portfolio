import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PillOverlay from '../components/PillOverlay'
import ChrisBubble from '../components/ChrisBubble'
import { useReveal } from '../hooks/useReveal'
import CGLogo from '../components/CGLogo'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import './Home.css'

/* variant: "light" | "solid" | "outline" */
function HeroPill({ src, label, body, chip, variant = 'light', renderOverlay, cursor }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    setPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <span
      className={`hero-pill hero-pill--${variant}`}
      style={cursor ? { cursor } : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onMouseMove={handleMouseMove}
    >
      {label}
      {open && (renderOverlay
        ? renderOverlay({ x: pos.x, y: pos.y })
        : <PillOverlay src={src} body={body} chip={chip} x={pos.x} y={pos.y} />
      )}
    </span>
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
    description: 'Optimising top of funnel though multiple A/B tests',
    tags: ['A/B testing', 'Web App', 'Growth'],
    image: 'https://framerusercontent.com/images/uxJV8RIR1IpcytkQgqSpaBWaz4.jpg',
  },
  {
    to: '/project/2',
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

export default function Home() {
  const heroRef    = useReveal({ threshold: 0.05, rootMargin: '0px' })
  const workLabelRef = useReveal()

  return (
    <div className="home">

      <Nav />

      {/* Hero — fades up on load */}
      <section className="hero">
        <div ref={heroRef} className="hero-text reveal reveal--hero">
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
            <h1>a <HeroPill
              src="https://framerusercontent.com/images/tTYgdPiTGbhzeaXafXDvw1XpY.jpeg"
              label="Product Designer"
              body="detail one, detail two"
              variant="solid"
            /><br className="hero-mobile-break" /> who turns trust into conversion,</h1>
          </div>
          <div className="hero-row">
            <h1>based in <HeroPill
              src="https://framerusercontent.com/images/Ac8hFJuz0jMErLTB2zGqHZgdUVo.png"
              label="East London"
              body="detail one, detail two"
              variant="outline"
            /></h1>
          </div>
        </div>
      </section>

      {/* Work — label + cards stagger in on scroll */}
      <section id="work" className="work">
        <p ref={workLabelRef} className="work-label reveal">Selected work</p>
        <div className="project-grid">
          {projects.map((project, i) => (
            <RevealCard key={project.to} delay={0}>
              <Link to={project.to} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.name} />
                </div>
                <div className="project-info">
                  <span className="project-name">{project.name}</span>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </RevealCard>
          ))}
        </div>
      </section>

      <Footer />

    </div>
  )
}

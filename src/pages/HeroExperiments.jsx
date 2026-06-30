import { useState, useRef, useEffect } from 'react'
import ChrisBubble from '../components/ChrisBubble'
import EastLondonCursor from '../components/EastLondonCursor'
import { useReveal } from '../hooks/useReveal'
import Nav from '../components/Nav'
import './Home.css'

function HeroPill({ src, label, body, chip, variant = 'light', renderOverlay, cursor, children }) {
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
      {children ?? label}
      {open && renderOverlay && renderOverlay({ x: pos.x, y: pos.y, cx: chipCenter.cx, cy: chipCenter.cy, rect: chipCenter.rect, entryX })}
    </span>
  )
}

const PREFIXES = ['Digital', 'Interaction', 'UI/UX', 'Experience', 'Product']

function CyclingDesignerPill() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('visible') // 'visible' | 'exiting' | 'entering'

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase('exiting')
      setTimeout(() => {
        setIndex(i => (i + 1) % PREFIXES.length)
        setPhase('entering')
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase('visible')))
      }, 200)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const wordStyle = {
    visible:  { opacity: 1, transform: 'translateY(0)',   transition: 'opacity 0.2s, transform 0.2s' },
    exiting:  { opacity: 0, transform: 'translateY(-10px)', transition: 'opacity 0.2s, transform 0.2s' },
    entering: { opacity: 0, transform: 'translateY(10px)',  transition: 'none' },
  }[phase]

  return (
    <HeroPill variant="solid">
      <span style={{ display: 'inline-block', marginRight: '0.25em', ...wordStyle }}>{PREFIXES[index]}</span>
      <span>Designer</span>
    </HeroPill>
  )
}

export default function HeroExperiments() {
  const heroRef = useReveal({ threshold: 0.05, rootMargin: '0px' })

  return (
    <div className="home">
      <Nav />

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
    </div>
  )
}

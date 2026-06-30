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
  const [phase, setPhase] = useState('entering')
  const [containerWidth, setContainerWidth] = useState(null)
  const currentRef = useRef(null)
  const nextRef = useRef(null)

  // Animate first word in on mount
  useEffect(() => {
    if (currentRef.current) setContainerWidth(currentRef.current.offsetWidth)
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase('visible')))
  }, [])

  useEffect(() => {
    if (index >= PREFIXES.length - 1) return // stop at Product Designer

    const delay = index === 0 ? 50 : 450
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
    visible:  { opacity: 1, transform: 'translateY(0)',    transition: 'opacity 0.1s ease-out, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)' },
    exiting:  { opacity: 0, transform: 'translateY(8px)',  transition: 'opacity 0.08s, transform 0.08s' },
    entering: { opacity: 0, transform: 'translateY(-14px)', transition: 'none' },
  }[phase]

  const nextIndex = (index + 1) % PREFIXES.length

  return (
    <HeroPill variant="solid">
      <span style={{
        display: 'inline-block',
        position: 'relative',
        width: containerWidth ? `${containerWidth}px` : 'auto',
        transition: 'width 0.28s ease',
        marginRight: '0.25em',
      }}>
        {/* Visible/animated word */}
        <span ref={currentRef} style={{ display: 'inline-block', whiteSpace: 'nowrap', ...wordStyle }}>
          {PREFIXES[index]}
        </span>
        {/* Hidden next word — used only for measuring */}
        <span ref={nextRef} style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap', pointerEvents: 'none', top: 0, left: 0 }} aria-hidden="true">
          {PREFIXES[nextIndex]}
        </span>
      </span>
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

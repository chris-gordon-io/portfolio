import { useState, useRef } from 'react'
import PillOverlay from '../components/PillOverlay'
import ChrisBubble from '../components/ChrisBubble'
import EastLondonCursor from '../components/EastLondonCursor'
import { useReveal } from '../hooks/useReveal'
import Nav from '../components/Nav'
import './Home.css'

function HeroPill({ src, label, body, chip, variant = 'light', renderOverlay, cursor }) {
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
      {label}
      {open && (renderOverlay
        ? renderOverlay({ x: pos.x, y: pos.y, cx: chipCenter.cx, cy: chipCenter.cy, rect: chipCenter.rect, entryX })
        : <PillOverlay src={src} body={body} chip={chip} x={pos.x} y={pos.y} />
      )}
    </span>
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
            <h1>a <HeroPill
              label="Product Designer"
              variant="solid"
            /><br className="hero-mobile-break" /> who turns trust into conversion,</h1>
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

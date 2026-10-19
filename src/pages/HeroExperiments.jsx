import { useState, useRef } from 'react'
import ChrisBubble from '../components/ChrisBubble'
import EastLondonCursor from '../components/EastLondonCursor'
import ProductDesignerBurst from '../components/ProductDesignerBurst'
import { useReveal } from '../hooks/useReveal'
import Nav from '../components/Nav'
import memojiImg from '../assets/memoji.png'
import sonyMusicLogo from '../assets/logos/sony-music.png'
import motorwayLogo from '../assets/logos/motorway.png'
import toyotaLogo from '../assets/logos/toyota.png'
import sainsburysLogo from '../assets/logos/sainsburys.png'
import './Home.css'
import './HeroExperiments.css'

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

// Outlined brand chip (Mobbin-style): app-icon logo + name, inline with the copy.
function BrandChip({ name, logo, href }) {
  return (
    <a className="brand-chip" href={href} target="_blank" rel="noopener noreferrer">
      <img className="brand-chip__logo" src={logo} alt="" />
      {name}
    </a>
  )
}

export default function HeroExperiments() {
  const heroRef = useReveal({ threshold: 0.05, rootMargin: '0px' })

  return (
    <div className="home">
      <Nav />

      <section className="hero">
        <div ref={heroRef} className="hero-text hx-copy reveal reveal--hero">
          <h1>Hi, I'm <HeroPill
            src="https://framerusercontent.com/images/7JaK76epjAcaHSNBbj2wWGOWQI.jpeg"
            label="Chris"
            icon={memojiImg}
            variant="chip"
            cursor="none"
            renderOverlay={({ x, y }) => <ChrisBubble x={x} y={y} />}
          />, currently a Lead Product Designer across Data and Insights <span className="hx-keep">at <BrandChip name="Sony Music" logo={sonyMusicLogo} href="https://www.sonymusic.com" />.</span></h1>
          <p>Previously at UK start <span className="hx-keep">up <BrandChip name="Motorway" logo={motorwayLogo} href="https://www.motorway.co.uk" /></span> <span className="hx-keep">and <BrandChip name="Toyota" logo={toyotaLogo} href="https://www.toyota.com" />,</span> working on onboarding and funnel conversion.</p>
          <p>Before that I was <span className="hx-keep">at <BrandChip name="Sainsbury's" logo={sainsburysLogo} href="https://www.sainsburys.co.uk" />,</span> working across multiple squads.</p>
        </div>
      </section>
    </div>
  )
}

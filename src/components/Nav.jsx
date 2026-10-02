import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import CGLogo from './CGLogo'
import './Nav.css'

// The intro (logo circle, then links expand out) only plays on the first load;
// the nav remounts on every route change, so later pages start fully open.
let introPlayed = false
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The hover pill stretches like a drop of water: the edge it's moving towards
// shoots ahead, the trailing edge lags then springs (overshoots) back into shape.
const LEAD = '0.28s cubic-bezier(0.3, 1.1, 0.5, 1)'
const TRAIL = '0.45s cubic-bezier(0.2, 1.15, 0.4, 1) 0.02s'
const SETTLE = '0.35s cubic-bezier(0.16, 1, 0.3, 1)'
function blobTransition({ movingRight, instant }) {
  if (instant) return 'opacity 0.2s ease'
  return `left ${movingRight ? TRAIL : LEAD}, right ${movingRight ? LEAD : TRAIL}, top ${SETTLE}, height ${SETTLE}, opacity 0.2s ease`
}

export default function Nav() {
  const [open, setOpen] = useState(() => introPlayed || reducedMotion())
  // Collapsed to just the logo while scrolling down, reopened on scroll up
  const [collapsed, setCollapsed] = useState(false)
  const introPending = useRef(!open)
  const pillRef = useRef(null)
  const navPillRef = useRef(null)
  const [pill, setPill] = useState({ opacity: 0, left: 0, right: 0, top: 0, height: 0, movingRight: true, instant: true })
  const [logoTrigger, setLogoTrigger] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (open) { introPlayed = true; return }
    const el = navPillRef.current
    const start = () => { introPlayed = true; setOpen(true) }
    // Some pages fade the pill in themselves (Home does, after its hero rows
    // settle) — wait for that to land so the links only expand once the logo
    // circle is in its final position.
    if (getComputedStyle(el).animationName === 'none') {
      const t = setTimeout(start, 500)
      return () => clearTimeout(t)
    }
    const onEnd = e => { if (e.target === el) start() }
    el.addEventListener('animationend', onEnd)
    return () => el.removeEventListener('animationend', onEnd)
  }, [open])

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastY
      if (y < 80) setCollapsed(false)
      else if (dy > 6) setCollapsed(true)
      else if (dy < -6) setCollapsed(false)
      // Only advance on a real move so Lenis' small per-frame deltas accumulate
      if (Math.abs(dy) > 6 || y < 80) lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (collapsed) setPill(p => ({ ...p, opacity: 0 }))
  }, [collapsed])

  function moveTo(e) {
    const el = e.currentTarget
    // offsetLeft/offsetTop are relative to the pill's padding box — the same
    // box position:absolute uses — so this stays pixel-aligned even though
    // the pill has a border (getBoundingClientRect diffing was off by the
    // border-width because it measured from the border box instead).
    const left = el.offsetLeft
    const right = navPillRef.current.clientWidth - left - el.offsetWidth
    const travelling = pill.opacity === 1 && left !== pill.left
    setPill({
      opacity: 1,
      left,
      right,
      top: el.offsetTop,
      height: el.offsetHeight,
      movingRight: left > pill.left,
      instant: !pill.positioned,
      positioned: true,
    })
    // Water-blob squish: goes thin mid-travel, then springs back
    if (travelling && !reducedMotion()) {
      pillRef.current.animate(
        [
          { transform: 'scaleY(1)' },
          { transform: 'scaleY(0.84)', offset: 0.35 },
          { transform: 'scaleY(1.03)', offset: 0.7 },
          { transform: 'scaleY(1)' },
        ],
        { duration: 500, easing: 'ease-out' },
      )
    }
  }

  function hide() {
    setPill(p => ({ ...p, opacity: 0 }))
  }

  return (
    <nav className="nav">
      <div ref={navPillRef} className={`nav-pill${open && collapsed ? ' nav-pill--scrolled' : ''}`} onMouseLeave={hide}>

        {/* Sliding background pill */}
        <div
          ref={pillRef}
          className="nav-hover-pill"
          style={{
            opacity: pill.opacity,
            left: pill.left,
            right: pill.right,
            top: pill.top,
            height: pill.height,
            transition: blobTransition(pill),
          }}
        />

        <Link
          to="/"
          className="nav-logo"
          onMouseEnter={e => { moveTo(e); setLogoTrigger(n => n + 1) }}
          onClick={e => { e.preventDefault(); window.location.href = '/#work'; window.lenis?.scrollTo('#work') }}
        >
          <CGLogo size={24} trigger={logoTrigger} />
        </Link>
        <div
          className={`nav-links${open && !collapsed ? ' nav-links--open' : ''}`}
          // Wink once the intro lands (links fully expanded), as a full stop
          onTransitionEnd={e => {
            if (e.target === e.currentTarget && e.propertyName === 'grid-template-columns' && open && !collapsed && introPending.current) {
              introPending.current = false
              setLogoTrigger(n => n + 1)
            }
          }}
        >
          <div className="nav-links-clip">
            <div className="nav-links-track">
              <a
                href="/#work"
                className="nav-link"
                onMouseEnter={moveTo}
                onClick={e => {
                  e.preventDefault()
                  if (location.pathname === '/') {
                    window.lenis?.scrollTo('#work')
                  } else {
                    navigate('/')
                    setTimeout(() => window.lenis?.scrollTo('#work'), 100)
                  }
                }}
              >Work</a>
              <Link to="/about" className="nav-link" onMouseEnter={moveTo}>About</Link>
              <a href="mailto:c.p.gordon@me.com" className="nav-link" onMouseEnter={moveTo}>Email</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

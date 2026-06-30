import { useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import CGLogo from './CGLogo'
import './Nav.css'

export default function Nav() {
  const pillRef = useRef(null)
  const [pill, setPill] = useState({ opacity: 0, left: 0, top: 0, width: 0, height: 0 })
  const [logoTrigger, setLogoTrigger] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  function moveTo(e) {
    const el = e.currentTarget
    const parent = pillRef.current.parentElement
    const parentRect = parent.getBoundingClientRect()
    const rect = el.getBoundingClientRect()
    setPill({
      opacity: 1,
      left: rect.left - parentRect.left,
      top: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height,
    })
  }

  function hide() {
    setPill(p => ({ ...p, opacity: 0 }))
  }

  return (
    <nav className="nav">
      <div className="nav-pill" onMouseLeave={hide}>

        {/* Sliding background pill */}
        <div
          ref={pillRef}
          className="nav-hover-pill"
          style={{
            opacity: pill.opacity,
            transform: `translate(${pill.left}px, ${pill.top}px)`,
            width: pill.width,
            height: pill.height,
          }}
        />

        <Link
          to="/"
          className="nav-logo"
          onMouseEnter={e => { moveTo(e); setLogoTrigger(n => n + 1) }}
          onClick={e => { e.preventDefault(); window.location.href = '/#work'; window.lenis?.scrollTo('#work') }}
        >
          <CGLogo size={22} trigger={logoTrigger} />
        </Link>
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
    </nav>
  )
}

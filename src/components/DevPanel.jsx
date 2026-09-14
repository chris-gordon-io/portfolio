import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

export default function DevPanel() {
  if (!import.meta.env.DEV) return null
  return <Panel />
}

function Panel() {
  const location = useLocation()
  const [items, setItems] = useState([])
  const [visible, setVisible] = useState(true)

  const scan = useCallback(() => {
    const els = Array.from(document.querySelectorAll('[data-dev-component]'))
    setItems(els.map((el, i) => ({
      label: el.getAttribute('data-dev-component'),
      el,
      number: i + 1,
    })))
  }, [])

  useEffect(() => {
    const t = setTimeout(scan, 50)
    return () => clearTimeout(t)
  }, [scan, location.pathname])

  function scrollTo(el) {
    el.scrollIntoView({ behavior: 'instant', block: 'center' })
    el.style.outline = '2px solid #F4691A'
    el.style.outlineOffset = '4px'
    setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = '' }, 1500)
  }

  // ── collapsed toggle ──────────────────────────────────────────
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
          zIndex: 9999, background: '#23233B', color: '#fff',
          border: 'none', borderRadius: 8, padding: '8px 10px',
          cursor: 'pointer', fontSize: 12, fontFamily: 'system-ui, sans-serif',
        }}
      >⊞</button>
    )
  }

  // ── panel ────────────────────────────────────────────────────
  return (
    <div style={{
      position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
      zIndex: 9999, background: '#fff', borderRadius: 14, padding: '10px 6px',
      boxShadow: '0 4px 32px rgba(0,0,0,0.14)', width: 210,
      fontFamily: 'system-ui, sans-serif', fontSize: 12,
      maxHeight: '80vh', display: 'flex', flexDirection: 'column',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 8px', borderBottom: '1px solid #f0f0f0', marginBottom: 6 }}>
        <span style={{ fontWeight: 600, fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Dev · Components</span>
        <button onClick={() => setVisible(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
      </div>

      {/* List */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {items.length === 0 && (
          <p style={{ color: '#bbb', textAlign: 'center', padding: '12px 8px', margin: 0 }}>No components found</p>
        )}
        {items.map(item => (
          <div
            key={item.number}
            onClick={() => scrollTo(item.el)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 8px', borderRadius: 8, cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ color: '#bbb', fontSize: 11, flexShrink: 0, minWidth: 14, textAlign: 'right' }}>{item.number}</span>
            <span style={{ flex: 1, color: '#23233B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.label}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

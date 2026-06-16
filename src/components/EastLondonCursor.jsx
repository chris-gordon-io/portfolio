import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './EastLondonCursor.css'

function OdometerDigit({ value }) {
  const prevRef  = useRef(value)
  const [curr, setCurr]       = useState(value)
  const [stripKey, setStripKey] = useState(0)

  useEffect(() => {
    if (value !== curr) {
      prevRef.current = curr
      setCurr(value)
      setStripKey(k => k + 1)
    }
  }, [value, curr])

  return (
    <div className="el-digit-tile">
      <span
        className={stripKey > 0 ? 'od-strip od-strip--rolling' : 'od-strip'}
        key={stripKey}
      >
        <span>{prevRef.current}</span>
        <span>{curr}</span>
      </span>
    </div>
  )
}

function buildTokens(lat, lon) {
  const tokens = []
  for (const c of lat) tokens.push(c === '.' ? { type: 'dot', char: c } : { type: 'digit', char: c })
  tokens.push({ type: 'label', char: '° N' })
  tokens.push({ type: 'sep',   char: '|' })
  for (const c of lon) tokens.push(c === '.' ? { type: 'dot', char: c } : { type: 'digit', char: c })
  tokens.push({ type: 'label', char: '° W' })
  return tokens
}

export default function EastLondonCursor({ x, y, rect }) {
  useEffect(() => {
    document.body.setAttribute('data-cursor-hidden', 'true')
    return () => document.body.removeAttribute('data-cursor-hidden')
  }, [])

  const relX = rect ? Math.max(0, Math.min(1, (x - rect.left)  / rect.width))  : 0.5
  const relY = rect ? Math.max(0, Math.min(1, (y - rect.top)   / rect.height)) : 0.5

  const lat = (51.5940 - relY * 0.0080).toFixed(4)
  const lon = (0.0250  - relX * 0.0150).toFixed(4)

  const tokens = buildTokens(lat, lon)

  return createPortal(
    <div className="el-cursor" style={{ left: x, top: y }}>
      {tokens.map((t, i) => {
        if (t.type === 'digit') return <OdometerDigit key={i} value={t.char} />
        if (t.type === 'sep')   return <span key={i} className="el-tile el-sep">{t.char}</span>
        return <span key={i} className="el-tile">{t.char}</span>
      })}
    </div>,
    document.body
  )
}

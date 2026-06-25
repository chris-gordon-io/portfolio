import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './ChrisBubble.css'

const CHARS = Array.from('Hi 👋')
const CHAR_DELAY = 110   // ms between characters
const START_DELAY = 260  // ms before first char (bubble animate-in is 250ms)

export default function ChrisBubble({ x = 0, y = 0 }) {
  const [typed, setTyped]         = useState(0)
  const [showCaret, setShowCaret] = useState(true)

  useEffect(() => {
    document.body.setAttribute('data-cursor-hidden', 'true')
    return () => document.body.removeAttribute('data-cursor-hidden')
  }, [])

  useEffect(() => {
    if (typed >= CHARS.length) {
      const t = setTimeout(() => setShowCaret(false), 700)
      return () => clearTimeout(t)
    }
    const delay = typed === 0 ? START_DELAY : CHAR_DELAY
    const t = setTimeout(() => setTyped(n => n + 1), delay)
    return () => clearTimeout(t)
  }, [typed])

  const displayText = CHARS.slice(0, typed).join('')

  return createPortal(
    <div className="chris-bubble" style={{ left: x, top: y }}>
      <div className="chris-bubble-box">
        <span className="chris-bubble-anchor" aria-hidden="true">Hi 👋</span>
        <span className="chris-bubble-display">
          {displayText}
          {showCaret && <span className="chris-bubble-caret" />}
        </span>
      </div>
    </div>,
    document.body
  )
}

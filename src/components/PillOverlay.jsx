import { createPortal } from 'react-dom'
import './PillOverlay.css'

export default function PillOverlay({ title, body, chip, src, x = 0, y = 0 }) {
  const left = x + 24
  const top  = y - 140

  return createPortal(
    <div className="pill-overlay" style={{ left, top }}>
      <div className="pill-overlay-img">
        <img src={src} alt="" />
      </div>
      <p className="pill-overlay-body">{body}</p>
    </div>,
    document.body
  )
}

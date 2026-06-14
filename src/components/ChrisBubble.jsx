import { createPortal } from 'react-dom'
import './ChrisBubble.css'

export default function ChrisBubble({ x = 0, y = 0 }) {
  return createPortal(
    <div className="chris-bubble" style={{ left: x, top: y }}>
      <svg className="chris-bubble-cursor" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L16 7L10 10L8 20L0 0Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
      <div className="chris-bubble-box">Hi 👋</div>
    </div>,
    document.body
  )
}

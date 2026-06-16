import { createPortal } from 'react-dom'
import './ProjectCursor.css'

export default function ProjectCursor({ x, y, label }) {
  return createPortal(
    <div className="project-cursor" style={{ left: x, top: y }}>
      <span className="project-cursor-label">{label}</span>
      <svg className="project-cursor-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <line x1="2" y1="8" x2="13" y2="8" stroke="#E16949" strokeWidth="1.5" strokeLinecap="round"/>
        <polyline points="9,4 13,8 9,12" fill="none" stroke="#E16949" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>,
    document.body
  )
}

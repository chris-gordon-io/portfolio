import { useReveal } from '../../hooks/useReveal'
import './ProjectComponents.css'

function TopIcon() {
  return (
    <div className="pc-topline-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="2"/>
        <circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="#ffffff"/>
      </svg>
    </div>
  )
}

export default function ProjectTopline({ children }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="pc-topline-section reveal" data-dev-component="Topline">
      <div className="pc-topline-container">
        <div className="pc-topline-inner">
          <TopIcon />
          <p className="pc-topline-eyebrow">Topline</p>
          <div className="pc-topline-headline">{children}</div>
        </div>
      </div>
    </div>
  )
}

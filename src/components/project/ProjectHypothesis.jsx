import { useReveal } from '../../hooks/useReveal'
import './ProjectComponents.css'

export default function ProjectHypothesis({ children }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="pc-section pc-section--slim reveal" data-dev-component="Hypothesis">
      <div className="pc-hypothesis">
        <p className="pc-hypothesis-label">Hypothesis</p>
        <p className="pc-hypothesis-text">{children}</p>
      </div>
    </div>
  )
}

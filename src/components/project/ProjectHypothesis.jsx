import './ProjectComponents.css'

export default function ProjectHypothesis({ children }) {
  return (
    <div className="pc-section pc-section--slim">
      <div className="pc-hypothesis">
        <p className="pc-hypothesis-label">Hypothesis</p>
        <p className="pc-hypothesis-text">{children}</p>
      </div>
    </div>
  )
}

import './ProjectComponents.css'

export default function ProjectImpact({ children }) {
  return (
    <div className="pc-impact-section" data-dev-component="Impact">
      <div className="pc-impact-container">
        <div className="pc-topline-inner">
          <p className="pc-impact-eyebrow">Impact</p>
          <div className="pc-impact-headline">{children}</div>
        </div>
      </div>
    </div>
  )
}

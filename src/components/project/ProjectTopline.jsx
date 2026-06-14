import './ProjectComponents.css'

export default function ProjectTopline({ children }) {
  return (
    <div className="pc-section">
      <div className="pc-topline-container">
        <p className="pc-callout-eyebrow">Topline</p>
        <div className="pc-callout-headline">{children}</div>
      </div>
    </div>
  )
}

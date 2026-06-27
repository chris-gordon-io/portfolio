import './ProjectComponents.css'

export default function ProjectTopline({ children }) {
  return (
    <div className="pc-section">
      <div className="pc-topline-container">
        <p className="pc-topline-eyebrow">Topline</p>
        <div className="pc-topline-headline">{children}</div>
      </div>
    </div>
  )
}

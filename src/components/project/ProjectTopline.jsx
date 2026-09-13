import './ProjectComponents.css'

export default function ProjectTopline({ children }) {
  return (
    <div className="pc-topline-section">
      <div className="pc-topline-container">
        <div className="pc-topline-inner">
          <p className="pc-topline-eyebrow">Topline</p>
          <div className="pc-topline-headline">{children}</div>
        </div>
      </div>
    </div>
  )
}

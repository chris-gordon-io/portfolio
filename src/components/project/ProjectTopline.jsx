import './ProjectComponents.css'

function TopIcon() {
  return (
    <div className="pc-topline-icon">
      <span className="pc-topline-icon-glyph">i</span>
    </div>
  )
}

export default function ProjectTopline({ children }) {
  return (
    <div className="pc-topline-section" data-dev-component="Topline">
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

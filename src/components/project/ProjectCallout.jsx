import './ProjectComponents.css'

export default function ProjectCallout({ eyebrow, headline, children }) {
  return (
    <div className="pc-section">
      <div className="pc-callout">
        {eyebrow && <p className="pc-callout-eyebrow">{eyebrow}</p>}
        {headline && <p className="pc-callout-headline">{headline}</p>}
        {children && <div className="pc-callout-body">{children}</div>}
      </div>
    </div>
  )
}

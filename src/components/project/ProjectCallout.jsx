import { useReveal } from '../../hooks/useReveal'
import './ProjectComponents.css'

export default function ProjectCallout({ eyebrow, headline, children }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="pc-section reveal" data-dev-component={`Callout${eyebrow ? ` — ${eyebrow}` : ''}`}>
      <div className="pc-callout">
        {eyebrow && <p className="pc-callout-eyebrow">{eyebrow}</p>}
        {headline && <p className="pc-callout-headline">{headline}</p>}
        {children && <div className="pc-callout-body">{children}</div>}
      </div>
    </div>
  )
}

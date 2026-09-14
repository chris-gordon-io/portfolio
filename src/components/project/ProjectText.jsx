import { useReveal } from '../../hooks/useReveal'
import './ProjectComponents.css'

/**
 * ProjectText — two-column section: heading left, body right.
 *
 * @param {string}    heading      Section heading text. Supports JSX (e.g. spans for light weight).
 * @param {boolean}   accent       Makes heading orange (topline / highlight use).
 * @param {boolean}   slim         Removes top padding (use after an image section).
 * @param {ReactNode} children     Body content — <p>, lists, checklists, etc.
 */
export default function ProjectText({ heading, accent = false, slim = false, children }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`pc-section reveal${slim ? ' pc-section--slim' : ''}`} data-dev-component={`Text${heading ? ` — ${heading}` : ''}`}>
      <div className="pc-content-block">
        <div className="pc-col-heading">
          <h2 className={`pc-heading${accent ? ' accent' : ''}`}>{heading}</h2>
        </div>
        <div className="pc-col-body">
          {children}
        </div>
      </div>
    </div>
  )
}

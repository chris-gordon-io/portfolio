import './ProjectComponents.css'

/**
 * ProjectMetrics — dark results block with stat cards.
 *
 * @param {string}   heading   Block heading. Defaults to "Results".
 * @param {string}   intro     Optional introductory sentence above the cards.
 * @param {Array}    metrics   Array of { number: string, label: string }.
 *
 * Example:
 *   <ProjectMetrics
 *     intro="Each change had 5%+ positive impact during A/B testing."
 *     metrics={[
 *       { number: '+6.65%', label: 'CTA in all viewports' },
 *       { number: '+3.21%', label: 'CTA updates' },
 *     ]}
 *   />
 */
export default function ProjectMetrics({ heading = 'Results', intro, metrics = [] }) {
  return (
    <div className="pc-metrics-block">
      <div className="pc-content-block">
        <div className="pc-col-heading">
          <h2 className="pc-heading muted">{heading}</h2>
        </div>
        <div className="pc-col-body">
          {intro && <p className="pc-body light">{intro}</p>}
          <div className="pc-stat-cards">
            {metrics.map((m, i) => (
              <div key={i} className="pc-stat-card">
                <span className="pc-stat-number">{m.number}</span>
                <span className="pc-stat-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

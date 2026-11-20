import { useId, useLayoutEffect, useRef, useState } from 'react'
import './SpinningText.css'

// Rotating ring of type: "LEARN → DO → LEARN → DO →" set on a circle, with the
// site's diagonal link arrow (BentoArrow) between the words, turned to point
// along the direction of travel.

const SIZE = 124
const CENTRE = SIZE / 2
const RADIUS = 46            // baseline of the type
const CAP = 8.5              // approx cap height at 12px, so type + arrows centre on one radius
const MID = RADIUS + CAP / 2
const ARROW = 11             // rendered arrow size (px)
const CIRC = 2 * Math.PI * RADIUS

const SEQUENCE = ['LEARN', 'arrow', 'DO', 'arrow', 'LEARN', 'arrow', 'DO', 'arrow']

// Centre of every item as a distance along the circle, with the leftover
// space shared equally between the 8 gaps so the ring is evenly spaced.
function layout(widths) {
  const sizes = SEQUENCE.map(s => (s === 'arrow' ? ARROW : widths[s]))
  const gap = (CIRC - sizes.reduce((a, b) => a + b, 0)) / SEQUENCE.length
  let d = gap / 2
  return SEQUENCE.map((s, i) => {
    const centre = d + sizes[i] / 2
    d += sizes[i] + gap
    return { type: s, centre }
  })
}

export default function SpinningText({ className = '' }) {
  const pathId = `spin-${useId().replace(/:/g, '')}`
  const learnRef = useRef(null)
  const doRef = useRef(null)
  const [widths, setWidths] = useState({ LEARN: 46, DO: 22 })

  // Measure the real word widths once the webfont is in, so the spacing is exact
  useLayoutEffect(() => {
    let cancelled = false
    const measure = () => {
      if (cancelled || !learnRef.current || !doRef.current) return
      setWidths({
        LEARN: learnRef.current.getComputedTextLength(),
        DO: doRef.current.getComputedTextLength(),
      })
    }
    measure()
    document.fonts?.ready.then(measure)
    return () => { cancelled = true }
  }, [])

  const items = layout(widths)

  return (
    <div className={`spin-ring ${className}`} aria-hidden="true">
      <svg
        className="spin-ring__svg"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* clockwise circle starting at 12 o'clock */}
          <path
            id={pathId}
            d={`M ${CENTRE} ${CENTRE - RADIUS} a ${RADIUS} ${RADIUS} 0 1 1 0 ${2 * RADIUS} a ${RADIUS} ${RADIUS} 0 1 1 0 ${-2 * RADIUS}`}
          />
        </defs>

        {/* off-screen copies used only to measure the words */}
        <text ref={learnRef} className="spin-ring__text" visibility="hidden">LEARN</text>
        <text ref={doRef} className="spin-ring__text" visibility="hidden">DO</text>

        {items.map((item, i) =>
          item.type === 'arrow' ? (
            <g
              key={i}
              transform={`rotate(${(item.centre / RADIUS) * (180 / Math.PI)} ${CENTRE} ${CENTRE}) translate(${CENTRE} ${CENTRE - MID})`}
            >
              {/* the glyph points up-right; turn it 45deg so it points along the path */}
              <g transform={`rotate(45) scale(${ARROW / 16}) translate(-8 -8)`}>
                <path
                  d="M3 13L13 3M13 3H5M13 3V11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          ) : (
            <text key={i} className="spin-ring__text">
              <textPath href={`#${pathId}`} startOffset={item.centre} textAnchor="middle">
                {item.type}
              </textPath>
            </text>
          )
        )}
      </svg>
    </div>
  )
}

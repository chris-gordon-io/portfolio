import { useState } from 'react'
import './ProductDesignerBurst.css'

function rand(min, max) { return min + Math.random() * (max - min) }

const Figma = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#1E1E1E"/>
    <rect x="10" y="5"  width="9" height="11" rx="4.5" fill="#F24E1E"/>
    <rect x="21" y="5"  width="9" height="11" rx="4.5" fill="#FF7262"/>
    <rect x="10" y="17" width="9" height="11" rx="4.5" fill="#A259FF"/>
    <circle cx="25.5" cy="22.5" r="4.5" fill="#1ABCFE"/>
    <circle cx="14.5" cy="33.5" r="4.5" fill="#0ACF83"/>
  </svg>
)

const Sketch = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#FDB300"/>
    <polygon points="20,6 34,17 28,34 12,34 6,17" fill="#EA6C00" opacity="0.55"/>
    <polygon points="20,9 31,18.5 26.5,32 13.5,32 9,18.5" fill="#FDB300"/>
    <polygon points="20,13 27,19.5 20,28 13,19.5" fill="white" opacity="0.85"/>
  </svg>
)

const Miro = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#FFD02F"/>
    <path d="M10 29 L14 12 L20 24 L26 12 L30 29" stroke="#050038" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Claude = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#D97757"/>
    <path d="M20 7 L20 14 M20 26 L20 33 M7 20 L14 20 M26 20 L33 20 M11.1 11.1 L16.2 16.2 M23.8 23.8 L28.9 28.9 M28.9 11.1 L23.8 16.2 M16.2 23.8 L11.1 28.9" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="4" fill="white"/>
  </svg>
)

const Cursor = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#161618"/>
    <path d="M13 9 L13 31 L19.5 24.5 L23.5 33 L27 31.5 L23 23 L31 23 Z" fill="white"/>
  </svg>
)

const ICON_COMPONENTS = [Figma, Sketch, Miro, Claude, Cursor]

export default function ProductDesignerBurst({ entryX = null, rect = null }) {
  const [icons] = useState(() => {
    const entryPct = (entryX !== null && rect)
      ? Math.max(10, Math.min(90, ((entryX - rect.left) / rect.width) * 100))
      : 50

    return ICON_COMPONENTS.map((Icon, i) => {
      const sxPct = (entryPct - 25) + (i / (ICON_COMPONENTS.length - 1)) * 50
      const distFromCentre = (sxPct - entryPct) / 50
      const tx   = distFromCentre * 380 + rand(-10, 10)
      // All icons go up; centre icons arc highest, edge icons go more sideways
      const ty   = -(rand(120, 180) * (1 - Math.abs(distFromCentre) * 0.4))
      return {
        id:       i,
        Icon,
        sx:       `${sxPct}%`,
        tx,
        ty,
        rot:      (Math.random() > 0.5 ? 1 : -1) * rand(12, 25),
        delay:    rand(0, 100),
        size:     rand(51, 64),
        duration: rand(1200, 1600),
      }
    })
  })

  return (
    <div className="pd-burst" aria-hidden="true">
      {icons.map(({ id, Icon, sx, tx, ty, rot, delay, size, duration }) => (
        <span
          key={id}
          className="pd-burst-icon"
          style={{
            '--sx':  sx,
            '--tx':  `${tx}px`,
            '--ty':  `${ty}px`,
            '--rot': `${rot}deg`,
            animationDelay:    `${delay}ms`,
            animationDuration: `${duration}ms`,
            width:   size,
            height:  size,
          }}
        >
          <Icon />
        </span>
      ))}
    </div>
  )
}

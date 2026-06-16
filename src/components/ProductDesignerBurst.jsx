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

const Maze = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#FB4500"/>
    <polygon points="20,8 31,14.5 31,27.5 20,34 9,27.5 9,14.5" fill="none" stroke="white" strokeWidth="2.5"/>
    <circle cx="20" cy="21" r="4" fill="white"/>
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

const Jitter = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#6C3CE1"/>
    <path d="M12 30 C12 24 17 22 20 20 C23 18 28 16 28 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="12" cy="30" r="3.5" fill="white"/>
    <circle cx="28" cy="10" r="3.5" fill="white"/>
  </svg>
)

const Cursor = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#161618"/>
    <path d="M13 9 L13 31 L19.5 24.5 L23.5 33 L27 31.5 L23 23 L31 23 Z" fill="white"/>
  </svg>
)

const FigJam = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#F24E1E"/>
    <path d="M27.5 8.5 L33 14 L16.5 30.5 L10 33 L12.5 26.5 Z" fill="white"/>
    <line x1="24" y1="12" x2="29.5" y2="17.5" stroke="#F24E1E" strokeWidth="2"/>
  </svg>
)

const ICON_COMPONENTS = [Figma, Sketch, Maze, Miro, Claude, Jitter, Cursor, FigJam]

export default function ProductDesignerBurst() {
  const [icons] = useState(() =>
    ICON_COMPONENTS.map((Icon, i) => {
      const sxPct = 25 + (i / (ICON_COMPONENTS.length - 1)) * 50
      const distFromCentre = (sxPct - 50) / 50
      const tx   = distFromCentre * 400 + rand(-15, 15)
      const goUp = i % 2 === 0
      const ty   = (goUp ? -1 : 1) * rand(130, 200)
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
  )

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

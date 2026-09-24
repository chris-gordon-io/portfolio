import { useReveal } from '../../hooks/useReveal'
import './ProjectComponents.css'

/**
 * ProjectImage — captioned image card. One component, content-driven height.
 *
 * @param {string}  caption  Optional title, centred above the images.
 * @param {Array}   images   [{ src, alt, caption }] — 1 image renders wide
 *                           (up to 1200px); 2+ sit side by side (up to 280px
 *                           each, e.g. phone mockups).
 */
export default function ProjectImage({ caption, images = [] }) {
  const isSingle = images.length === 1
  const isTrio = images.length >= 3
  const ref = useReveal()

  const cardClass = [
    'pc-image-card',
    isSingle && 'pc-image-card--single',
    isTrio && 'pc-image-card--trio',
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className="pc-image-section reveal" data-dev-component={`Image${caption ? ` — ${caption}` : ''}`}>
      <div className={cardClass}>
        {caption && <p className="pc-image-title">{caption}</p>}
        {images.map((image, i) => (
          <figure key={i} className="pc-image-fig">
            <img src={image.src} alt={image.alt ?? ''} />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  )
}

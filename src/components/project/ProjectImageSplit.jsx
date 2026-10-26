import { useReveal } from '../../hooks/useReveal'
import './ProjectComponents.css'

// An empty container still renders (no image yet), so the block keeps its shape.
function SplitFigure({ image = {}, className }) {
  return (
    <figure className={`pc-split-fig${className ? ` ${className}` : ''}`}>
      <div className="pc-split-frame">
        {image.src && (
          <img
            src={image.src}
            alt={image.alt ?? ''}
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        )}
      </div>
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  )
}

/**
 * ProjectImageSplit — image block: two stacked containers on the left, one tall
 * container on the right. Same card, title, caption and reveal behaviour as
 * ProjectImage.
 *
 * @param {string} caption  Optional title, centred above the images.
 * @param {Array}  images   [topLeft, bottomLeft, right], each { src, alt, caption,
 *                          position }. Leave an entry out (or give it no `src`) to
 *                          show an empty container. Images fill their container
 *                          (cover); `position` is the CSS object-position,
 *                          default "top center".
 */
export default function ProjectImageSplit({ caption, images = [] }) {
  const ref = useReveal()
  const [topLeft, bottomLeft, right] = images

  return (
    <div ref={ref} className="pc-image-section reveal" data-dev-component={`Image block${caption ? ` — ${caption}` : ''}`}>
      <div className="pc-image-card pc-split-card">
        {caption && <p className="pc-image-title">{caption}</p>}
        <div className="pc-split-grid">
          <div className="pc-split-left">
            <SplitFigure image={topLeft} />
            <SplitFigure image={bottomLeft} />
          </div>
          <SplitFigure image={right} className="pc-split-fig--tall" />
        </div>
      </div>
    </div>
  )
}

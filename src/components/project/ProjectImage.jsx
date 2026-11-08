import { useReveal } from '../../hooks/useReveal'
import LottiePlayer from './LottiePlayer'
import './ProjectComponents.css'

/**
 * ProjectImage — captioned image card. One component, content-driven height.
 *
 * @param {string}  caption  Optional title, centred above the images.
 * @param {Array}   images   [{ src, alt, caption, shadow }] — 1 image renders wide
 *                           (up to 1200px); 2+ sit side by side (up to 280px
 *                           each, e.g. phone mockups). A wide image gets a soft
 *                           drop shadow; set `shadow: false` to drop it (e.g. for
 *                           cut-outs with a transparent background).
 *                           Give an image `lottie` (a .json URL) instead of `src`
 *                           to play a looping Lottie in its place, and `width` (px)
 *                           to cap how wide it renders.
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
    <div ref={ref} className="pc-image-section reveal" data-dev-component={`Image${typeof caption === 'string' ? ` — ${caption}` : ''}`}>
      <div className={cardClass}>
        {caption && <p className="pc-image-title">{caption}</p>}
        {images.map((image, i) => (
          <figure
            key={i}
            className={`pc-image-fig${image.shadow === false ? ' pc-image-fig--flat' : ''}`}
            style={image.width ? { maxWidth: image.width } : undefined}
          >
            {image.lottie
              ? <LottiePlayer src={image.lottie} alt={image.alt ?? ''} />
              : <img src={image.src} alt={image.alt ?? ''} />}
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  )
}

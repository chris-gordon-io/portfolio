import { useReveal } from '../../hooks/useReveal'
import './ProjectComponents.css'

/**
 * ProjectHero
 *
 * @param {string}  title       Project title, shown inside the hero card.
 * @param {string}  subtitle    Project subtitle, shown under the title.
 * @param {string}  background  CSS background value — gradient or solid colour.
 *                              Defaults to the Motorway blue gradient.
 * @param {{ src: string, alt?: string }} image  Optional phone/mockup image.
 */
export default function ProjectHero({
  title,
  subtitle,
  background = 'linear-gradient(180deg, #0560cc 0%, #063165 100%)',
  image,
  wide = false,
  fullWidth = false,
}) {
  const ref = useReveal({ threshold: 0.05, rootMargin: '0px' })
  return (
    <div className="pc-hero-section" data-dev-component="Hero">
      <div
        ref={ref}
        className={`${fullWidth ? 'pc-hero pc-hero--full' : 'pc-hero'} reveal reveal--hero`}
        style={{ background }}
      >
        {title && (
          <div className="pc-hero-title-block">
            <h1 className="heading-1 pc-hero-title">{title}</h1>
            {subtitle && <p className="pc-subtitle pc-hero-subtitle">{subtitle}</p>}
          </div>
        )}
        {image && (
          <div className={wide ? 'pc-hero-image--wide' : 'pc-hero-image'}>
            <img src={image.src} alt={image.alt ?? ''} />
          </div>
        )}
      </div>
    </div>
  )
}

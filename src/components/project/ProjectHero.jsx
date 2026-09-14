import { useReveal } from '../../hooks/useReveal'
import './ProjectComponents.css'

/**
 * ProjectHero
 *
 * @param {string}  background  CSS background value — gradient or solid colour.
 *                              Defaults to the Motorway blue gradient.
 * @param {{ src: string, alt?: string }} image  Optional phone/mockup image.
 */
export default function ProjectHero({
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
        {image && (
          <div className={wide ? 'pc-hero-image--wide' : 'pc-hero-image'}>
            <img src={image.src} alt={image.alt ?? ''} />
          </div>
        )}
      </div>
    </div>
  )
}

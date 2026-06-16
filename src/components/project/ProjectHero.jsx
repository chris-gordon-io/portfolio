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
  return (
    <div
      className={fullWidth ? 'pc-hero pc-hero--full' : 'pc-hero'}
      style={{ background }}
    >
      {image && (
        <div className={wide ? 'pc-hero-image--wide' : 'pc-hero-image'}>
          <img src={image.src} alt={image.alt ?? ''} />
        </div>
      )}
    </div>
  )
}

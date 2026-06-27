import './ProjectComponents.css'

/**
 * ProjectImage — captioned image section.
 *
 * variant="wide"   Full-width white card — good for dashboards, funnels, wide screenshots.
 *   props: src, alt, caption
 *
 * variant="phones"  Peach card with one or more phone mockups side by side.
 *   props: caption, phones=[{ src, alt, caption }]
 */
export default function ProjectImage({ variant = 'wide', caption, src, alt, phones = [] }) {
  const isTrio = variant === 'phones' && phones.length >= 3

  return (
    <div className="pc-image-section">
      {variant === 'wide' && (
        <div className="pc-wide-card">
          <img src={src} alt={alt ?? ''} />
        </div>
      )}

      {variant === 'phones' && (
        <div className={`pc-phone-card${isTrio ? ' pc-phone-card--trio' : ''}`}>
          {phones.map((phone, i) => (
            <figure key={i} className="pc-phone-fig">
              <img src={phone.src} alt={phone.alt ?? ''} />
              {phone.caption && <figcaption>{phone.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {caption && <p className="pc-image-caption">{caption}</p>}
    </div>
  )
}

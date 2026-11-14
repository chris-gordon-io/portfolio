// Play icon for the About bento cards that open a video; same stroke style
// and size as BentoArrow so the two sit together in the corner button.
export default function BentoPlay({ size = 14, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5 3.5L12.5 8L5 12.5V3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

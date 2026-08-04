import '../pages/Home.css'

export default function AvailabilityBadge({ text = 'Currently unavailable' }) {
  return (
    <div className="availability-badge">
      <span className="availability-dot" />
      <span className="availability-text">{text}</span>
    </div>
  )
}

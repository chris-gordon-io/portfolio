import './ProjectComponents.css'

export default function ProjectTitle({ title, subtitle }) {
  return (
    <div className="pc-title-block">
      <h1 className="pc-title">{title}</h1>
      {subtitle && <p className="pc-subtitle">{subtitle}</p>}
    </div>
  )
}

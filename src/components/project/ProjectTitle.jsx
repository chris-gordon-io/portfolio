import './ProjectComponents.css'

export default function ProjectTitle({ title, subtitle }) {
  return (
    <div className="pc-title-block" data-dev-component="Title">
      <h1 className="pc-title">{title}</h1>
      {subtitle && <p className="pc-subtitle">{subtitle}</p>}
    </div>
  )
}

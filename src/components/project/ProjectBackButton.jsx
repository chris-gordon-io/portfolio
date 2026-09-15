import { Link } from 'react-router-dom'
import './ProjectBackButton.css'

export default function ProjectBackButton() {
  return (
    <div className="pb-wrapper" data-dev-component="Back Button">
      <Link to="/" className="btn btn--primary-reversed btn--md">
        <svg className="btn-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <polyline points="7,4 2,8 7,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to all work
      </Link>
    </div>
  )
}

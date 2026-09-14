import { Link } from 'react-router-dom'
import './ProjectBackButton.css'

export default function ProjectBackButton() {
  return (
    <div className="pb-wrapper" data-dev-component="Back Button">
      <Link to="/" className="pb-button">
        <svg className="pb-button-arrow" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="2" y1="8" x2="14" y2="8" stroke="#23233B" strokeWidth="1.5" strokeLinecap="round"/>
          <polyline points="7,4 2,8 7,12" fill="none" stroke="#23233B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="pb-button-text">Back to all work</span>
      </Link>
    </div>
  )
}

import { Link } from 'react-router-dom'
import './ProjectBackButton.css'

export default function ProjectBackButton() {
  return (
    <div className="pb-wrapper">
      <Link to="/" className="pb-button">
        <span className="pb-button-text">See all work</span>
        <svg className="pb-button-arrow" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="2" y1="8" x2="14" y2="8" stroke="#272737" strokeWidth="1.5" strokeLinecap="round"/>
          <polyline points="9,4 14,8 9,12" fill="none" stroke="#272737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  )
}

import './Footer.css'

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="white"/>
    <rect x="2" y="9" width="4" height="12" fill="white"/>
    <circle cx="4" cy="4" r="2" fill="white"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
  </svg>
)

const YunoJunoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="sans-serif">YJ</text>
  </svg>
)

export default function Footer() {
  return (
    <div className="footer-outer">
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/cpgordon/" target="_blank" rel="noreferrer" className="footer-link">
              <LinkedinIcon />
              <span>Linkedin</span>
            </a>
            <a href="https://app.yunojuno.com/p/chris-gordon/" target="_blank" rel="noreferrer" className="footer-link">
              <YunoJunoIcon />
              <span>YunoJuno</span>
            </a>
            <a href="https://www.instagram.com/chrisg116/" target="_blank" rel="noreferrer" className="footer-link">
              <InstagramIcon />
              <span>Instagram</span>
            </a>
          </div>
          <p className="footer-copy">All content © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

import './Footer.css'

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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

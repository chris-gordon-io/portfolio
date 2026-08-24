import Nav from '../components/Nav'
import Footer from '../components/Footer'
import architectureImg from '../assets/Gemini_Generated_Image_4vqocy4vqocy4vqo.jpg'
import bikesImg from '../assets/Photo15_11A.jpg'
import listeningToImg from '../assets/ListeningTo.jpg'
import girlHoodImg from '../assets/GirlHood.jpg'
import pizzaImg from '../assets/Pizza.webp'
import './About.css'

function BentoArrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function About() {
  return (
    <div className="about-page">
      <Nav />
      <section className="bento">

        {/* A — top left: music */}
        <div className="bento-cell bento-cell--a" style={{ backgroundImage: `url(${listeningToImg})`, backgroundSize: 'cover', backgroundPosition: '70% 45%' }}>
          <a className="bento-link-btn" href="https://www.youtube.com/watch?v=tSwHdfXPR7o" target="_blank" rel="noopener noreferrer"><BentoArrow size={12} /></a>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Listening to</p>
            <h2 className="bento-cell__title">Zac Bryan</h2>
            <p className="bento-cell__text">Oak Island</p>
          </div>
        </div>

        {/* B — bottom left: bikes, tall */}
        <div className="bento-cell bento-cell--b" style={{ backgroundImage: `url(${bikesImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Hobby</p>
            <h2 className="bento-cell__title">Bikes</h2>
            <p className="bento-cell__text">Mainly BMX, but learning to enjoy adult sized bikes too.</p>
          </div>
        </div>

        {/* C — centre hero, tall */}
        <div className="bento-cell bento-cell--c">
          <div className="bento-cell__body">
            <p className="bento-cell__label">About me</p>
            <h2 className="bento-cell__title bento-cell__title--hero">A few of my other interests</h2>
            <p className="bento-cell__text bento-cell__text--hero">Just here for the work history? Skip to my CV.</p>
            <a className="bento-cta" href="https://chrisgordon-cv.notion.site/?source=copy_link" target="_blank" rel="noopener noreferrer">
              Read CV
              <span className="bento-cta__icon"><BentoArrow /></span>
            </a>
          </div>
          {/* CV page-fan visual — disabled for now, bring back later
          <div className="cv-stack" aria-hidden="true">
            <div className="cv-page cv-page--left" />
            <div className="cv-page cv-page--right" />
            <div className="cv-page cv-page--center" />
          </div>
          */}
        </div>

        {/* D — right tall: project */}
        <div className="bento-cell bento-cell--d" style={{ backgroundImage: `url(${pizzaImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bento-link-btn"><BentoArrow size={12} /></div>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Eating</p>
            <h2 className="bento-cell__title">Pizza</h2>
            <p className="bento-cell__text">Bore yourself with 5 years of research and experiments on my Notion page.</p>
          </div>
        </div>

        {/* E — bottom centre: watching */}
        <div className="bento-cell bento-cell--e" style={{ backgroundImage: `url(${girlHoodImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <a className="bento-link-btn" href="https://www.youtube.com/watch?v=4luwYVfhmks" target="_blank" rel="noopener noreferrer"><BentoArrow size={12} /></a>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Watching</p>
            <h2 className="bento-cell__title">GirlHood</h2>
          </div>
        </div>

        {/* F — bottom right: architecture */}
        <div className="bento-cell bento-cell--f" style={{ backgroundImage: `url(${architectureImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Interest</p>
            <h2 className="bento-cell__title">Architecture</h2>
            <p className="bento-cell__text bento-cell__text--nowrap">A big fan of everything Le Corbusier</p>
          </div>
        </div>

      </section>
      <Footer />
    </div>
  )
}

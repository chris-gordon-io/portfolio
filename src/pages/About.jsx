import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Button from '../components/Button'
import VideoModal from '../components/VideoModal'
import architectureImg from '../assets/Gemini_Generated_Image_4vqocy4vqocy4vqo.jpg'
import bikesImg from '../assets/Photo15_11A.jpg'
import listeningToImg from '../assets/ListeningTo.jpg'
import girlHoodImg from '../assets/GirlHood.jpg'
import pizzaImg from '../assets/Pizza.webp'
import memojiImg from '../assets/memoji.png'
import './About.css'

function BentoArrow({ size = 14, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function About() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <div className="about-page">
      <Nav />
      <section className="bento">

        {/* A — top left: music */}
        <button type="button" className="bento-cell bento-cell--a" onClick={() => setActiveVideo({ id: 'tSwHdfXPR7o', title: 'Zac Bryan — Oak Island' })}>
          <img src={listeningToImg} alt="" className="bento-cell__img" style={{ objectPosition: '70% 45%' }} />
          <span className="bento-link-btn" aria-hidden="true"><BentoArrow size={12} /></span>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Listening to</p>
            <h2 className="bento-cell__title">Zac Bryan</h2>
            <p className="bento-cell__text">Oak Island</p>
          </div>
        </button>

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
            <img src={memojiImg} alt="" className="bento-memoji" />
            <h2 className="bento-cell__title bento-cell__title--hero">A few of my interests</h2>
            <p className="bento-cell__text bento-cell__text--hero">Just here for the work history? Skip to my CV.</p>
            <Button
              variant="primary"
              size="md"
              href="https://chrisgordon-cv.notion.site/?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="bento-cta"
            >
              Read CV
              <BentoArrow size={16} className="btn-icon" />
            </Button>
            <p className="bento-cta-caption">Opens in Notion</p>
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
        <a className="bento-cell bento-cell--d" href="https://cg-shares.notion.site/how-to-pizza?source=copy_link" target="_blank" rel="noopener noreferrer">
          <img src={pizzaImg} alt="" className="bento-cell__img" />
          <span className="bento-link-btn" aria-hidden="true"><BentoArrow size={12} /></span>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Eating</p>
            <h2 className="bento-cell__title">Pizza</h2>
            <p className="bento-cell__text">Bore yourself with 5 years of research and experiments on my Notion page.</p>
          </div>
        </a>

        {/* E — bottom centre: watching */}
        <button type="button" className="bento-cell bento-cell--e" onClick={() => setActiveVideo({ id: '4luwYVfhmks', title: 'GirlHood' })}>
          <img src={girlHoodImg} alt="" className="bento-cell__img" />
          <span className="bento-link-btn" aria-hidden="true"><BentoArrow size={12} /></span>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Watching</p>
            <h2 className="bento-cell__title">GirlHood</h2>
          </div>
        </button>

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
      {activeVideo && (
        <VideoModal
          videoId={activeVideo.id}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  )
}

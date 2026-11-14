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
import BentoArrow from '../components/BentoArrow'
import BentoPlay from '../components/BentoPlay'
import './About.css'

export default function About() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <div className="about-page">
      <Nav />
      <section className="bento">

        {/* A — top left: music */}
        <button type="button" className="bento-cell bento-cell--a" onClick={() => setActiveVideo({ id: 'tSwHdfXPR7o', title: 'Zac Bryan — Oak Island' })}>
          <img src={listeningToImg} alt="" className="bento-cell__img" style={{ objectPosition: '70% 45%' }} />
          <span className="bento-link-btn" aria-hidden="true"><BentoPlay size={12} /></span>
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
            <h2 className="bento-cell__title bento-cell__title--hero">A few of my interests</h2>
            <p className="bento-cell__text bento-cell__text--hero">Just here for the work history?</p>
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
          {/* Two CV pages rise from the bottom of the card, then fan out.
              The left page (in front) is the real design; the back page is the
              Experience design (clipped by the page, so only the top shows). Decorative, so aria-hidden. */}
          <div className="cv-fan" aria-hidden="true">
            <div className="cv-page cv-page--back">
              <div className="cv-exp">
                <p className="cv-exp__title">Experience</p>
                <p className="cv-exp__gap" />
                <p className="cv-exp__role">Senior Product Designer<br />Motorway<br />Growth &amp; Internal Tools<br />Aug 2023 – Aug 2024</p>
                <ul>
                  <li>Led design for internal customer support platforms; conducted deep-dive shadowing sessions with CS agents to optimise operational tooling.</li>
                  <li>Ran A/B/C experiments across top-of-funnel moments, designing and iterating on core psychological drivers that increased activation KPIs.</li>
                </ul>
                <p className="cv-exp__gap" />
                <p className="cv-exp__role">Senior Product Designer<br />Toyota Connected<br />App Onboarding &amp; Strategy<br />Aug 2022 – Aug 2023</p>
                <ul>
                  <li>Designed and optimised the onboarding experience for a connected car app, user-testing multiple iterations of value proposition flows while shipping functional designs to development in parallel.</li>
                  <li>Ran alignment sessions with Product Owners and engineers to evolve the future-state onboarding strategy, optimising time-to-value and user education.</li>
                  <li>Contributed to the Design System by introducing scalable interaction patterns for native components.</li>
                </ul>
                <p>Lead Experience Designer – Sainsbury's</p>
                <p>E2E Customer Journey | <u>Tu.co.uk</u> – June 2018 – July 2022</p>
                <ul>
                  <li>Led full-stack design strategy for <u>Tu.co.uk</u> across mobile and web, owning the experience across discovery, delivery, and optimisation phases.</li>
                  <li>Partnered cross-functionally with engineering, research, and leadership to deliver long-term experience roadmaps and future-vision prototypes.</li>
                  <li>Facilitated regular user testing (lab, guerrilla, remote via UserZoom), translating insights into design and business strategy.</li>
                  <li>Contributed to the org-wide Design System and mentored junior designers across squads.</li>
                </ul>
                <p>UI / Interaction Designer – Argos</p>
                <p>Web &amp; App E-commerce – Feb 2016 – June 2018 (Freelance)</p>
                <ul>
                  <li>Delivered rapid prototyping and validation of new e-commerce experiences in a fast-paced Agile environment.</li>
                  <li>Bridged UX and engineering by designing scalable UI components for responsive web and native platforms.</li>
                </ul>
              </div>
            </div>
            <div className="cv-page cv-page--front">
              <p className="cv-page__title">Chris Gordon CV</p>
              <p className="cv-page__links">
                <u>chrisgordon.io</u> • <u>LinkedIn</u> • <u>Figma Community</u> • <u>c.p.gordon@me.com</u>
              </p>
              <div>
                <p className="cv-page__heading">Summary</p>
                <p className="cv-page__text">
                  London-based Product Designer with 12+ years of experience across E-commerce, B2B SaaS, and Fintech. Proven track record leading end-to-end product design — from discovery and strategy through to delivery and optimisation — across startups and global enterprises. Skilled in design systems, user research, experimentation, and cross-functional collaboration.
                </p>
              </div>
            </div>
          </div>
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
          <span className="bento-link-btn" aria-hidden="true"><BentoPlay size={12} /></span>
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

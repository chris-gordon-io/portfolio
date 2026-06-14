import Nav from '../components/Nav'
import architectureImg from '../assets/Gemini_Generated_Image_4vqocy4vqocy4vqo.jpg'
import bikesImg from '../assets/Photo15_11A.jpg'
import './About.css'

function BentoArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13L13 3M13 3H5M13 3V11" stroke="#da441b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function About() {
  return (
    <div className="about-page">
      <Nav />
      <section className="bento">

        {/* A — top left: music */}
        <div className="bento-cell bento-cell--a">
          <div className="bento-link-btn"><BentoArrow /></div>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Listening to</p>
            <h2 className="bento-cell__title">Zac Bryan</h2>
            <p className="bento-cell__text">Oak Island</p>
          </div>
        </div>

        {/* B — bottom left: bikes, tall */}
        <div className="bento-cell bento-cell--b" style={{ backgroundImage: `url(${bikesImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bento-cell__body">
            <h2 className="bento-cell__title">Bikes</h2>
            <p className="bento-cell__text">Mainly BMX, but learning to enjoy adult sized bikes too.</p>
          </div>
        </div>

        {/* C — centre hero, tall */}
        <div className="bento-cell bento-cell--c">
          <div className="bento-cell__body">
            <h2 className="bento-cell__title bento-cell__title--hero">A bit more about me</h2>
            <p className="bento-cell__text bento-cell__text--hero">What I do and what I like, in no particular order.</p>
          </div>
        </div>

        {/* D — right tall: project */}
        <div className="bento-cell bento-cell--d">
          <div className="bento-link-btn"><BentoArrow /></div>
          <div className="bento-cell__body">
            <p className="bento-cell__label">A project</p>
            <h2 className="bento-cell__title">Pizza</h2>
            <p className="bento-cell__text">Bore yourself with 5 years of research and experiments on my Notion page.</p>
          </div>
        </div>

        {/* E — bottom centre: watching */}
        <div className="bento-cell bento-cell--e">
          <div className="bento-link-btn"><BentoArrow /></div>
          <div className="bento-cell__body">
            <p className="bento-cell__label">Watching</p>
            <h2 className="bento-cell__title">GirlHood</h2>
          </div>
        </div>

        {/* F — bottom right: architecture */}
        <div className="bento-cell bento-cell--f" style={{ backgroundImage: `url(${architectureImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bento-cell__body">
            <h2 className="bento-cell__title">Architecture</h2>
            <p className="bento-cell__text">Predictably modernist, big fan of everything Le Corbusier.</p>
          </div>
        </div>

      </section>
    </div>
  )
}

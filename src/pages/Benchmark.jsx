import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import ProjectHero from '../components/project/ProjectHero'
import ProjectImage from '../components/project/ProjectImage'
import ProjectMetrics from '../components/project/ProjectMetrics'
import ProjectHypothesis from '../components/project/ProjectHypothesis'
import ProjectTopline from '../components/project/ProjectTopline'
import ProjectCallout from '../components/project/ProjectCallout'
import ProjectBackButton from '../components/project/ProjectBackButton'
import Footer from '../components/Footer'
import './Benchmark.css'

export default function Benchmark() {
  return (
    <div className="bm-page">

      <Nav />

      <div className="pc-title-block">
        <h1 className="pc-title">Benchmark</h1>
        <p className="pc-subtitle">B2B SaaS App calculating Carbon and Cost over Construction projects lifecycle</p>
      </div>

      <ProjectHero
        background="linear-gradient(180deg, #5DD39D 0%, #469E77 100%)"
        image={{ src: '/images/benchmark-hero.png', alt: 'Benchmark estimating app' }}
        wide
      />

      <ProjectTopline>
        Creating a complex App from the foundations up working with Stakeholders to redefine their workflows.
      </ProjectTopline>

      <ProjectCallout
        eyebrow="About"
        headline="A next-generation tool for an industry that had outgrown its stack."
      >
        <p>Benchmark is a B2B SaaS business providing tools to the large scale construction industries (think roads and water) globally. I was brought in to Vigo agency as a Lead Designer to work with the newly formed Product team (BM side) and help shape the next generation of this tool.</p>
        <p>The project was unique in the way that even some of the Senior Stakeholders at Benchmark were unsure how the current product actually worked.</p>
      </ProjectCallout>

      <ProjectCallout
        eyebrow="Problem / Opportunity"
        headline="A legacy workflow spread across multiple apps — with a blank canvas to replace it."
      >
        <p>Benchmarks current workflow involved multiple apps (including Excel) and ran on a legacy tech stack that was no longer fit for purpose.</p>
        <p>We had the opportunity to design a whole new experience. Users also needed a way to maintain visibility of items across whole projects.</p>
      </ProjectCallout>

      <ProjectImage
        variant="wide"
        caption="Work Break Down Structure Screen"
        src="/images/benchmark/benchmark-1.png"
        alt="Work Break Down Structure Screen"
      />

      <ProjectImage
        variant="wide"
        caption="Operations and Maintenance Screen"
        src="/images/benchmark/benchmark-2.png"
        alt="Operations and Maintenance Screen"
      />

      <ProjectImage
        variant="wide"
        caption="Settings Screen"
        src="/images/benchmark/benchmark-3.png"
        alt="Settings Screen"
      />

      <ProjectBackButton />

      <Footer />

    </div>
  )
}

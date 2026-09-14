import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import ProjectHero from '../components/project/ProjectHero'
import ProjectImage from '../components/project/ProjectImage'
import ProjectMetrics from '../components/project/ProjectMetrics'
import ProjectHypothesis from '../components/project/ProjectHypothesis'
import ProjectTopline from '../components/project/ProjectTopline'
import ProjectImpact from '../components/project/ProjectImpact'
import ProjectText from '../components/project/ProjectText'
import ProjectTitle from '../components/project/ProjectTitle'
import ProjectBackButton from '../components/project/ProjectBackButton'
import Footer from '../components/Footer'
import './Benchmark.css'

export default function Benchmark() {
  return (
    <div className="bm-page">

      <Nav />

      <div className="pc-intro-wrapper">
        <ProjectTitle title="Benchmark" subtitle="B2B SaaS App calculating Carbon and Cost over Construction projects lifecycle" />
        <ProjectHero
          background="linear-gradient(180deg, #5DD39D 0%, #469E77 100%)"
          image={{ src: '/images/benchmark-hero.png', alt: 'Benchmark estimating app' }}
          wide
        />
      </div>

      <ProjectTopline>
        Creating a complex, multi-app estimating and reporting tool from the ground up, working closely with Stakeholders, some of whom weren't even sure how the existing product worked, to redefine fragmented workflows into a single, coherent experience.
      </ProjectTopline>

      <ProjectText heading="About">
        <p className="pc-body">
          Benchmark is a B2B SaaS business providing tools to the large scale construction Industries (think roads and water) globally.
        </p>
        <p className="pc-body">
          I was brought in to Vigo agency as a Lead Designer to work with the newly formed Product team (BM side) and help shape the next generation of this tool.
        </p>
        <p className="pc-body">
          The project was unique in the way that even some of the Senior Stakeholders at Benchmark were unsure how the current product actually worked.
        </p>
      </ProjectText>

      <ProjectText heading="The Problem/Opportunity">
        <p className="pc-body">
          Benchmarks current workflow involved multiple Apps (including Excel) and ran on a legacy tech stack that was no longer fit for purpose. We had the opportunity to design a whole new experience … Users also needed a way to maintain visibility of Items across whole projects.
        </p>
      </ProjectText>

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

      <ProjectImpact>
        In an ambiguous, delivery-driven project, my biggest impact was spotting the need for a Design System early, winning stakeholder buy-in, building it from nothing, and partnering with an offshore dev team to ship it in code.
      </ProjectImpact>

      <ProjectBackButton />

      <Footer />

    </div>
  )
}

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectHero from '../components/project/ProjectHero'
import ProjectText from '../components/project/ProjectText'
import ProjectImage from '../components/project/ProjectImage'
import ProjectMetrics from '../components/project/ProjectMetrics'
import ProjectTopline from '../components/project/ProjectTopline'
import ProjectHypothesis from '../components/project/ProjectHypothesis'
import ProjectTitle from '../components/project/ProjectTitle'
import phonePlaceholder from '../assets/phone-placeholder.svg'

const IMG = 'https://framerusercontent.com/images/'

export default function Components() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>

      <Nav />

      <div className="pc-intro-wrapper">
        <ProjectTitle title="Project title" subtitle="Sub line information" />
        <ProjectHero
          background="linear-gradient(180deg, #0560cc 0%, #063165 100%)"
          image={{ src: phonePlaceholder, alt: 'Phone placeholder' }}
        />
      </div>

      <ProjectTopline>
        How I identified a larger problem within an experience and created a holistic vision for self serve Help.
      </ProjectTopline>

<ProjectHypothesis>
        "Hey Chris, can you do the UX for this accordion?" led to the realisation that the Help section of the site was not being properly considered in the replatforming work.
      </ProjectHypothesis>

      <ProjectText heading="Section heading">
        <p className="pc-body">
          This is regular body copy. Use it for the main content of a section — context, explanation, or supporting detail.
        </p>
        <p className="pc-body">
          A second paragraph. You can pass as many children as you like — paragraphs, checklists, or any other inline content.
        </p>
      </ProjectText>

      <ProjectImage
        variant="phones"
        caption="Two-up phone comparison"
        phones={[
          { src: `${IMG}FnEmfUZAKnbq8a80ysIObovXuc.png`, caption: 'Before' },
          { src: `${IMG}GmrADgk3K9jvWLY5YHz0eHjYps.png`, caption: 'After' },
        ]}
      />

      <ProjectImage
        variant="wide"
        caption="Full-width image"
        src={`${IMG}eKOTtOc2Rl52Y6KgALb1gX00mg.jpg`}
        alt="Dashboard screenshot"
      />

      <ProjectMetrics
        intro="Each change had a measurable positive impact during 50/50 A/B testing."
        metrics={[
          { number: '+6.65%', label: 'CTA in all viewports' },
          { number: '+3.21%', label: 'CTA updates' },
          { number: '106%',   label: 'Interaction rate' },
        ]}
      />

      <Footer />

    </div>
  )
}

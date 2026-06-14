import ProjectHero from '../components/project/ProjectHero'
import ProjectText from '../components/project/ProjectText'
import ProjectImage from '../components/project/ProjectImage'
import ProjectMetrics from '../components/project/ProjectMetrics'

const IMG = 'https://framerusercontent.com/images/'

export default function Components() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>

      <ProjectHero
        background="linear-gradient(180deg, #0560cc 0%, #063165 100%)"
        image={{
          src: `${IMG}Mo5jOj0hktd1x8y6UqpC3MH9Nc.png`,
          alt: 'App screen',
        }}
      />

      <ProjectText heading="Section heading" accent>
        <p className="pc-body-lg">
          This is a large body intro — good for a topline summary or key statement at the top of a section.
        </p>
      </ProjectText>

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

    </div>
  )
}

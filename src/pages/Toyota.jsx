import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectHero from '../components/project/ProjectHero'
import ProjectTopline from '../components/project/ProjectTopline'
import ProjectText from '../components/project/ProjectText'
import ProjectImage from '../components/project/ProjectImage'
import ProjectBackButton from '../components/project/ProjectBackButton'
import './Toyota.css'

export default function Toyota() {
  return (
    <div className="toyota-page">

      <Nav />

      <div className="pc-intro-wrapper">
        <ProjectHero
          title="Toyota One App"
          subtitle="Connected Services Onboarding"
          background="linear-gradient(180deg, #23233B 0%, #23233B 100%)"
          image={{ src: '/images/toyota/0.0.0 Splash - OPT02.png', alt: 'Toyota One App splash screen' }}
          wide
          fullWidth
        />
      </div>

      <ProjectTopline>
        Redesigning a first-time user experience for a global automotive app, shifting the goal from education to speed.
      </ProjectTopline>

      {/* ── Context ── */}
      <ProjectText heading="About">
        <p className="body">Toyota had built different car companion apps for different regions, car generations, and markets. The new CEO wanted a single, unified global app to align experiences, reduce development and speed up releases.</p>
        <p className="body">I was Lead UX Designer on the Onboarding team, working with 5 Product Owners and an offshore engineering team across three time zones, creating an Onboarding experience that works for everyone...</p>
      </ProjectText>

      {/* ── Problem ── */}
      <ProjectText heading="The problem">
        <p className="body-large">Users had no idea what they were being asked to engage with.</p>
        <p className="body">The existing onboarding pushed Connected Services trials — Safety Connect, Service Connect, Wi-Fi — before users understood what any of them were. With no context for what the services did, what they cost after trial, or how data consent related to them, users did the rational thing: they skipped everything.</p>
        <p className="body">The skip button, intended as a convenience, read as a signal that none of this mattered. The 1.4-star App Store rating reflected what that experience felt like.</p>
      </ProjectText>

      <ProjectImage
        caption="Current experience — Connected Services carousel"
      />

      {/* ── Process ── */}
      <ProjectText heading="What I did">
        <p className="body-large">Workshops, dealer interviews, prototype testing — in that order.</p>
        <p className="body">I started with a 2-day discovery workshop with the Global Head of Onboarding, mapping what we knew and didn't. I then ran cross-functional workshops with PMs, stakeholders, and designers, and led interviews with dealers and car buyers to understand how Connected Services were explained before a user ever opened the app.</p>
        <p className="body">From that, I built a revised prototype — clearer service cards, explicit trial duration, upfront cost transparency — and took it into moderated testing with users. Comprehension improved. But what we heard next changed the entire direction of the project.</p>
      </ProjectText>

      <ProjectImage
        caption="Original carousel vs. revised service cards"
        images={[
          { src: '', alt: 'Before — original carousel', caption: 'Before — original carousel' },
          { src: '', alt: 'After — revised service cards', caption: 'After — revised service cards' },
        ]}
      />

      {/* ── Pivot ── */}
      <div className="pc-section">
        <div className="toyota-pivot">
          <span className="toyota-pivot-label">The turning point</span>
          <h2 className="toyota-pivot-headline">We were solving the wrong problem.</h2>
          <p>Users understood the redesigned services better. They still didn't engage. When we dug in, the reason was simple: with no money being asked for at this point in onboarding, users had no motivation to stop and read. They just wanted to get to their car.</p>
          <blockquote className="toyota-pivot-quote">
            "People cared more about completing onboarding than being forced to learn everything upfront."
          </blockquote>
        </div>
      </div>

      {/* ── Response ── */}
      <ProjectText heading="Response">
        <p className="body-large">New concepts. A conversation with legal. A new goal.</p>
        <p className="body">I developed two new concepts built around speed rather than comprehension — moving data consent to where users expected it (the front), and relocating Connected Services education to inside the app, where users could discover it on their own terms.</p>
        <p className="body">I presented both to the Global Head of Onboarding, Legal, and the Business team. The conversations that followed went beyond design — Product pressed Legal to reconsider how trials were packaged. The research had surfaced a product strategy problem, and design was the thing that found it.</p>
      </ProjectText>

      <ProjectImage
        caption="Two new concepts presented to stakeholders"
      />

      {/* ── Outcomes ── */}
      <ProjectText heading="What changed">
        <p className="body-large">The biggest impact wasn't on screens.</p>
        <p className="body">The business reconsidered how it packaged Connected Services trials — a direct result of what testing uncovered.</p>
        <p className="body">Data consent was repositioned to the front of onboarding — a structural change affecting how the product was built.</p>
        <p className="body">The onboarding goal shifted from "increase comprehension" to "optimise for completion speed" — a fundamental reframe of success.</p>
        <p className="body">I left at a strategic milestone — goal validated, direction aligned, incoming designer fully onboarded during my notice period.</p>
      </ProjectText>

      {/* ── Reflection ── */}
      <ProjectText heading="Reflection">
        <p className="body-large">What I'd do differently.</p>
        <p className="body">I'd align on the definition of success earlier. We spent time designing for comprehension before establishing that completion rate was the real metric. Getting product and business aligned on that upfront would have shortened the discovery phase significantly.</p>
        <p className="body">I'd also bring in dealer interviews earlier — the insight that users want speed over education might have surfaced in round one rather than round two.</p>
      </ProjectText>

      <ProjectBackButton />

      <Footer />

    </div>
  )
}

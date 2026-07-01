import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectHero from '../components/project/ProjectHero'
import ProjectTopline from '../components/project/ProjectTopline'
import ProjectCallout from '../components/project/ProjectCallout'
import ProjectImage from '../components/project/ProjectImage'
import ProjectBackButton from '../components/project/ProjectBackButton'
import './Toyota.css'

export default function Toyota() {
  return (
    <div className="toyota-page">

      <Nav />

      <div className="pc-title-block">
        <h1 className="pc-title">Toyota One App</h1>
        <p className="pc-subtitle">Connected Services Onboarding</p>
      </div>

      <ProjectHero
        background="linear-gradient(180deg, #272737 0%, #272737 100%)"
        image={{ src: '/images/toyota/0.0.0 Splash - OPT02.png', alt: 'Toyota One App splash screen' }}
        wide
        fullWidth
      />

      <ProjectTopline>
        Redesigning the first-time experience for a new global Toyota app — and discovering that the original goal was wrong.
      </ProjectTopline>

      {/* ── Context ── */}
      <ProjectCallout
        eyebrow="Context"
        headline="A new CEO. One global app. A fragmented starting point."
      >
        <p>I was Lead UX Designer on the Onboarding team, working alongside Product Owners and an offshore engineering team spread across three time zones. My focus was the first experience every new Toyota owner would have — the moment they open the app for the first time and try to set up their vehicle.</p>
        <p>This wasn't a case of redesigning a single flow. Every decision had downstream consequences across a matrix of combinations, multiple regions, car generations, trim levels, and user types. We had to consider all user types, not just the new user happy path.</p>
      </ProjectCallout>

      {/* ── Problem ── */}
      <ProjectCallout
        eyebrow="The problem"
        headline="Users had no idea what they were being asked to engage with."
      >
        <p>The existing onboarding pushed Connected Services trials — Safety Connect, Service Connect, Wi-Fi — before users understood what any of them were. With no context for what the services did, what they cost after trial, or how data consent related to them, users did the rational thing: they skipped everything.</p>
        <p>The skip button, intended as a convenience, read as a signal that none of this mattered. The 1.4-star App Store rating reflected what that experience felt like.</p>
      </ProjectCallout>

      <ProjectImage
        variant="wide"
        caption="Current experience — Connected Services carousel"
      />

      {/* ── Process ── */}
      <ProjectCallout
        eyebrow="What I did"
        headline="Workshops, dealer interviews, prototype testing — in that order."
      >
        <p>I started with a 2-day discovery workshop with the Global Head of Onboarding, mapping what we knew and didn't. I then ran cross-functional workshops with PMs, stakeholders, and designers, and led interviews with dealers and car buyers to understand how Connected Services were explained before a user ever opened the app.</p>
        <p>From that, I built a revised prototype — clearer service cards, explicit trial duration, upfront cost transparency — and took it into moderated testing with users. Comprehension improved. But what we heard next changed the entire direction of the project.</p>
      </ProjectCallout>

      <ProjectImage
        variant="phones"
        caption="Original carousel vs. revised service cards"
        phones={[
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
      <ProjectCallout
        eyebrow="Response"
        headline="New concepts. A conversation with legal. A new goal."
      >
        <p>I developed two new concepts built around speed rather than comprehension — moving data consent to where users expected it (the front), and relocating Connected Services education to inside the app, where users could discover it on their own terms.</p>
        <p>I presented both to the Global Head of Onboarding, Legal, and the Business team. The conversations that followed went beyond design — Product pressed Legal to reconsider how trials were packaged. The research had surfaced a product strategy problem, and design was the thing that found it.</p>
      </ProjectCallout>

      <ProjectImage
        variant="wide"
        caption="Two new concepts presented to stakeholders"
      />

      {/* ── Outcomes ── */}
      <ProjectCallout
        eyebrow="What changed"
        headline="The biggest impact wasn't on screens."
      >
        <p>The business reconsidered how it packaged Connected Services trials — a direct result of what testing uncovered.</p>
        <p>Data consent was repositioned to the front of onboarding — a structural change affecting how the product was built.</p>
        <p>The onboarding goal shifted from "increase comprehension" to "optimise for completion speed" — a fundamental reframe of success.</p>
        <p>I left at a strategic milestone — goal validated, direction aligned, incoming designer fully onboarded during my notice period.</p>
      </ProjectCallout>

      {/* ── Reflection ── */}
      <ProjectCallout
        eyebrow="Reflection"
        headline="What I'd do differently."
      >
        <p>I'd align on the definition of success earlier. We spent time designing for comprehension before establishing that completion rate was the real metric. Getting product and business aligned on that upfront would have shortened the discovery phase significantly.</p>
        <p>I'd also bring in dealer interviews earlier — the insight that users want speed over education might have surfaced in round one rather than round two.</p>
      </ProjectCallout>

      <ProjectBackButton />

      <Footer />

    </div>
  )
}

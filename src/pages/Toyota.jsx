import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectHero from '../components/project/ProjectHero'
import ProjectTopline from '../components/project/ProjectTopline'
import ProjectCallout from '../components/project/ProjectCallout'
import ProjectImage from '../components/project/ProjectImage'
import ProjectHypothesis from '../components/project/ProjectHypothesis'
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
        background="linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)"
        wide
      />

      <ProjectTopline>
        Redesigning onboarding for a global Toyota app — and changing the goal along the way.
      </ProjectTopline>


{/* ── Context ── */}
      <ProjectCallout
        eyebrow="Context"
        headline="A new CEO. One global app. A 1.4-star rating to fix."
      >
        <p>Toyota's car companion apps had grown organically — different tech stacks for different regions, different generations of car, different markets. A new CEO set out to consolidate them into a single global product. That meant building an onboarding experience that could work for everyone, everywhere, across every Toyota.</p>
        <p>I was Lead UX Designer on the Onboarding team, working alongside Product Owners and an offshore engineering team spread across three time zones. My focus was the first experience every new Toyota owner would have — the moment they open the app for the first time and try to set up their vehicle.</p>
        <p>This wasn't a case of redesigning a single flow. Every decision had downstream consequences across a matrix of combinations, multiple regions, car generations, trim levels, and user types. We had to consider all user types, not just the new user happy path.</p>
      </ProjectCallout>

      {/* ── Problem ── */}
      <ProjectCallout
        eyebrow="The Problem"
        headline="Users had no mental model of what they were being asked to engage with."
      >
        <p>The existing onboarding presented users with Connected Services — trials for features like Safety Connect, Service Connect, and Wi-Fi — before explaining what those services were, what they were worth, or how they related to the data consent request users had to make.</p>
        <p>Without any foundation for understanding, users did what made sense: they skipped past it. And when they did interact with it, the confusion showed up in reviews.</p>
        <p>The data backed this up. The app had a 1.4-star App Store rating, with reviews citing confusion as a recurring theme. The proposed new design experience also didn't match actual functionality — meaning users were being shown something that didn't reflect how the product actually worked.</p>
      </ProjectCallout>

      <ProjectImage
        variant="wide"
        caption="Current experience — Connected Services carousel"
      />

      {/* ── Process ── */}
      <ProjectCallout
        eyebrow="Process"
        headline="Getting everyone aligned before designing anything."
      >
        <p>I started by running a 2-day discovery workshop with the Global Head of Onboarding, bringing in other designers for input and ideation based on previous experience phases. The goal was to map what we knew, surface what we didn't, and identify where the biggest risks were before we touched Figma.</p>
        <p>From there, I led cross-functional workshops with PMs, stakeholders, and other designers across the broader product org. I also led interviews with dealers and car buyers — getting the sales-side perspective on how Connected Services were explained at point of purchase, and where confusion entered the picture before a user even opened the app.</p>
      </ProjectCallout>

      <ProjectHypothesis>
        Before designing anything, I needed to know whether we were solving the right problem. The workshop was where we found out we had more unknowns than we thought.
      </ProjectHypothesis>

      <ProjectCallout
        eyebrow="First concept"
        headline="Replacing the carousel with individual service tiles."
      >
        <p>Based on the initial research, I prototyped a revised onboarding concept that addressed the core problem: replacing the generic carousel with individual service tiles that named the benefit clearly, showed trial duration, and surfaced cost transparency upfront.</p>
        <p>Testing showed users understood Connected Services significantly better with the revised design. Clarity had improved. But something else surfaced that changed the direction of the project entirely.</p>
      </ProjectCallout>

      <ProjectImage
        variant="phones"
        caption="Original carousel vs. revised service cards"
        phones={[
          { src: '', alt: 'Before — original carousel', caption: 'Before — original carousel' },
          { src: '', alt: 'After — revised service cards', caption: 'After — revised service cards' },
        ]}
      />

      {/* ── Pivot — no component yet ── */}
      <div className="pc-section">
        <div className="toyota-pivot">
          <span className="toyota-pivot-label">The turning point</span>
          <h2 className="toyota-pivot-headline">We were solving the wrong problem.</h2>
          <p>When users understood Connected Services better, their behaviour didn't change. They still wanted to skip past them. And in testing, we started hearing something we hadn't anticipated: users weren't motivated to understand the services upfront. They wanted to get through onboarding, get to their car, and figure out the app on their own terms.</p>
          <p>When no money was being asked for at this point in the journey, users simply didn't feel the urgency to engage. The trials were free — so why stop and read about them now?</p>
          <blockquote className="toyota-pivot-quote">
            "People cared more about completing onboarding than being forced to learn everything upfront."
          </blockquote>
          <p>This wasn't a UX failure to polish away. It was a product strategy question. I took the insight back to Product and Business — and it changed what we were building.</p>
        </div>
      </div>

      {/* ── Responding to the insight ── */}
      <ProjectCallout
        eyebrow="Responding to the insight"
        headline="Two new concepts. A conversation with legal. A new goal."
      >
        <p>Rather than iterate further on the "educate upfront" model, I developed two new concepts built around the insight that users wanted speed — not comprehension — at the point of onboarding.</p>
        <p><strong>Concept A — Consent first, educate contextually later.</strong> Data consent moved to the front of the experience, where users actually expected and understood it. Connected Services education moved out of onboarding entirely — introduced post-setup, contextually, inside the app where users were ready to explore.</p>
        <p>Both concepts were shared with the Global Head of Onboarding, Legal, and the wider Business team. The conversations that followed weren't just about design — Product pressed Legal to reconsider how services were offered and packaged. The research had surfaced a business model question that design alone couldn't answer.</p>
      </ProjectCallout>

      <ProjectImage
        variant="wide"
        caption="Two new concepts presented to stakeholders"
      />

      {/* ── Evolution — no component yet ── */}
      <ProjectCallout
        eyebrow="Design evolution"
        headline="The goal evolved four times. That was the point."
      >
        <p>This wasn't scope creep — it was the work doing what it should. Each shift was driven by evidence from research and testing, not changing opinions.</p>
      </ProjectCallout>

      {/* ── Solution ── */}
      <ProjectCallout
        eyebrow="The new experience"
        headline="Data consent first. Education where users are ready for it."
      >
        <p>The final direction reflected the user's actual mental model: move through setup, then discover what the app can offer. Connected Services are introduced contextually within the home experience — where users can engage on their own terms, with their car in front of them and the stakes feeling real.</p>
        <p>Data consent moved to step 1 — users expected to see it here and understood it in this context. Services education was removed from onboarding entirely and introduced post-setup, where users discover features naturally. Onboarding was optimised for completion speed over comprehension.</p>
      </ProjectCallout>

      <ProjectImage
        variant="wide"
        caption="New onboarding — post-pivot direction"
      />

      {/* ── Impact ── */}
      <ProjectCallout
        eyebrow="What changed"
        headline="The research changed more than the screens."
      >
        <p>The most significant outcomes from this project weren't visual — they were strategic. Design research surfaced a product strategy problem, and the work shifted how the business thought about trials and onboarding.</p>
        <p>The business reconsidered how it packaged Connected Services trials. Data consent was repositioned to the front of the experience — a structural change affecting how the product was built, not just designed. The onboarding goal shifted from "increase comprehension of trials" to "optimise for completion speed." A new universally-preferred concept was validated in testing and entered the delivery phase with aligned stakeholders across product, legal, and business.</p>
      </ProjectCallout>

      {/* ── Handoff ── */}
      <ProjectCallout
        eyebrow="Handoff"
        headline="I left the project at a strategic milestone."
      >
        <p>When I was approached by Motorway for a new role, the Toyota onboarding project had reached a clear turning point: the goal had been validated by research, the new direction was aligned across product, business, and legal, and the design was ready to move into build.</p>
        <p>I worked my full notice period to ensure continuity. I onboarded the incoming designer fully — documenting the design rationale, sharing testing artefacts, and making sure the project could move forward with confidence. The team entered the core delivery phase with a clear design strategy and no gaps in context.</p>
      </ProjectCallout>

      {/* ── Reflection ── */}
      <ProjectCallout
        eyebrow="What I'd do differently"
        headline="Three things I learned."
      >
        <p><strong>Align on the definition of success earlier.</strong> We spent significant time designing for clarity before we established what "success" actually meant. Getting product, business, and design aligned on the metric — completion rate, not comprehension — at the outset would have shortened the discovery phase and made our testing sharper from the start.</p>
        <p><strong>Bring quantitative usability data in sooner.</strong> Our testing was moderated and qualitative — valuable, but harder to bring to Legal and Business than numbers would have been. Earlier task-completion benchmarking would have given us harder evidence when we needed to make the case for restructuring how trials were offered.</p>
        <p><strong>Dealer interviews earlier in the process.</strong> The insights from dealer interviews were genuinely useful, but came mid-process. Understanding the sales-side experience earlier might have surfaced the "users want speed, not education" insight in the first round of research rather than the second.</p>
      </ProjectCallout>

      <ProjectBackButton />

      <Footer />

    </div>
  )
}

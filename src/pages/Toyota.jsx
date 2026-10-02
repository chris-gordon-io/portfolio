import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectHero from '../components/project/ProjectHero'
import ProjectTopline from '../components/project/ProjectTopline'
import ProjectText from '../components/project/ProjectText'
import ProjectImage from '../components/project/ProjectImage'
import ProjectMetrics from '../components/project/ProjectMetrics'
import ProjectHypothesis from '../components/project/ProjectHypothesis'
import ProjectImpact from '../components/project/ProjectImpact'
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

      {/* ── Why are we doing this? ── */}
      <ProjectText heading="Why are we doing this?">
        <p className="body-large">Toyota's app had a 1.4-star rating. A new CEO wanted to rebuild it from scratch.</p>
        <p className="body">Toyota had built different car companion apps for different regions, car generations, and markets. The new CEO wanted a single, unified global app to align experiences, reduce development and speed up releases.</p>
        <p className="body">I was Lead UX Designer on the Onboarding team, working with 5 Product Owners and an offshore engineering team across three time zones, creating an Onboarding experience that works for everyone...</p>
      </ProjectText>

      <ProjectMetrics
        heading="App store rating"
        metrics={[{ number: '1.4★', label: 'App Store rating before the rebuild' }]}
      />

      {/* ── The Complexity ── */}
      <ProjectText heading="The Complexity">
        <p className="body-large">This wasn't a simple onboarding problem.</p>
        <p className="body">The experience had to work across:</p>
        <div>
          <p className="body">• Multiple regions</p>
          <p className="body-small">Different legal requirements, language, services</p>
        </div>
        <div>
          <p className="body">• Multiple car generations</p>
          <p className="body-small">Affects how vehicle pairing works</p>
        </div>
        <div>
          <p className="body">• Multiple trim levels</p>
          <p className="body-small">Determines which trials are included</p>
        </div>
        <div>
          <p className="body">• Multiple user types</p>
          <p className="body-small">New buyers, second-hand, partners, second vehicle owners</p>
        </div>
        <div>
          <p className="body">• Multiple entry points</p>
          <p className="body-small">Pre-car delivery, in-car first launch, returning users</p>
        </div>
      </ProjectText>

      <ProjectImage caption="Current design — first-time user set-up from car" />

      {/* ── The Broken Experience ── */}
      <ProjectText heading="The Broken Experience">
        <p className="body-large">Users had no idea what they were being asked to engage with.</p>
        <p className="body">The existing onboarding asked users to engage with Connected Services trials before explaining what those services were or what they were worth. Users skipped past them, ignored them, or left confused.</p>
      </ProjectText>

      <ProjectText heading="The Broken Experience">
        <p className="body-large">The root cause: no mental model, no value proposition, no trust.</p>
        <p className="body">Users encountered trial offers with no context for what Connected Services were, how long they lasted, what they cost after trial, or how data consent related to any of it. Without that foundation, they couldn't make an informed choice — so they skipped.</p>
        <p className="body">The result: poor trial activation, 1.4-star reviews citing confusion, and a product that was actively eroding trust at the first moment of use.</p>
      </ProjectText>

      <ProjectHypothesis>
        If we make Connected Services clearer — what they are, what they cost, how consent works — users will engage with them more confidently.
      </ProjectHypothesis>

      {/* ── Goals ── */}
      <ProjectText heading="Goals">
        <p className="body-large">What we set out to prove.</p>
        <p className="body"><strong>For users:</strong> If we improve clarity around trials and data consent, users will feel confident enough to engage with Connected Services.</p>
        <p className="body"><strong>For the business:</strong> Increased trial activation → higher post-trial subscription conversion.</p>
      </ProjectText>

      {/* ── My Approach ── */}
      <ProjectText heading="My Approach">
        <p className="body-large">I started by getting everyone in a room, then getting in front of real users.</p>
        <p className="body">I ran a 2-day discovery workshop with the Global Head of Onboarding, bringing in designers from across the team for ideation and input from previous experience phases. The goal was to surface what we thought we knew, what we didn't, and where the biggest risks were.</p>
        <p className="body"><strong>From there, I led:</strong></p>
        <div>
          <p className="body">• Cross-functional workshops with PMs, stakeholders, and designers</p>
          <p className="body">• Prototype concepts tested in moderated user sessions</p>
        </div>
        <p className="body"><strong>We also:</strong></p>
        <div>
          <p className="body">• Interviewed dealers and car buyers to understand the sales-side experience</p>
        </div>
      </ProjectText>

      {/* ── First concept ── */}
      <ProjectText heading="The Broken Experience">
        <p className="body-large">Our first concept: show the service value clearly, upfront.</p>
        <p className="body">We rebuilt the Connected Services cards, replacing the generic carousel with individual service tiles that named the benefit, the trial length, and the cost transparency users were missing.</p>
        <p className="body">We tested this with 8 users in moderated sessions...</p>
      </ProjectText>

      <ProjectImage caption="First concept — Safety Connect detail and trial summary" />

      {/* ── The pivot ── */}
      <ProjectText heading="The pivot">
        <p className="body-large">We were solving the wrong problem.</p>
        <p className="body">Testing showed users understood Connected Services better with our redesign. But something more important surfaced: <strong>they didn't actually care.</strong></p>
        <p className="body">When no money was being asked for upfront, users weren't motivated to understand the services in detail. What they were motivated to do was get through onboarding as fast as possible — get to their car, get into the app, and explore later on their own terms.</p>
        <p className="body"><em>"People cared more about completing onboarding than being forced to learn everything upfront."</em></p>
        <p className="body">This wasn't a UX failure to fix — it was a product strategy question. We took it back to Product and Business.</p>
      </ProjectText>

      {/* ── The Design Evolution ── */}
      <ProjectText heading="The Design Evolution">
        <p className="body-large">The goal evolved four times. That was the point.</p>
        <p className="body">Each shift was driven by evidence, not opinion. The final goal, optimise for speed, was a direct result of what users showed us in testing.</p>
        <div>
          <p className="body"><strong>1. Original Design</strong> — Matched existing product strategy.</p>
          <p className="body"><strong>2. Design to match function</strong> — Design was misaligned with actual technical capabilities, fixed first.</p>
          <p className="body"><strong>3. Design for clarity</strong> — Initial hypothesis: help users understand services.</p>
          <p className="body"><strong>4. Design for speed (new goal)</strong> — Insight from testing: users want through, not educated.</p>
        </div>
      </ProjectText>

      {/* ── The New Experience ── */}
      <ProjectText heading="The New Experience">
        <p className="body-large">Data consent moved forward and simplified. Education moved to where users were ready for it.</p>
        <p className="body">The new experience reflected the user's actual mental model: get through setup, then discover what the app can do. Connected Services are introduced contextually, where users can engage with them on their own terms.</p>
      </ProjectText>

      <ProjectImage caption="New experience — contextual Connected Services, introduced post-onboarding" />

      {/* ── What actually changed ── */}
      <ProjectText heading="What actually changed">
        <p className="body-large">The research changed more than the design.</p>
        <p className="body">By the time the project moved into delivery, several things had shifted that went beyond UI:</p>
        <p className="body"><strong>Business:</strong> The business reconsidered how it packaged its trials — moving away from forcing education upfront in favour of contextual discovery post-onboarding.</p>
        <p className="body"><strong>Product:</strong> Data consent was repositioned to the front of the experience — a decision that affected how the product was structured, not just designed.</p>
        <p className="body"><strong>Strategy:</strong> The onboarding goal shifted from "increase comprehension of Connected Services" to "optimise for completion speed, educate in the right place" — a fundamental reframe of what success meant.</p>
        <p className="body"><strong>What I'd measure:</strong></p>
        <div>
          <p className="body">• App store rating improvement (baseline: 1.4★)</p>
          <p className="body">• Data consent completion rate</p>
          <p className="body">• Onboarding completion rate and drop-off by step</p>
          <p className="body">• Dealership sentiment (qualitative, via interviews)</p>
          <p className="body">• Trial activation rates post-launch</p>
        </div>
      </ProjectText>

      {/* ── Hand off ── */}
      <ProjectText heading="Hand off">
        <p className="body-large">I left the project at a strong handover point.</p>
        <p className="body">When I was approached by Motorway for a new role, the Toyota onboarding project had reached a clear strategic milestone: the goal was redefined, the approach was validated through testing, and the design was ready to move into build.</p>
        <p className="body">I worked my full notice period to ensure continuity. I fully onboarded the incoming designer, documented the design rationale, and handed over a project with a clear direction and aligned stakeholders entering the delivery phase with a solid foundation.</p>
      </ProjectText>

      {/* ── What I'd Do Differently ── */}
      <ProjectText heading="What I'd Do Differently">
        <p className="body-large">What I learned.</p>
        <p className="body">Earlier alignment on what "success" meant: we spent time designing for clarity when the real metric should have been completion speed. Getting Product, Business, and Design aligned on the success definition at the start would have shortened the discovery phase.</p>
        <p className="body">Dealer interviews informing the brief: the insights from dealer interviews were valuable but came mid-process. Earlier integration of the sales-side perspective might have surfaced the "get through onboarding fast" insight sooner.</p>
        <p className="body">Get everyone in the room, and keep them there. Some of the struggles and challenges we came up against as a team were due to not having a mutual agreement on certain approaches (amount of up-front education and where).</p>
      </ProjectText>

      <ProjectImpact>
        The research reframed what success meant for this project — from comprehension to completion speed — repositioning data consent and reshaping how the business packaged Connected Services trials. The App Store rating has since climbed to 4.5★, up from 1.4★ at the start of the engagement.
      </ProjectImpact>

      <ProjectBackButton />

      <Footer />

    </div>
  )
}

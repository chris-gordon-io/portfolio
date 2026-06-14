import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import ProjectHero from '../components/project/ProjectHero'
import ProjectText from '../components/project/ProjectText'
import ProjectImage from '../components/project/ProjectImage'
import ProjectMetrics from '../components/project/ProjectMetrics'
import ProjectHypothesis from '../components/project/ProjectHypothesis'
import './Project1.css'

const IMG = 'https://framerusercontent.com/images/'

export default function Project1() {
  return (
    <div className="p1-page">

      <Nav />

      <div className="p1-title-block">
        <h1 className="p1-title">Motorway</h1>
        <p className="p1-subtitle">Customer activation journey</p>
      </div>

      <ProjectHero
        image={{ src: `${IMG}Mo5jOj0hktd1x8y6UqpC3MH9Nc.png`, alt: 'Motorway offer select page' }}
      />

      <ProjectText heading="Topline" accent>
        <p className="pc-body-lg">How I ran multiple A/B tests in a high focus area to optimise the customer activation flow and increase primary KPIs multiple times.</p>
      </ProjectText>

      <ProjectText heading="About">
        <p className="pc-body">Motorway started in 2017 with a vision to build a better car market for everyone, operating in a very competitive market against companies such as Carwow, Webuyanycar and Cinch.</p>
        <p className="pc-body">I joined Motorway in summer 2023 and after an "easy in" learning the way the company works on internal tools was moved over to the Growth team tasked with optimising top of funnel — in this case the first four pages a (new) user would see when landing on Motorway.co.uk with the intent of (potentially) selling their car.</p>
      </ProjectText>

      <ProjectText heading="Heuristic evaluation of current experience">
        <p className="pc-body">The first thing I did when joining this team was to go through the current experience and making some potentially quick and easy optimisation recommendations, these included things such as:</p>
        <div>
          <p className="pc-body">✅ Making sure CTA's were visible across all viewports</p>
          <p className="pc-body">✅ One Primary CTA on each page</p>
          <p className="pc-body">✅ Increase Accessibility of form fields</p>
        </div>
        <p className="pc-body">I shared the findings with the wider team (Lead Product Owner and full Dev team) to gauge thoughts and feelings as well as get a rough idea of effort involved (from an engineering perspective).</p>
        <p className="pc-body">With the whole team aligned we wrote up tickets for refinement and rolled out each optimisation separately and measuring impact.</p>
      </ProjectText>

      <ProjectImage
        variant="phones"
        caption="Brining Primary CTA into all Viewports on initial load"
        phones={[
          { src: `${IMG}FnEmfUZAKnbq8a80ysIObovXuc.png`, alt: 'Before', caption: 'Before — Initial load iPhone 13 Mini' },
          { src: `${IMG}GmrADgk3K9jvWLY5YHz0eHjYps.png`, alt: 'After', caption: 'After — Initial load iPhone 13 Mini' },
        ]}
      />

      <ProjectMetrics
        intro="Each one of these changes had 5%+ positive impact during 50/50 A/B testing and was subsequently rolled out to 100%."
        metrics={[
          { number: '+6.65%', label: 'CTA in all viewports' },
          { number: '+3.21%', label: 'CTA updates' },
        ]}
      />

      <ProjectText heading="Addition action">
        <p className="pc-body">Off the back of this we also rebuilt the header to reduce the amount of space it took up as during User Lab testing people were aware and confident that the valuation was related to the car details they had inputted and act as an enabler for more space for more valuable content.</p>
      </ProjectText>

      <ProjectImage
        variant="phones"
        caption="Page header before and after"
        phones={[
          { src: `${IMG}9nWLGN9u0mBFcQsFZta5K1Kytek.jpg`, alt: 'Original Header', caption: 'Original Header' },
          { src: `${IMG}4OWA1jO5O3Fl9T50L3w80qqpz98.jpg`, alt: 'Optimised Header', caption: 'Optimised Header' },
        ]}
      />

      <ProjectText heading={<>Problem/Opportunity space <span className="pc-heading-light">(where and why)</span></>}>
        <p className="pc-body">A previous study and continual discovery (through moderated user testing) pointed to 3 key drivers for users to sell their car to design to:</p>
        <div>
          <p className="pc-body">💰 Price (how much)</p>
          <p className="pc-body">💰 Price (how did MW get this price and can I trust I will get it)</p>
          <p className="pc-body">⚙️ Process (Understanding/Confidence in what happens next)</p>
        </div>
        <p className="pc-body">Looking at our funnel data we had two big opportunity spaces, the home page and the offer select page (offer select page being the larger of the two based on the numbers 15.3% vs 30.3% vs Previous). The Home page had recently been fully redesigned and A/B tested on with little to no impact so there was little appetite to focus on that for now.</p>
      </ProjectText>

      <ProjectImage
        variant="wide"
        caption="The funnel data"
        src={`${IMG}eKOTtOc2Rl52Y6KgALb1gX00mg.jpg`}
        alt="Conversion funnel data"
      />

      <ProjectText heading="How we tackled this">
        <p className="pc-body">To kick this new focus off I ran a team wide workshop to pull in everyone's knowledge, opinions and ideas around the current experience.</p>
      </ProjectText>

      <ProjectImage
        variant="wide"
        caption="Full squad workshops"
        src={`${IMG}GpXx6AKZLG4GjZX23tSF7dUSpY.jpg`}
        alt="Full squad FigJam workshops"
      />

      <ProjectText heading="Creating a North Star">
        <p className="pc-body">Off the back of the team workshops and research gathering sessions I started to create a North Star vision for the offer select page, focussing on why the page exists, identifying value for users, while making it achievable within a rough year timeframe.</p>
      </ProjectText>

      <ProjectImage
        variant="wide"
        caption="Northstar wires"
        src={`${IMG}4kNdDkXfJQGVz6sJXwdIFLCWE.png`}
        alt="North star wireframes"
      />

      <ProjectText heading="How are we going to get there?">
        <p className="pc-body">I broke down each element of the offer select page and mapped it out to a testable plan to work out our path to our North Star, validating and understanding the value of each element along the way.</p>
      </ProjectText>

      <ProjectImage
        variant="wide"
        caption="Test mapping"
        src={`${IMG}ECGerZ9sJcYtJV8nQPbpPiatQs.jpg`}
        alt="Test mapping and user journey"
      />

      <ProjectText heading="How we got the price modal and button">
        <p className="pc-body">All research pointed strongly towards customers wanting to know more about how the price quoted was got (as well as questions around how it relates to their specific car). We already had an explainer "?" but it wasn't tagged up to track interaction and also did not pass accessibility colour contrast checks.</p>
      </ProjectText>

      <ProjectHypothesis>
        We believe people will want to learn more about how we calculated their quote and if we build trust and confidence around their quote they are more likely to offer accept (primary KPI).
      </ProjectHypothesis>

      <ProjectImage
        variant="phones"
        caption="Current experience"
        phones={[
          { src: `${IMG}Mo5jOj0hktd1x8y6UqpC3MH9Nc.png`, alt: 'Current tooltip', caption: 'Current tooltip' },
          { src: `${IMG}Y9OdRzkcodxmHQaCagTDbAiYc.png`, alt: 'Current modal', caption: 'Current modal' },
          { src: `${IMG}X6zbhmQnKXjf1XsWvpY1gMNR1Q.png`, alt: 'Back to Offer Select page', caption: 'Back to Offer Select page' },
        ]}
      />

      <ProjectImage
        variant="phones"
        caption="Proposed experience"
        phones={[
          { src: `${IMG}luiAXpfx9nqVPOLBRLjesUZ4EI.png`, alt: 'Proposed button', caption: 'Proposed button' },
          { src: `${IMG}ZK0gq5CZdBd0IODerBLSKEXpBEw.png`, alt: 'Proposed modal', caption: 'Proposed modal' },
          { src: `${IMG}vkG9S3ZxaXouMKN9sm6aqLsbTI.png`, alt: 'Proposed onward journey', caption: 'Proposed onward journey' },
        ]}
      />

      <ProjectText heading="How we got there">
        <div>
          <p className="pc-body">✅ Rebuilt current experience on new tech stack to enable tracking, also make sure icon passes colour contrast checks.</p>
          <p className="pc-body">✅ Measure current interaction and conversion rates on rebuild.</p>
          <p className="pc-body">✅ 50/50 A/B test live and proposed.</p>
        </div>
      </ProjectText>

      <ProjectMetrics
        metrics={[
          { number: '106%', label: 'Interaction rate' },
          { number: '+10%', label: 'Conversion on interaction rate' },
        ]}
      />

      <ProjectText heading="Next">
        <p className="pc-body">Continuing our journey towards our North Star and a whole new experience.</p>
        <Link to="/" className="pc-see-all">← See all work</Link>
      </ProjectText>

      <footer className="footer">
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/cpgordon/" target="_blank" rel="noreferrer">Linkedin</a>
          <a href="https://app.yunojuno.com/p/chris-gordon/" target="_blank" rel="noreferrer">YunoJuno</a>
          <a href="https://www.instagram.com/chrisg116/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <p>All content © 2025</p>
      </footer>

    </div>
  )
}

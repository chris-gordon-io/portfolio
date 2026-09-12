import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProjectHero from '../components/project/ProjectHero'
import ProjectTopline from '../components/project/ProjectTopline'
import ProjectCallout from '../components/project/ProjectCallout'
import ProjectImage from '../components/project/ProjectImage'
import ProjectMetrics from '../components/project/ProjectMetrics'
import ProjectHypothesis from '../components/project/ProjectHypothesis'
import ProjectBackButton from '../components/project/ProjectBackButton'

const IMG = 'https://framerusercontent.com/images/'

export default function Tu() {
  return (
    <div className="project-page">

      <Nav />

      <div className="pc-title-block">
        <h1 className="pc-title">Tu</h1>
        <p className="pc-subtitle">Reimagining the Help experience for TU</p>
      </div>

      <ProjectHero
        image={{ src: `${IMG}zmvDVSiKkFHUyUYT7SD4nH0US8E.png`, alt: 'Tu Help experience desktop and mobile' }}
      />

      <ProjectTopline>
        How I identified a larger problem within an experience and created a holistic vision for self serve Help.
      </ProjectTopline>

      <ProjectCallout eyebrow="About">
        <p>There is a large scale migration piece happening at Sainsburys Argos in a cost saving move (all Products on a single tech stack). As a result of the replatforming there is a need to look at each part of the experience and look for opportunities to update and improve.</p>
        <p>This project was started off with the ask to sense check the UX of the accordion component in the new Design System and how it compared to the current implementation, it ended with a complete reimagine of the Help experience across all brands.</p>
      </ProjectCallout>

      <ProjectHypothesis>
        "Hey Chris, can you do the UX for this accordion?" led to the realisation that the Help section of the site was not being properly considered in the replatforming work.
      </ProjectHypothesis>

      <ProjectCallout eyebrow="Discovery">
        <p>Help is a massive area, so this required reaching out to both content team and the CMC (Call centre Team) to get an understanding on what's been done so far, what's worked, what hasn't and what is the current direction for Help from a content perspective.</p>
        <p>Tu's current help pages are very information heavy — as a result customers are having to phone up the CMC on average approx 1 in every 5 orders to get help. High number of CMC calls add additional cost to the business as well as being a more lengthy way for customers to complete their tasks. There is an opportunity to reimagine the experience to allow customers to self serve, reducing CMC costs and increasing customer satisfaction.</p>
      </ProjectCallout>

      <ProjectMetrics
        heading="The problem"
        metrics={[
          { number: '1 in 5', label: 'Orders result in a CMC call for help' },
        ]}
      />

      <ProjectImage
        variant="wide"
        caption="Current Help home page Desktop"
        src={`${IMG}52n66YpAvHj15n6gaPDrBwgqIo.jpg`}
        alt="Current Tu Help home page on desktop"
      />

      <ProjectImage
        variant="phones"
        caption="Heatmaps"
        phones={[
          { src: `${IMG}m6CGSLp9gwy2nKWIjy0uSZbga0.jpg`, alt: 'Help page heatmap' },
          { src: `${IMG}Hd7cMKNL2m2tP0iDmcqI6KOZlc.jpg`, alt: 'Help page heatmap 2' },
        ]}
      />

      <ProjectCallout eyebrow="Discovery continued">
        <p>In-between the cross-team collaboration work I set about benchmarking our competitors, looking at time on task, confidence and NPS of comparable journeys based on heatmaps and CMC data (what are our customers trying to do the most).</p>
        <p>Brands tested:</p>
        <div>
          <p>✦ Argos</p>
          <p>✦ Tu</p>
          <p>✦ M&S</p>
          <p>✦ ASOS</p>
          <p>✦ Next</p>
          <p>✦ George</p>
          <p>✦ John Lewis</p>
        </div>
        <p>How we measured: Time on task, NPS, Confidence.</p>
      </ProjectCallout>

      <ProjectImage
        variant="phones"
        caption="Competitor benchmarking"
        phones={[
          { src: `${IMG}33c2tA1f7tm6hcXhP8FZziHGc.jpg`, alt: 'Competitor 1' },
          { src: `${IMG}Oa26cYT53bMJ5LzQlOFT6ce2s.jpg`, alt: 'Competitor 2' },
        ]}
      />

      <ProjectImage
        variant="phones"
        caption="Test results and anatomy of a winner"
        phones={[
          { src: `${IMG}FMX5MAmojmNeTXvPMiidRy7IJlU.jpg`, alt: 'Test results' },
          { src: `${IMG}XdYiX3rYiBX2d17RUDOxjpITAk.jpg`, alt: 'Anatomy of a winner' },
        ]}
      />

      <ProjectCallout eyebrow="Design goals / Success metrics">
        <div>
          <p>✅ Reduce customers' reliance on the call centre (drive down calls per order)</p>
          <p>✅ Help customers self serve — completing tasks quicker and easier</p>
          <p>✅ Increase UX benchmarking to match or exceed top scoring competitors</p>
        </div>
      </ProjectCallout>

      <ProjectCallout eyebrow="Ideation">
        <p>Based on what the CMC and heatmaps were telling us (and with an eye on high benchmarking competitor references) it appeared the majority of customers wanted to be able to complete or find info on three main tasks. Pulling these out and creating self-service journeys made sense, so a new Help home page was wired up based on the hypothesis that separating content into primary tasks and secondary information would benefit the majority of customers.</p>
      </ProjectCallout>

      <ProjectHypothesis>
        We believe users will be able to navigate quicker and more efficiently if the content is broken up into blocks of tasks and information, resulting in decreased time on task and increased NPS — ultimately reducing CMC usage.
      </ProjectHypothesis>

      <ProjectImage
        variant="wide"
        caption="Wires and flows"
        src={`${IMG}y0NJqNOpl2gx8DsGmw7SUTFc.jpg`}
        alt="Wires and flows for new Help experience"
      />

      <ProjectCallout eyebrow="Wires">
        <p>Going back to the replatforming objective the visuals were created using as close to possible the current CMS components available for builds. I iterated slightly on a couple of visual styles to make them more suitable for specific usage — for example reducing the size of imagery to use an icon — in the hopes others would agree on ROI once we got to build.</p>
      </ProjectCallout>

      <ProjectImage
        variant="wide"
        caption="Wires and potential CMS components"
        src={`${IMG}BomKm67Y67dlTitmtKz6WySX0L4.jpg`}
        alt="Wires mapped to CMS components"
      />

      <ProjectCallout eyebrow="Visuals and testing">
        <p>The research and wires were shared around both the design team and the content team (who have ownership of the content on Tu) to gather thoughts and feedback — all largely positive. Next step was skinning the wires using the Tu Design System (a reskinned version of Sainsbury's Luna Design System, that I also contributed to).</p>
        <p>Testing was done on both desktop and mobile using the same method as the benchmarking testing — so while not concrete, it at least gives a steer and would highlight any potential issues.</p>
        <p>This is also an example where A/B testing would not work (the usual way to test more robustly) as one of the design goals is to reduce CMC call frequency — not something we'd be able to link to either design in an A/B test.</p>
      </ProjectCallout>

      <ProjectMetrics
        heading="Results"
        intro="Current vs proposed redesign"
        metrics={[
          { number: '34s → 24s', label: 'Time on task' },
          { number: '13 → 36', label: 'NPS' },
          { number: '71% → 86%', label: 'Confidence (5–7 rating)' },
        ]}
      />

      <ProjectImage
        variant="wide"
        caption="Old vs new"
        src={`${IMG}CKaOuqCXNIYWCs2C5Lf2WfvC0I.jpg`}
        alt="Old vs new Help experience comparison"
      />

      <ProjectImage
        variant="phones"
        caption="Help home page and primary task page"
        phones={[
          { src: `${IMG}tJj0bdTi12BXRFtL5ZYIncdKE.jpg`, alt: 'Help home page desktop', caption: 'Help home page' },
          { src: `${IMG}wHmrshlfvRjWXKAl0mlpzIlH0wg.jpg`, alt: 'Help primary task page', caption: 'Primary task page' },
        ]}
      />

      <ProjectCallout eyebrow="Next steps">
        <div>
          <p>🧑‍💼 Getting CMS and Help Product Managers to understand the value beyond the replatforming and get the new experience into the backlogs (done).</p>
          <p>✍️ Content audit with the Content team. Continuing CMC workshops to dive into the details of what people are calling about.</p>
          <p>🛠️ Get an understanding of MVP with Engineering while continuing to design out journeys and explore opportunities.</p>
          <p>📐 Measure calls to Call Centre post launch.</p>
        </div>
      </ProjectCallout>

      <ProjectBackButton />

      <Footer />

    </div>
  )
}

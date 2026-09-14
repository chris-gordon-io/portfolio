import { expect, waitFor } from 'storybook/test'
import ProjectCallout from './ProjectCallout'

const meta = {
  component: ProjectCallout,
  tags: ['ai-generated'],
}

export default meta

export const Default = {
  args: {
    eyebrow: 'About',
    children: <p>Motorway started in 2017 with a vision to build a better car market for everyone.</p>,
  },
  play: async ({ canvas }) => {
    // Scroll-reveal starts at opacity 0 until IntersectionObserver fires.
    await waitFor(() => expect(canvas.getByText('About')).toBeVisible())
  },
}

export const WithHeadline = {
  args: {
    eyebrow: 'Problem / Opportunity space',
    headline: 'Where and why',
    children: <p>Funnel data pointed to two big opportunity spaces.</p>,
  },
}

export const EyebrowOnly = {
  args: {
    eyebrow: 'Next',
  },
}

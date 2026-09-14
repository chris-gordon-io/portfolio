import { expect, waitFor } from 'storybook/test'
import ProjectMetrics from './ProjectMetrics'

const meta = {
  component: ProjectMetrics,
  tags: ['ai-generated'],
}

export default meta

export const Default = {
  args: {
    intro: 'Each change had a positive impact during A/B testing.',
    metrics: [
      { number: '+6.65%', label: 'CTA in all viewports' },
      { number: '+3.21%', label: 'CTA updates' },
    ],
  },
  play: async ({ canvas }) => {
    // Scroll-reveal starts at opacity 0 until IntersectionObserver fires.
    await waitFor(() => expect(canvas.getByText('+6.65%')).toBeVisible())
  },
}

export const ManyMetrics = {
  args: {
    heading: 'Results',
    metrics: [
      { number: '+6.65%', label: 'CTA in all viewports' },
      { number: '+3.21%', label: 'CTA updates' },
      { number: '-18%', label: 'Time to complete' },
      { number: '4.8/5', label: 'Usability score' },
    ],
  },
}

export const NoIntro = {
  args: {
    heading: 'Impact',
    metrics: [{ number: '+12%', label: 'Offer acceptance rate' }],
  },
}

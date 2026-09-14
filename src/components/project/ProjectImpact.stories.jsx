import { expect, waitFor } from 'storybook/test'
import ProjectImpact from './ProjectImpact'

const meta = {
  component: ProjectImpact,
  tags: ['ai-generated'],
}

export default meta

export const Default = {
  args: {
    children: 'In an ambiguous, delivery-driven project, my biggest impact was spotting the need for a Design System early, winning stakeholder buy-in, building it from nothing, and partnering with an offshore dev team to ship it in code.',
  },
  play: async ({ canvas }) => {
    // Scroll-reveal starts at opacity 0 until IntersectionObserver fires.
    await waitFor(() => expect(canvas.getByText('Impact')).toBeVisible())
  },
}

export const ShortCopy = {
  args: {
    children: 'Increased conversion by 6%+ across multiple A/B tests.',
  },
}

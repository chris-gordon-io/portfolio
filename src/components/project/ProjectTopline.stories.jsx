import { expect, waitFor } from 'storybook/test'
import ProjectTopline from './ProjectTopline'

const meta = {
  component: ProjectTopline,
  tags: ['ai-generated'],
}

export default meta

export const Default = {
  args: {
    children: 'Creating a complex, multi-app estimating and reporting tool from the ground up, working closely with Stakeholders to redefine fragmented workflows into a single, coherent experience.',
  },
  play: async ({ canvas }) => {
    // The section uses the shared scroll-reveal system (opacity 0 until an
    // IntersectionObserver marks it "revealed"), so wait for that to land.
    await waitFor(() => expect(canvas.getByText('Topline')).toBeVisible())
  },
}

export const ShortCopy = {
  args: {
    children: 'How I ran multiple A/B tests to optimise the customer activation flow.',
  },
}

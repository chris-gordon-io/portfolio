import { expect, waitFor } from 'storybook/test'
import ProjectHypothesis from './ProjectHypothesis'

const meta = {
  component: ProjectHypothesis,
  tags: ['ai-generated'],
}

export default meta

export const Default = {
  args: {
    children: 'We believe people will want to learn more about how we calculated their quote, and that building trust around it will increase offer acceptance.',
  },
  play: async ({ canvas }) => {
    // Scroll-reveal starts at opacity 0 until IntersectionObserver fires.
    await waitFor(() => expect(canvas.getByText('Hypothesis')).toBeVisible())
  },
}

export const ShortCopy = {
  args: {
    children: 'A clearer price breakdown will increase user trust.',
  },
}

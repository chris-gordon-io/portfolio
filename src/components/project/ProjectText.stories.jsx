import { expect, waitFor } from 'storybook/test'
import ProjectText from './ProjectText'

const meta = {
  component: ProjectText,
  tags: ['ai-generated'],
}

export default meta

export const Default = {
  args: {
    heading: 'About',
    children: (
      <>
        <p className="body">Benchmark is a B2B SaaS business providing tools to large scale construction industries.</p>
        <p className="body">I was brought in as a Lead Designer to work with the newly formed Product team.</p>
      </>
    ),
  },
  play: async ({ canvas }) => {
    // Scroll-reveal starts at opacity 0 until IntersectionObserver fires.
    await waitFor(() => expect(canvas.getByRole('heading', { name: 'About' })).toBeVisible())
  },
}

export const AccentHeading = {
  args: {
    heading: 'Topline',
    accent: true,
    children: <p className="pc-body-lg">How I ran multiple A/B tests to optimise the activation flow.</p>,
  },
}

export const Slim = {
  args: {
    heading: 'Additional action',
    slim: true,
    children: <p className="body">Shown directly after an image section, with no top padding.</p>,
  },
}

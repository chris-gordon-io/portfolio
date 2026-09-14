import { expect, waitFor } from 'storybook/test'
import ProjectHero from './ProjectHero'

const meta = {
  component: ProjectHero,
  tags: ['ai-generated'],
}

export default meta

export const Default = {}

export const WithImage = {
  args: {
    image: {
      src: 'https://framerusercontent.com/images/uxJV8RIR1IpcytkQgqSpaBWaz4.jpg',
      alt: 'Product screenshot',
    },
  },
  play: async ({ canvas }) => {
    // Scroll-reveal starts at opacity 0 until IntersectionObserver fires.
    await waitFor(() => expect(canvas.getByAltText('Product screenshot')).toBeVisible())
  },
}

export const Wide = {
  args: {
    wide: true,
    fullWidth: true,
    image: {
      src: 'https://framerusercontent.com/images/uxJV8RIR1IpcytkQgqSpaBWaz4.jpg',
      alt: 'Product screenshot',
    },
  },
}

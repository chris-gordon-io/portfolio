import { expect, waitFor } from 'storybook/test'
import ProjectImageSplit from './ProjectImageSplit'

const meta = {
  component: ProjectImageSplit,
  tags: ['ai-generated'],
}

export default meta

// No images yet: three empty containers keep the block's shape.
export const Default = {
  args: {
    caption: 'Image block — two left, one right',
  },
  play: async ({ canvas }) => {
    // Scroll-reveal starts at opacity 0 until IntersectionObserver fires.
    await waitFor(() => expect(canvas.getByText('Image block — two left, one right')).toBeVisible())
  },
}

export const WithCaptions = {
  args: {
    caption: 'Image block — two left, one right',
    images: [
      { caption: 'Top left' },
      { caption: 'Bottom left' },
      { caption: 'Right' },
    ],
  },
}

import { expect } from 'storybook/test'
import Nav from './Nav'

const meta = {
  component: Nav,
  tags: ['ai-generated'],
}

export default meta

export const Default = {
  play: async ({ canvas }) => {
    // Proves the route prop actually reaches the DOM, not just that Nav renders.
    await expect(canvas.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about')
  },
}

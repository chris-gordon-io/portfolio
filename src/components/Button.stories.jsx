import { expect } from 'storybook/test'
import Button from './Button'

const meta = {
  component: Button,
}

export default meta

const ArrowIcon = () => (
  <svg className="btn-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <polyline points="7,4 2,8 7,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const Primary = {
  args: { variant: 'primary', size: 'md', children: 'Get in touch' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Get in touch' })).toBeVisible()
  },
}

export const PrimarySmall = {
  args: { variant: 'primary', size: 'sm', children: 'Get in touch' },
}

export const PrimaryLarge = {
  args: { variant: 'primary', size: 'lg', children: 'Get in touch' },
}

export const Secondary = {
  args: { variant: 'secondary', size: 'md', children: 'Learn more' },
}

// Renders on a dark backdrop since primary-reversed (white fill, dark
// text) is designed for use on dark surfaces — see ProjectBackButton.
export const PrimaryReversed = {
  args: { variant: 'primary-reversed', size: 'md', children: 'Back to all work', icon: <ArrowIcon /> },
  render: (args) => (
    <div style={{ background: '#272737', padding: 24, borderRadius: 12, display: 'inline-block' }}>
      <Button {...args} />
    </div>
  ),
}

export const WithIcon = {
  args: { variant: 'secondary', size: 'md', children: 'Back to all work', icon: <ArrowIcon /> },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Back to all work' })).toBeVisible()
  },
}

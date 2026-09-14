import { expect } from 'storybook/test'
import ProjectBackButton from './ProjectBackButton'

const meta = {
  component: ProjectBackButton,
  tags: ['ai-generated'],
}

export default meta

export const Default = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /back to all work/i })).toBeVisible()
  },
}

// CssCheck — the one project-wide proof that the shared preview loaded the
// app's real CSS. .pb-wrapper uses background: var(--color-accent) (#da441b).
export const CssCheck = {
  play: async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector('.pb-wrapper')
    await expect(getComputedStyle(wrapper).backgroundColor).toBe('rgb(218, 68, 27)')
  },
}

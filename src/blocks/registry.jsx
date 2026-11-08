import ProjectHero from '../components/project/ProjectHero'
import ProjectTopline from '../components/project/ProjectTopline'
import ProjectText from '../components/project/ProjectText'
import ProjectCallout from '../components/project/ProjectCallout'
import ProjectImage from '../components/project/ProjectImage'
import ProjectImageSplit from '../components/project/ProjectImageSplit'
import ProjectMetrics from '../components/project/ProjectMetrics'
import ProjectHypothesis from '../components/project/ProjectHypothesis'
import ProjectImpact from '../components/project/ProjectImpact'
import ProjectBackButton from '../components/project/ProjectBackButton'
import Editable from './Editable'
import Body from './Body'

/**
 * Every block type a project page can be built from. Each `render` receives
 * the block's props and a context with:
 *   text(key, opts)  → props[key] as inline-editable text; on the live site the plain
 *                      value (undefined when empty), or a span of HTML when opts.rich
 *   path             → the block's props path in the content store
 *   editing          → whether the dev editor is in edit mode
 */

// Plain-text field inside a list prop (metric numbers, image captions)
function listText(ctx, listKey, i, key, value, placeholder) {
  if (!ctx.editing) return value || undefined
  return <Editable value={value} path={[...ctx.path, listKey, i, key]} editing placeholder={placeholder} />
}

export const BLOCKS = {
  Hero: {
    render: (p, ctx) => (
      <div className="pc-intro-wrapper">
        <ProjectHero
          title={ctx.text('title', { placeholder: 'Project title' })}
          subtitle={ctx.text('subtitle', { placeholder: 'Subtitle' })}
          background={p.background || undefined}
          image={p.image?.src ? p.image : undefined}
          wide={p.wide}
          fullWidth={p.fullWidth}
        />
      </div>
    ),
  },
  Topline: {
    render: (p, ctx) => <ProjectTopline>{ctx.text('text', { rich: true, multiline: true })}</ProjectTopline>,
  },
  Text: {
    render: (p, ctx) => (
      <ProjectText heading={ctx.text('heading', { placeholder: 'Heading' })} accent={p.accent} slim={p.slim}>
        <Body items={p.body} path={ctx.path} editing={ctx.editing} />
      </ProjectText>
    ),
  },
  Callout: {
    render: (p, ctx) => (
      <ProjectCallout
        eyebrow={ctx.text('eyebrow', { placeholder: 'Eyebrow' })}
        headline={ctx.text('headline', { placeholder: 'Headline (optional)' })}
      >
        {p.body?.length ? <Body items={p.body} path={ctx.path} editing={ctx.editing} /> : null}
      </ProjectCallout>
    ),
  },
  Hypothesis: {
    render: (p, ctx) => <ProjectHypothesis>{ctx.text('text', { rich: true, multiline: true })}</ProjectHypothesis>,
  },
  Impact: {
    render: (p, ctx) => <ProjectImpact>{ctx.text('text', { rich: true, multiline: true })}</ProjectImpact>,
  },
  Metrics: {
    render: (p, ctx) => (
      <ProjectMetrics
        heading={ctx.text('heading', { placeholder: 'Results' })}
        intro={ctx.text('intro', { placeholder: 'Intro (optional)' })}
        metrics={(p.metrics ?? []).map((m, i) => ({
          number: listText(ctx, 'metrics', i, 'number', m.number, 'Number'),
          label: listText(ctx, 'metrics', i, 'label', m.label, 'Label'),
        }))}
      />
    ),
  },
  Image: {
    render: (p, ctx) => (
      <ProjectImage
        caption={ctx.text('caption', { placeholder: 'Title (optional)' })}
        images={(p.images ?? []).map((img, i) => ({
          ...img,
          caption: listText(ctx, 'images', i, 'caption', img.caption, 'Caption'),
        }))}
      />
    ),
  },
  ImageSplit: {
    render: (p, ctx) => (
      <ProjectImageSplit
        caption={ctx.text('caption', { placeholder: 'Title (optional)' })}
        images={(p.images ?? []).map((img, i) => ({
          ...img,
          caption: listText(ctx, 'images', i, 'caption', img?.caption, 'Caption'),
        }))}
      />
    ),
  },
  BackButton: {
    render: () => <ProjectBackButton />,
  },
}

/**
 * Spacing / style knobs per block type. Each maps to a CSS property on an
 * element inside the block. `desktop` rules only apply above the 900px
 * breakpoint so the existing mobile padding stays intact.
 */
const outer = sel => ({
  spaceAbove: { sel, prop: 'padding-top' },
  spaceBelow: { sel, prop: 'padding-bottom' },
  sidePadding: { sel, prop: 'padding-inline', desktop: true },
})
const card = sel => ({
  innerY: { sel, prop: 'padding-block' },
  innerX: { sel, prop: 'padding-inline', desktop: true },
  background: { sel, prop: 'background' },
  radius: { sel, prop: 'border-radius' },
})

export const STYLE_TARGETS = {
  Hero: {
    spaceAbove: { sel: '.pc-title-block', prop: 'padding-top' },
    spaceBelow: { sel: '.pc-title-block', prop: 'padding-bottom' },
    sidePadding: { sel: '.pc-hero-section', prop: 'padding-inline' },
    minHeight: { sel: '.pc-intro-wrapper', prop: 'min-height' },
    radius: { sel: '.pc-hero', prop: 'border-radius' },
  },
  Topline: {
    ...outer('.pc-topline-section'),
    ...card('.pc-topline-container'),
    minHeight: { sel: '.pc-topline-container', prop: 'min-height' },
    maxWidth: { sel: '.pc-topline-inner', prop: 'max-width' },
  },
  Text: {
    ...outer('.pc-section'),
    minHeight: { sel: '.pc-section', prop: 'min-height' },
    maxWidth: { sel: '.pc-content-block', prop: 'max-width' },
    columnGap: { sel: '.pc-content-block', prop: 'column-gap' },
    gap: { sel: '.pc-col-body', prop: 'gap' },
  },
  Callout: {
    ...outer('.pc-section'),
    minHeight: { sel: '.pc-section', prop: 'min-height' },
    maxWidth: { sel: '.pc-callout', prop: 'max-width' },
    gap: { sel: '.pc-callout-body', prop: 'gap' },
  },
  Hypothesis: {
    ...outer('.pc-section'),
    ...card('.pc-hypothesis'),
    minHeight: { sel: '.pc-section', prop: 'min-height' },
    maxWidth: { sel: '.pc-hypothesis', prop: 'max-width' },
  },
  Impact: {
    ...outer('.pc-impact-section'),
    ...card('.pc-impact-container'),
    minHeight: { sel: '.pc-impact-container', prop: 'min-height' },
    maxWidth: { sel: '.pc-topline-inner', prop: 'max-width' },
  },
  Metrics: {
    ...outer('.pc-metrics-section'),
    ...card('.pc-metrics-block'),
    gap: { sel: '.pc-stat-cards', prop: 'gap' },
  },
  Image: {
    ...outer('.pc-image-section'),
    ...card('.pc-image-card'),
    gap: { sel: '.pc-image-card', prop: 'gap' },
    maxWidth: { sel: '.pc-image-card', prop: 'max-width' },
  },
  ImageSplit: {
    ...outer('.pc-image-section'),
    ...card('.pc-image-card'),
    gap: { sel: '.pc-split-grid', prop: 'gap' },
    maxWidth: { sel: '.pc-image-card', prop: 'max-width' },
  },
  BackButton: {
    spaceAbove: { sel: '.pb-wrapper', prop: 'padding-top' },
    spaceBelow: { sel: '.pb-wrapper', prop: 'padding-bottom' },
  },
}

/** CSS for global (per type) and per-block style overrides. Block rules come last so they win. */
export function buildStyleCss(theme, blocks) {
  const rules = []
  const add = (scope, type, styles) => {
    const targets = STYLE_TARGETS[type] ?? {}
    for (const [key, value] of Object.entries(styles ?? {})) {
      const t = targets[key]
      if (!t || value === '' || value == null) continue
      // ImageSplit also gets the gap between its stacked left-hand images
      const sels = key === 'gap' && type === 'ImageSplit' ? [t.sel, '.pc-split-left'] : [t.sel]
      const rule = `${sels.map(s => `${scope} ${s}`).join(', ')} { ${t.prop}: ${value}; }`
      rules.push(t.desktop ? `@media (min-width: 901px) { ${rule} }` : rule)
    }
  }
  for (const [type, styles] of Object.entries(theme?.components ?? {})) {
    add(`[data-block-type="${type}"]`, type, styles)
  }
  for (const block of blocks) {
    add(`[data-block-id="${block.id}"]`, block.type, block.style)
  }
  return rules.join('\n')
}

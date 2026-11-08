// What the editor panel shows for each block type, and what a new block starts with

export const HERO_BACKGROUNDS = [
  { name: 'Motorway blue', value: 'linear-gradient(180deg, #0560cc 0%, #063165 100%)' },
  { name: 'Toyota red', value: 'linear-gradient(180deg, #EA0A1D 0%, #AF0817 100%)' },
  { name: 'Tu grey', value: 'linear-gradient(180deg, #52525E 0%, #000000 100%)' },
  { name: 'Benchmark green', value: 'linear-gradient(180deg, #5DD39D 0%, #469E77 100%)' },
]

export const BLOCK_TYPES = {
  Hero: {
    label: 'Hero',
    description: 'Project title, subtitle and the coloured hero card',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'background', label: 'Card background', type: 'background' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'wide', label: 'Wide image (desktop screenshots)', type: 'toggle' },
      { key: 'fullWidth', label: 'Card hugs the image', type: 'toggle' },
    ],
    defaults: {
      title: 'Project title',
      subtitle: 'What the project was about',
      background: HERO_BACKGROUNDS[0].value,
      image: { src: '', alt: '' },
    },
  },
  Topline: {
    label: 'Topline',
    description: 'Peach card with the one-line summary',
    fields: [{ key: 'text', label: 'Text', type: 'richtext' }],
    defaults: { text: 'One sentence that sums up the project.' },
  },
  Text: {
    label: 'Text',
    description: 'Heading on the left, paragraphs on the right',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'accent', label: 'Orange heading', type: 'toggle' },
      { key: 'body', label: 'Paragraphs', type: 'body' },
    ],
    defaults: {
      heading: 'Section heading',
      body: [
        { style: 'body-large', html: 'A short, large lead-in line.' },
        { style: 'body', html: 'Body copy for this section.' },
      ],
    },
  },
  Callout: {
    label: 'Callout',
    description: 'Bold eyebrow with paragraphs underneath',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'body', label: 'Paragraphs', type: 'body', plainDefault: true },
    ],
    defaults: {
      eyebrow: 'Section',
      body: [{ style: 'plain', html: 'Body copy for this section.' }],
    },
  },
  Hypothesis: {
    label: 'Hypothesis',
    description: 'Boxed hypothesis statement',
    fields: [{ key: 'text', label: 'Text', type: 'richtext' }],
    defaults: { text: 'We believe that…' },
  },
  Metrics: {
    label: 'Metrics',
    description: 'Dark block of stat cards',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text', placeholder: 'Results' },
      { key: 'intro', label: 'Intro', type: 'textarea' },
      {
        key: 'metrics',
        label: 'Stats',
        type: 'list',
        itemLabel: 'Stat',
        newItem: { number: '+0%', label: 'What changed' },
        fields: [
          { key: 'number', label: 'Number', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' },
        ],
      },
    ],
    defaults: { metrics: [{ number: '+10%', label: 'What changed' }] },
  },
  Image: {
    label: 'Image',
    description: 'Peach card with 1 wide image, or 2–3 side by side',
    fields: [
      { key: 'caption', label: 'Title', type: 'text' },
      {
        key: 'images',
        label: 'Images',
        type: 'list',
        itemLabel: 'Image',
        newItem: { src: '', alt: '' },
        fields: [
          { key: '', label: 'Image', type: 'image' },
          { key: 'caption', label: 'Caption', type: 'text' },
        ],
      },
    ],
    defaults: { caption: 'Image title', images: [] },
  },
  ImageSplit: {
    label: 'Image block',
    description: 'Two stacked images on the left, one tall on the right',
    fields: [
      { key: 'caption', label: 'Title', type: 'text' },
      {
        key: 'images',
        label: 'Images',
        type: 'slots',
        slots: ['Top left', 'Bottom left', 'Right (tall)'],
        fields: [
          { key: '', label: 'Image', type: 'image' },
          { key: 'caption', label: 'Caption', type: 'text' },
          { key: 'position', label: 'Crop position', type: 'text', placeholder: 'top center' },
        ],
      },
    ],
    defaults: { caption: 'Image title', images: [] },
  },
  Impact: {
    label: 'Impact',
    description: 'Dark closing card with the outcome',
    fields: [{ key: 'text', label: 'Text', type: 'richtext' }],
    defaults: { text: 'What changed because of this work.' },
  },
  BackButton: {
    label: 'Back button',
    description: '“Back to all work” button',
    fields: [],
    defaults: {},
  },
}

export const STYLE_FIELDS = {
  spaceAbove: { label: 'Space above', kind: 'space' },
  spaceBelow: { label: 'Space below', kind: 'space' },
  sidePadding: { label: 'Side padding', kind: 'space', note: 'desktop' },
  innerY: { label: 'Inner padding, top & bottom', kind: 'space' },
  innerX: { label: 'Inner padding, sides', kind: 'space', note: 'desktop' },
  gap: { label: 'Gap between items', kind: 'space' },
  columnGap: { label: 'Gap between columns', kind: 'space' },
  minHeight: { label: 'Min height', kind: 'size' },
  maxWidth: { label: 'Max width', kind: 'size' },
  radius: { label: 'Corner radius', kind: 'space' },
  background: { label: 'Background', kind: 'color' },
}

export const SPACE_TOKENS = [
  { label: '0', value: '0px', px: 0 },
  { label: 'XS', value: 'var(--space-xs)', px: 4 },
  { label: 'S', value: 'var(--space-s)', px: 8 },
  { label: 'M', value: 'var(--space-m)', px: 16 },
  { label: 'L', value: 'var(--space-l)', px: 40 },
  { label: 'XL', value: 'var(--space-xl)', px: 80 },
]

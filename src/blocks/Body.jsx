import Editable from './Editable'

// Paragraph list. Consecutive `tight` items sit together in one group with no gap.
export default function Body({ items = [], path, editing }) {
  const groups = []
  items.forEach((item, i) => {
    if (item.tight && groups.length) groups[groups.length - 1].push(i)
    else groups.push([i])
  })
  const para = i => (
    <Editable
      key={i}
      as="p"
      className={items[i].style === 'plain' ? undefined : items[i].style}
      value={items[i].html}
      path={[...path, 'body', i, 'html']}
      editing={editing}
      placeholder="Paragraph"
      rich
      multiline
    />
  )
  return groups.map(g => (g.length === 1 ? para(g[0]) : <div key={g[0]}>{g.map(para)}</div>))
}

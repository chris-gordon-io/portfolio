import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Editable from '../blocks/Editable'
import { BLOCKS, buildStyleCss } from '../blocks/registry'
import { useContent, useEditMode } from '../content/store'
import './Toyota.css'
import './Benchmark.css'

/**
 * A case-study page built from src/content/pages/<slug>.json. Edit the content
 * with the dev editor (npm run dev → "Edit page"), or by hand in the JSON.
 */
export default function ProjectPage({ slug }) {
  const { theme, pages } = useContent()
  const editing = useEditMode()
  const page = pages[slug]
  if (!page) return null

  const css = buildStyleCss(theme, page.blocks)

  return (
    <div className={page.pageClass} data-page-slug={slug}>

      <Nav />

      {css && <style>{css}</style>}

      {page.blocks.map((block, i) => {
        const def = BLOCKS[block.type]
        if (!def) return null
        const path = ['pages', slug, 'blocks', i, 'props']
        const props = block.props ?? {}
        const text = (key, { rich = false, multiline = false, placeholder } = {}) => {
          if (!editing) {
            if (!props[key]) return undefined
            return rich ? <Editable value={props[key]} rich /> : props[key]
          }
          return (
            <Editable
              value={props[key]}
              path={[...path, key]}
              editing
              rich={rich}
              multiline={multiline}
              placeholder={placeholder}
            />
          )
        }
        return (
          <div key={block.id} data-block-id={block.id} data-block-type={block.type} style={{ display: 'contents' }}>
            {def.render(props, { text, path, editing })}
          </div>
        )
      })}

      <Footer />

    </div>
  )
}

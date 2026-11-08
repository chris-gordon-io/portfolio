import { contentStore } from '../content/store'

const escapeHtml = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Text that becomes click-to-edit in the dev editor. `path` locates the value
 * in the content store, e.g. ['pages', 'toyota', 'blocks', 3, 'props', 'heading'].
 *
 * rich   value is HTML (bold, italic, links) — otherwise it's plain text
 */
export default function Editable({ as: Tag = 'span', value = '', path, editing, rich = false, multiline = false, placeholder, className }) {
  const html = rich ? value : escapeHtml(value)

  if (!editing) {
    return rich
      ? <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
      : <Tag className={className}>{value}</Tag>
  }

  function commit(e) {
    const el = e.currentTarget
    const next = rich ? el.innerHTML.replace(/<br>$/, '').replace(/&nbsp;/g, ' ') : el.textContent
    if (next !== value) contentStore.commitEdit?.(path, next)
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !(multiline && e.shiftKey)) {
      e.preventDefault()
      e.currentTarget.blur()
    }
    if (e.key === 'Escape') {
      e.currentTarget.innerHTML = html
      e.currentTarget.blur()
    }
    // Keep typing (including ⌘B / ⌘I) away from the editor's own shortcuts
    e.stopPropagation()
  }

  function onPaste(e) {
    e.preventDefault()
    document.execCommand('insertText', false, e.clipboardData.getData('text/plain'))
  }

  return (
    <Tag
      className={className}
      contentEditable
      suppressContentEditableWarning
      data-editable=""
      data-placeholder={placeholder}
      onBlur={commit}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

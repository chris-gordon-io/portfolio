import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { contentStore, useEditMode } from '../content/store'
import { STYLE_TARGETS } from '../blocks/registry'
import { BLOCK_TYPES, STYLE_FIELDS } from './schema'
import { Fields, Row, SpaceInput, SizeInput, ColorInput } from './fields'
import { setIn, updateIn, move, newId } from './ops'
import './editor.css'

/**
 * Dev-only visual editor for the project pages (only loaded by `npm run dev`).
 *
 * - Click text on the page to edit it in place
 * - Select a block to edit its content and spacing, move, duplicate or delete it
 * - "Global" tab edits spacing for every block of a type, across all pages
 * - Save (⌘S) writes src/content/*.json; commit + push to deploy
 */

// ── History ────────────────────────────────────────────────────────────────

const history = { past: [], future: [], lastKey: null, lastAt: 0 }
let saved = contentStore.get()
const savedListeners = new Set()
const setSaved = s => { saved = s; savedListeners.forEach(l => l()) }
const useSaved = () => useSyncExternalStore(cb => { savedListeners.add(cb); return () => savedListeners.delete(cb) }, () => saved)
const useContentState = () => useSyncExternalStore(contentStore.subscribe, contentStore.get)

function apply(fn, coalesceKey = null) {
  const prev = contentStore.get()
  const next = fn(prev)
  if (next === prev) return
  const now = Date.now()
  const merge = coalesceKey && coalesceKey === history.lastKey && now - history.lastAt < 1200
  if (!merge) history.past.push(prev)
  if (history.past.length > 200) history.past.shift()
  history.future = []
  history.lastKey = coalesceKey
  history.lastAt = now
  contentStore.set(next)
}

function undo() {
  if (!history.past.length) return
  history.future.push(contentStore.get())
  history.lastKey = null
  contentStore.set(history.past.pop())
}

function redo() {
  if (!history.future.length) return
  history.past.push(contentStore.get())
  history.lastKey = null
  contentStore.set(history.future.pop())
}

contentStore.commitEdit = (path, value) => apply(s => setIn(s, path, value))

function dirtyParts(state) {
  const parts = { pages: {} }
  if (JSON.stringify(state.theme) !== JSON.stringify(saved.theme)) parts.theme = state.theme
  for (const [slug, page] of Object.entries(state.pages)) {
    if (JSON.stringify(page) !== JSON.stringify(saved.pages[slug])) parts.pages[slug] = page
  }
  return parts
}

const dirtyCount = parts => (parts.theme ? 1 : 0) + Object.keys(parts.pages).length

// ── Geometry helpers ───────────────────────────────────────────────────────

function blockEl(id) {
  return document.querySelector(`[data-page-slug] [data-block-id="${CSS.escape(id)}"]`)
}

function blockRect(id) {
  const el = id && blockEl(id)
  if (!el) return null
  let r = null
  for (const child of el.children) {
    const c = child.getBoundingClientRect()
    if (!c.width && !c.height) continue
    r = r
      ? { top: Math.min(r.top, c.top), left: Math.min(r.left, c.left), bottom: Math.max(r.bottom, c.bottom), right: Math.max(r.right, c.right) }
      : { top: c.top, left: c.left, bottom: c.bottom, right: c.right }
  }
  return r
}

function useFrame(active) {
  const [, setTick] = useState(0)
  useEffect(() => {
    if (!active) return
    let id
    const loop = () => { setTick(t => (t + 1) % 1e6); id = requestAnimationFrame(loop) }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [active])
}

// ── Editor ─────────────────────────────────────────────────────────────────

export default function Editor() {
  const location = useLocation()
  const editing = useEditMode()
  const state = useContentState()
  useSaved()
  const slugMatch = /^\/project\/([^/]+)\/?$/.exec(location.pathname)
  const slug = slugMatch && state.pages[slugMatch[1]] ? slugMatch[1] : null
  const page = slug ? state.pages[slug] : null

  // Selection is per page (block ids repeat across pages)
  const [selection, setSelection] = useState(null)
  const selected = selection?.slug === slug ? selection.id : null
  const setSelected = id => setSelection(id ? { slug, id } : null)
  const [hovered, setHovered] = useState(null)
  const [tab, setTab] = useState('block')
  const [insertAt, setInsertAt] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [undeployed, setUndeployed] = useState(null)

  const parts = dirtyParts(state)
  const dirty = dirtyCount(parts)

  const refreshStatus = useCallback(() => {
    fetch('/__editor/status').then(r => r.json()).then(d => setUndeployed(d.undeployed)).catch(() => {})
  }, [])
  useEffect(refreshStatus, [refreshStatus])

  useEffect(() => {
    document.body.classList.toggle('cge-editing', editing)
    return () => document.body.classList.remove('cge-editing')
  }, [editing])

  useEffect(() => {
    if (!slug && editing) contentStore.setEditMode(false)
  }, [slug, editing])

  const save = useCallback(async () => {
    const p = dirtyParts(contentStore.get())
    if (!dirtyCount(p)) return
    setSaving(true)
    try {
      const snapshot = contentStore.get()
      const res = await fetch('/__editor/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSaved(snapshot)
      setMessage({ kind: 'ok', text: 'Saved to src/content' })
      refreshStatus()
    } catch (err) {
      setMessage({ kind: 'error', text: `Save failed: ${err.message}` })
    } finally {
      setSaving(false)
    }
  }, [refreshStatus])

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(null), 3000)
    return () => clearTimeout(t)
  }, [message])

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      const mod = e.metaKey || e.ctrlKey
      const typing = e.target.closest?.('input, textarea, select, [contenteditable]')
      if (mod && e.key === 's') { e.preventDefault(); save(); return }
      if (typing) return
      if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
      else if (mod && (e.key === 'Z' || (e.key === 'z' && e.shiftKey) || e.key === 'y')) { e.preventDefault(); redo() }
      else if (e.key === 'Escape') setSelection(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [save])

  // Warn before closing the tab with unsaved edits
  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = e => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])

  // Hover + click selection on the page
  useEffect(() => {
    if (!editing) return
    const inUi = el => el.closest?.('.cge-ui')
    function onMove(e) {
      if (inUi(e.target)) return setHovered(null)
      setHovered(e.target.closest?.('[data-block-id]')?.dataset.blockId ?? null)
    }
    function onClick(e) {
      if (inUi(e.target)) return
      const block = e.target.closest?.('[data-block-id]')
      if (!block) return
      if (e.target.closest('a')) e.preventDefault()
      setSelection({ slug: block.closest('[data-page-slug]')?.dataset.pageSlug, id: block.dataset.blockId })
      setTab('block')
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick, true)
    }
  }, [editing])

  useFrame(editing)

  if (!slug) return null

  const blocks = page.blocks
  const index = blocks.findIndex(b => b.id === selected)
  const block = index >= 0 ? blocks[index] : null
  const blocksPath = ['pages', slug, 'blocks']

  const blockActions = {
    move: (i, to) => apply(s => updateIn(s, blocksPath, list => move(list, i, to))),
    duplicate: i => {
      const copy = { ...structuredClone(blocks[i]), id: newId() }
      apply(s => updateIn(s, blocksPath, list => [...list.slice(0, i + 1), copy, ...list.slice(i + 1)]))
      setSelected(copy.id)
    },
    remove: i => {
      apply(s => updateIn(s, blocksPath, list => list.filter((_, j) => j !== i)))
      setSelected(null)
    },
    insert: (type, at) => {
      const b = { id: newId(), type, props: structuredClone(BLOCK_TYPES[type].defaults) }
      apply(s => updateIn(s, blocksPath, list => [...list.slice(0, at), b, ...list.slice(at)]))
      setSelected(b.id)
      setTab('block')
      setInsertAt(null)
      requestAnimationFrame(() => requestAnimationFrame(() => blockEl(b.id)?.firstElementChild?.scrollIntoView({ block: 'center' })))
    },
  }

  const openAdd = at => { setInsertAt(at); setTab('add') }

  return createPortal(
    <>
      {editing && <Overlay hovered={hovered !== selected ? hovered : null} selected={selected} block={block} index={index} count={blocks.length} actions={blockActions} onAdd={openAdd} />}

      <div className="cge-ui cge-bar" data-lenis-prevent>
        <button type="button" className={`cge-btn${editing ? ' is-on' : ''}`} onClick={() => { setSelection(null); setHovered(null); contentStore.setEditMode(!editing) }}>
          {editing ? 'Done' : 'Edit page'}
        </button>
        {(editing || dirty > 0) && (
          <>
            <span className="cge-sep" />
            <button type="button" className="cge-icon-btn" onClick={undo} disabled={!history.past.length} title="Undo (⌘Z)">↶</button>
            <button type="button" className="cge-icon-btn" onClick={redo} disabled={!history.future.length} title="Redo (⌘⇧Z)">↷</button>
            <button type="button" className="cge-btn cge-btn--primary" onClick={save} disabled={!dirty || saving} title="Save (⌘S)">
              {saving ? 'Saving…' : dirty ? 'Save' : 'Saved'}
            </button>
          </>
        )}
        <span className="cge-status">
          {message ? <span className={`cge-msg cge-msg--${message.kind}`}>{message.text}</span>
            : dirty ? `${dirty} unsaved ${dirty === 1 ? 'file' : 'files'}`
            : undeployed?.length ? <span title={undeployed.join('\n')}>{undeployed.length} saved {undeployed.length === 1 ? 'change' : 'changes'} not deployed yet</span>
            : 'Up to date'}
        </span>
      </div>

      {editing && (
        <aside className="cge-ui cge-panel" data-lenis-prevent>
          <div className="cge-tabs">
            {[['block', 'Block'], ['global', 'Global styles'], ['add', 'Add']].map(([k, label]) => (
              <button key={k} type="button" className={`cge-tab${tab === k ? ' is-on' : ''}`} onClick={() => { setTab(k); if (k === 'add') setInsertAt(null) }}>
                {label}
              </button>
            ))}
          </div>
          <div className="cge-panel-body">
            {tab === 'block' && (
              block
                ? <BlockPanel key={block.id} slug={slug} block={block} index={index} count={blocks.length} actions={blockActions} />
                : <Outline blocks={blocks} onSelect={id => { setSelected(id); blockEl(id)?.firstElementChild?.scrollIntoView({ block: 'center' }) }} onAdd={openAdd} />
            )}
            {tab === 'global' && <GlobalPanel theme={state.theme} initialType={block?.type} blocks={blocks} />}
            {tab === 'add' && (
              <AddPanel
                at={insertAt ?? (index >= 0 ? index + 1 : defaultInsertIndex(blocks))}
                blocks={blocks}
                onInsert={blockActions.insert}
              />
            )}
          </div>
        </aside>
      )}
    </>,
    document.body
  )
}

// New blocks go above the back button by default
const defaultInsertIndex = blocks => {
  const back = blocks.findIndex(b => b.type === 'BackButton')
  return back >= 0 ? back : blocks.length
}

// ── Page overlay ───────────────────────────────────────────────────────────

function Overlay({ hovered, selected, block, index, count, actions, onAdd }) {
  const hr = blockRect(hovered)
  const sr = blockRect(selected)
  const box = r => ({ top: r.top, left: r.left, width: r.right - r.left, height: r.bottom - r.top })
  return (
    <>
      {hr && (
        <div className="cge-outline cge-outline--hover" style={box(hr)}>
          <span className="cge-outline-tag">{BLOCK_TYPES[blockEl(hovered)?.dataset.blockType]?.label}</span>
        </div>
      )}
      {sr && block && (
        <div className="cge-outline cge-outline--selected" style={box(sr)}>
          <div className="cge-ui cge-outline-bar" style={sr.top < 44 ? { top: 6 } : undefined}>
            <span className="cge-outline-name">{BLOCK_TYPES[block.type]?.label}</span>
            <button type="button" className="cge-icon-btn" disabled={index === 0} onClick={() => actions.move(index, index - 1)} title="Move up">↑</button>
            <button type="button" className="cge-icon-btn" disabled={index === count - 1} onClick={() => actions.move(index, index + 1)} title="Move down">↓</button>
            <button type="button" className="cge-icon-btn" onClick={() => actions.duplicate(index)} title="Duplicate">⧉</button>
            <button type="button" className="cge-icon-btn cge-danger" onClick={() => actions.remove(index)} title="Delete">🗑</button>
          </div>
          <button type="button" className="cge-ui cge-insert" onClick={() => onAdd(index + 1)} title="Add a block below">+</button>
        </div>
      )}
    </>
  )
}

// ── Panels ─────────────────────────────────────────────────────────────────

function Outline({ blocks, onSelect, onAdd }) {
  return (
    <div>
      <p className="cge-help">Click a block on the page (or below) to edit it. Click any text on the page to type straight into it.</p>
      <div className="cge-outline-list">
        {blocks.map((b, i) => (
          <button key={b.id} type="button" className="cge-outline-item" onClick={() => onSelect(b.id)}>
            <span className="cge-outline-num">{i + 1}</span>
            <span className="cge-outline-type">{BLOCK_TYPES[b.type]?.label ?? b.type}</span>
            <span className="cge-outline-sub">{summary(b)}</span>
          </button>
        ))}
      </div>
      <button type="button" className="cge-add-btn" onClick={() => onAdd(defaultInsertIndex(blocks))}>+ Add a block</button>
    </div>
  )
}

const strip = s => String(s ?? '').replace(/<[^>]+>/g, '')
const summary = b => strip(b.props?.heading || b.props?.eyebrow || b.props?.title || b.props?.caption || b.props?.text || '')

function BlockPanel({ slug, block, index, count, actions }) {
  const def = BLOCK_TYPES[block.type]
  const base = ['pages', slug, 'blocks', index]
  const [section, setSection] = useState('content')
  return (
    <div>
      <div className="cge-panel-title">
        <div>
          <div className="cge-title">{def?.label ?? block.type}</div>
          <div className="cge-help">{def?.description}</div>
        </div>
        <div className="cge-item-controls">
          <button type="button" className="cge-icon-btn" disabled={index === 0} onClick={() => actions.move(index, index - 1)} title="Move up">↑</button>
          <button type="button" className="cge-icon-btn" disabled={index === count - 1} onClick={() => actions.move(index, index + 1)} title="Move down">↓</button>
          <button type="button" className="cge-icon-btn" onClick={() => actions.duplicate(index)} title="Duplicate">⧉</button>
          <button type="button" className="cge-icon-btn cge-danger" onClick={() => actions.remove(index)} title="Delete">🗑</button>
        </div>
      </div>

      <div className="cge-seg">
        <button type="button" className={section === 'content' ? 'is-on' : ''} onClick={() => setSection('content')}>Content</button>
        <button type="button" className={section === 'spacing' ? 'is-on' : ''} onClick={() => setSection('spacing')}>Spacing &amp; style</button>
      </div>

      {section === 'content' && (
        def?.fields.length
          ? <Fields
              fields={def.fields}
              value={block.props}
              idPrefix={block.id}
              onChange={(next, key) => apply(s => setIn(s, [...base, 'props'], next), key)}
            />
          : <p className="cge-help">This block has no content to edit.</p>
      )}

      {section === 'spacing' && (
        <>
          <p className="cge-help">Only this block. To change every {def?.label} block at once, use <strong>Global styles</strong>.</p>
          <StyleFields
            type={block.type}
            values={block.style ?? {}}
            scope={`[data-block-id="${block.id}"]`}
            onChange={(key, v, merge) => apply(s => setIn(s, [...base, 'style', key], v === '' ? undefined : v), merge ? `${block.id}.style.${key}` : null)}
          />
        </>
      )}
    </div>
  )
}

function GlobalPanel({ theme, initialType, blocks }) {
  const types = Object.keys(STYLE_TARGETS)
  const [type, setType] = useState(initialType && STYLE_TARGETS[initialType] ? initialType : 'Text')
  const onPage = blocks.filter(b => b.type === type).length
  return (
    <div>
      <p className="cge-help">Changes here apply to every block of this type on every project page. Per-block spacing still overrides them.</p>
      <Row label="Component">
        <select className="cge-select cge-select--full" value={type} onChange={e => setType(e.target.value)}>
          {types.map(t => <option key={t} value={t}>{BLOCK_TYPES[t]?.label ?? t}</option>)}
        </select>
      </Row>
      <p className="cge-help">{onPage ? `${onPage} on this page.` : 'None on this page, so the preview won’t change here.'}</p>
      <StyleFields
        key={type}
        type={type}
        values={theme.components?.[type] ?? {}}
        scope={`[data-block-type="${type}"]`}
        onChange={(key, v, merge) => apply(s => setIn(s, ['theme', 'components', type, key], v === '' ? undefined : v), merge ? `theme.${type}.${key}` : null)}
      />
    </div>
  )
}

function StyleFields({ type, values, scope, onChange }) {
  const targets = STYLE_TARGETS[type] ?? {}
  const keys = Object.keys(targets)
  if (!keys.length) return <p className="cge-help">Nothing to adjust on this block.</p>
  return keys.map(key => {
    const f = STYLE_FIELDS[key]
    const t = targets[key]
    const value = values[key] ?? ''
    const current = computedValue(scope, t)
    const Input = f.kind === 'space' ? SpaceInput : f.kind === 'size' ? SizeInput : ColorInput
    return (
      <Row
        key={key}
        label={<>{f.label}{f.note && <span className="cge-note"> · {f.note}</span>}</>}
        aside={value !== '' && <button type="button" className="cge-reset" onClick={() => onChange(key, '', false)}>Reset</button>}
      >
        <Input value={value} current={current} onChange={(v, merge = true) => onChange(key, v, merge)} />
      </Row>
    )
  })
}

const CSS_PROP_FOR_READ = {
  'padding-inline': 'padding-left',
  'padding-block': 'padding-top',
}

function computedValue(scope, target) {
  const el = document.querySelector(`[data-page-slug] ${scope} ${target.sel}`)
  if (!el) return null
  const v = getComputedStyle(el).getPropertyValue(CSS_PROP_FOR_READ[target.prop] ?? target.prop).trim()
  if (target.prop === 'background') return getComputedStyle(el).backgroundColor
  return v ? v.replace(/(\d+\.\d)\d+px/g, '$1px') : null
}

function AddPanel({ at, blocks, onInsert }) {
  const after = blocks[at - 1]
  return (
    <div>
      <p className="cge-help">
        {after ? <>Adds below <strong>{BLOCK_TYPES[after.type]?.label}</strong>{summary(after) && <> “{summary(after).slice(0, 40)}”</>}.</> : 'Adds at the top of the page.'}
      </p>
      <div className="cge-add-grid">
        {Object.entries(BLOCK_TYPES).map(([type, def]) => (
          <button key={type} type="button" className="cge-add-card" onClick={() => onInsert(type, at)}>
            <span className="cge-add-name">{def.label}</span>
            <span className="cge-add-desc">{def.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

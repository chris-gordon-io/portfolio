import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const AVAILABLE = [
  'Title', 'Hero', 'Topline', 'Impact', 'Hypothesis',
  'Callout', 'Text', 'Image', 'Metrics', 'Back Button',
]


export default function DevPanel() {
  if (!import.meta.env.DEV) return null
  return <Panel />
}

function Panel() {
  const location = useLocation()
  const [items, setItems] = useState([])
  const [dragOver, setDragOver] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [visible, setVisible] = useState(true)
  const [editingUid, setEditingUid] = useState(null)
  const dragSrc = useRef(null)

  function storageKey(pathname, name, index) {
    return `dev:${pathname}:${name}:${index}`
  }

  function saveEdits(pathname, els) {
    // group by name to get stable index
    const counts = {}
    els.forEach(el => {
      const name = el.getAttribute('data-dev-component')
      const idx = counts[name] ?? 0
      counts[name] = idx + 1
      localStorage.setItem(storageKey(pathname, name, idx), el.innerHTML)
    })
  }

  function restoreEdits(pathname, els) {
    const counts = {}
    els.forEach(el => {
      const name = el.getAttribute('data-dev-component')
      const idx = counts[name] ?? 0
      counts[name] = idx + 1
      const saved = localStorage.getItem(storageKey(pathname, name, idx))
      if (saved) el.innerHTML = saved
    })
  }

  const scan = useCallback(() => {
    const els = Array.from(document.querySelectorAll('[data-dev-component]'))
    els.forEach(el => {
      if (!el.dataset.devUid) {
        el.dataset.devUid = Math.random().toString(36).slice(2)
      }
    })
    restoreEdits(location.pathname, els)
    setItems(els.map(el => ({
      label: el.getAttribute('data-dev-component'),
      el,
      uid: el.dataset.devUid,
    })))
  }, [location.pathname])

  useEffect(() => {
    const t = setTimeout(scan, 50)
    return () => clearTimeout(t)
  }, [scan, location.pathname])

  // Turn edit mode on/off for a component
  function toggleEdit(item) {
    if (editingUid === item.uid) {
      item.el.removeAttribute('contenteditable')
      item.el.style.outline = ''
      item.el.style.cursor = ''
      if (item.el._pasteHandler) {
        item.el.removeEventListener('paste', item.el._pasteHandler)
        delete item.el._pasteHandler
      }
      // persist all current content
      const els = Array.from(document.querySelectorAll('[data-dev-component]'))
      saveEdits(location.pathname, els)
      setEditingUid(null)
    } else {
      // turn off previous
      if (editingUid) {
        const prev = items.find(x => x.uid === editingUid)
        if (prev) {
          prev.el.removeAttribute('contenteditable')
          prev.el.style.outline = ''
          prev.el.style.cursor = ''
          if (prev.el._pasteHandler) {
            prev.el.removeEventListener('paste', prev.el._pasteHandler)
            delete prev.el._pasteHandler
          }
        }
      }
      item.el.setAttribute('contenteditable', 'true')
      item.el.style.outline = '1.5px dashed #F4691A'
      item.el.style.outlineOffset = '4px'
      item.el.style.cursor = 'text'
      item.el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // strip formatting on paste — insert plain text only
      const pasteHandler = e => {
        e.preventDefault()
        const text = e.clipboardData.getData('text/plain')
        document.execCommand('insertText', false, text)
      }
      item.el.addEventListener('paste', pasteHandler)
      item.el._pasteHandler = pasteHandler
      // focus first text node
      const first = item.el.querySelector('p, h1, h2, h3, div')
      first?.focus()
      setEditingUid(item.uid)
    }
  }

  function handleDragStart(i) {
    dragSrc.current = i
  }

  function handleDrop(i) {
    if (dragSrc.current === null || dragSrc.current === i) return
    const src = items[dragSrc.current]
    const target = items[i]
    if (src.el.parentNode !== target.el.parentNode) {
      const srcNode = src.el.closest('.pc-intro-wrapper') || src.el
      const targetNode = target.el.closest('.pc-intro-wrapper') || target.el
      if (dragSrc.current < i) {
        targetNode.parentNode?.insertBefore(srcNode, targetNode.nextSibling)
      } else {
        targetNode.parentNode?.insertBefore(srcNode, targetNode)
      }
    } else {
      if (dragSrc.current < i) {
        target.el.parentNode.insertBefore(src.el, target.el.nextSibling)
      } else {
        target.el.parentNode.insertBefore(src.el, target.el)
      }
    }
    dragSrc.current = null
    setDragOver(null)
    scan()
  }

  function handleDelete(i) {
    const el = items[i].el
    if (editingUid === items[i].uid) setEditingUid(null)
    ;(el.closest('.pc-intro-wrapper') || el).remove()
    scan()
  }

  function scrollTo(el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.style.outline = '2px solid #F4691A'
    el.style.outlineOffset = '4px'
    setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = '' }, 1500)
  }

  function addPlaceholder(name) {
    const div = document.createElement('div')
    div.setAttribute('data-dev-component', name)

    const templates = {
      'Title': `
        <div class="pc-title-block">
          <h1 class="pc-title">Project title</h1>
          <p class="pc-subtitle">Sub line information</p>
        </div>`,
      'Topline': `
        <div class="pc-topline-section">
          <div class="pc-topline-container">
            <div class="pc-topline-inner">
              <p class="pc-topline-eyebrow">Topline</p>
              <div class="pc-topline-headline">How I identified a larger problem and created a holistic solution.</div>
            </div>
          </div>
        </div>`,
      'Impact': `
        <div class="pc-impact-section">
          <div class="pc-impact-container">
            <div class="pc-topline-inner">
              <p class="pc-impact-eyebrow">Impact</p>
              <div class="pc-impact-headline">A meaningful outcome that changed how users experience the product.</div>
            </div>
          </div>
        </div>`,
      'Hypothesis': `
        <div class="pc-section pc-section--slim">
          <div class="pc-hypothesis">
            <p class="pc-hypothesis-label">Hypothesis</p>
            <p class="pc-hypothesis-text">We believe that if we do X, users will experience Y, resulting in Z.</p>
          </div>
        </div>`,
      'Callout': `
        <div class="pc-section">
          <div class="pc-callout">
            <p class="pc-callout-eyebrow">About</p>
            <div class="pc-callout-body">
              <p>Add context here — background, constraints, or the setup for this piece of work.</p>
              <p>A second paragraph with supporting detail or framing of the challenge.</p>
            </div>
          </div>
        </div>`,
      'Text': `
        <div class="pc-section">
          <div class="pc-content-block">
            <div class="pc-col-heading">
              <h2 class="pc-heading">Section heading</h2>
            </div>
            <div class="pc-col-body">
              <p class="pc-body">Add your body copy here — context, explanation, or supporting detail for this section of the case study.</p>
              <p class="pc-body">A second paragraph. You can add as much content as needed.</p>
            </div>
          </div>
        </div>`,
      'Metrics': `
        <div class="pc-metrics-section">
          <div class="pc-metrics-block">
            <div class="pc-content-block">
              <div class="pc-col-heading"><h2 class="pc-heading muted">Results</h2></div>
              <div class="pc-col-body">
                <p class="pc-body light">Each change had a measurable positive impact.</p>
                <div class="pc-stat-cards">
                  <div class="pc-stat-card"><span class="pc-stat-number">+0.0%</span><span class="pc-stat-label">Metric label</span></div>
                  <div class="pc-stat-card"><span class="pc-stat-number">+0.0%</span><span class="pc-stat-label">Metric label</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>`,
      'Back Button': `
        <div class="pb-wrapper">
          <a href="/" class="pb-button">
            <span class="pb-button-text">See all work</span>
            <svg class="pb-button-arrow" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="2" y1="8" x2="14" y2="8" stroke="#23233B" stroke-width="1.5" stroke-linecap="round"/>
              <polyline points="9,4 14,8 9,12" fill="none" stroke="#23233B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>`,
    }

    div.innerHTML = templates[name] || `<div style="padding:40px;text-align:center;color:#999">[${name}]</div>`

    const last = items[items.length - 1]?.el
    if (last) last.parentNode.insertBefore(div, last.nextSibling)
    else document.body.appendChild(div)
    setShowAdd(false)
    scan()
  }

  // ── collapsed toggle ──────────────────────────────────────────
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
          zIndex: 9999, background: '#23233B', color: '#fff',
          border: 'none', borderRadius: 8, padding: '8px 10px',
          cursor: 'pointer', fontSize: 12, fontFamily: 'system-ui, sans-serif',
        }}
      >⊞</button>
    )
  }

  // ── panel ────────────────────────────────────────────────────
  return (
    <div style={{
      position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
      zIndex: 9999, background: '#fff', borderRadius: 14, padding: '10px 6px',
      boxShadow: '0 4px 32px rgba(0,0,0,0.14)', width: 210,
      fontFamily: 'system-ui, sans-serif', fontSize: 12,
      maxHeight: '80vh', display: 'flex', flexDirection: 'column',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 8px', borderBottom: '1px solid #f0f0f0', marginBottom: 6 }}>
        <span style={{ fontWeight: 600, fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Dev · Components</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button
            onClick={() => {
              Object.keys(localStorage).filter(k => k.startsWith(`dev:${location.pathname}`)).forEach(k => localStorage.removeItem(k))
              window.location.reload()
            }}
            title="Clear saved edits"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', fontSize: 10, padding: 0 }}
          >reset</button>
          <button onClick={() => setVisible(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
        </div>
      </div>

      {/* List */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {items.length === 0 && (
          <p style={{ color: '#bbb', textAlign: 'center', padding: '12px 8px', margin: 0 }}>No components found</p>
        )}
        {items.map((item, i) => {
          const isEditing = editingUid === item.uid
          return (
            <div
              key={item.uid}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={e => { e.preventDefault(); setDragOver(i) }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => handleDrop(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '5px 6px', borderRadius: 8, cursor: 'grab',
                background: isEditing ? '#fff8f4' : dragOver === i ? '#f5f5f5' : 'transparent',
                borderTop: dragOver === i ? '2px solid #F4691A' : '2px solid transparent',
                transition: 'background 0.1s',
              }}
            >
              <span style={{ color: '#ccc', fontSize: 10, userSelect: 'none', flexShrink: 0 }}>⠿</span>

              <span
                onClick={() => scrollTo(item.el)}
                style={{ flex: 1, color: '#23233B', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', userSelect: 'none', fontSize: 12 }}
                title={item.label}
              >
                {item.label}
              </span>

              {/* Edit toggle */}
              <button
                onClick={() => toggleEdit(item)}
                title={isEditing ? 'Done editing' : 'Edit content'}
                style={{
                  background: isEditing ? '#F4691A' : 'none',
                  border: isEditing ? 'none' : '1px solid #e0e0e0',
                  borderRadius: 4, cursor: 'pointer',
                  color: isEditing ? '#fff' : '#aaa',
                  fontSize: 10, lineHeight: 1, padding: '2px 4px', flexShrink: 0,
                }}
              >
                {isEditing ? 'done' : '✏'}
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(i)}
                title="Remove"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ddd', fontSize: 14, lineHeight: 1, padding: 0, flexShrink: 0 }}
              >×</button>
            </div>
          )
        })}
      </div>

      {/* Add */}
      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 6, marginTop: 6 }}>
        {showAdd ? (
          <div>
            {AVAILABLE.map(name => (
              <button
                key={name}
                onClick={() => addPlaceholder(name)}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '5px 8px', borderRadius: 6, color: '#23233B', fontSize: 12 }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >+ {name}</button>
            ))}
            <button onClick={() => setShowAdd(false)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '5px 8px', color: '#bbb', fontSize: 12 }}>Cancel</button>
          </div>
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 8px', borderRadius: 8, color: '#888', fontSize: 12 }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add component
          </button>
        )}
      </div>
    </div>
  )
}

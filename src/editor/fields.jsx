import { useRef, useState } from 'react'
import { HERO_BACKGROUNDS, SPACE_TOKENS } from './schema'
import { move } from './ops'

const clean = (obj, key, v) => {
  const next = { ...obj }
  if (v === '' || v === false || v == null) delete next[key]
  else next[key] = v
  return next
}

/**
 * Renders a list of field definitions against one object.
 * onChange(nextObject, coalesceKey) — typing in the same field merges into one undo step.
 */
export function Fields({ fields, value = {}, onChange, idPrefix }) {
  return fields.map(f => {
    const v = f.key ? value?.[f.key] : value
    const set = (nv, merge = true) =>
      onChange(f.key ? clean(value ?? {}, f.key, nv) : nv, merge ? `${idPrefix}.${f.key}` : null)
    return <Field key={f.key || f.type} field={f} value={v} onChange={set} idPrefix={`${idPrefix}.${f.key}`} />
  })
}

function Field({ field, value, onChange, idPrefix }) {
  switch (field.type) {
    case 'text':
      return (
        <Row label={field.label}>
          <input className="cge-input" value={value ?? ''} placeholder={field.placeholder} onChange={e => onChange(e.target.value)} />
        </Row>
      )
    case 'textarea':
    case 'richtext':
      return (
        <Row label={field.label} hint={field.type === 'richtext' ? 'HTML allowed: <strong>, <em>, <a>' : null}>
          <AutoTextarea value={value ?? ''} onChange={onChange} />
        </Row>
      )
    case 'toggle':
      return (
        <label className="cge-toggle">
          <input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked, false)} />
          <span>{field.label}</span>
        </label>
      )
    case 'background':
      return <BackgroundField label={field.label} value={value} onChange={onChange} />
    case 'image':
      return <ImageField label={field.label} value={value} onChange={onChange} />
    case 'body':
      return <BodyField label={field.label} value={value ?? []} onChange={onChange} plainDefault={field.plainDefault} />
    case 'list':
      return <ListField field={field} value={value ?? []} onChange={onChange} idPrefix={idPrefix} />
    case 'slots':
      return <SlotsField field={field} value={value ?? []} onChange={onChange} idPrefix={idPrefix} />
    default:
      return null
  }
}

export function Row({ label, hint, children, aside }) {
  return (
    <div className="cge-row">
      <div className="cge-row-head">
        <span className="cge-label">{label}</span>
        {aside}
      </div>
      {children}
      {hint && <div className="cge-hint">{hint}</div>}
    </div>
  )
}

function AutoTextarea({ value, onChange, className = 'cge-input cge-textarea', rows = 3 }) {
  return <textarea className={className} rows={rows} value={value} onChange={e => onChange(e.target.value)} />
}

function BackgroundField({ label, value, onChange }) {
  return (
    <Row label={label}>
      <div className="cge-swatches">
        {HERO_BACKGROUNDS.map(b => (
          <button
            key={b.name}
            type="button"
            title={b.name}
            className={`cge-swatch${value === b.value ? ' is-on' : ''}`}
            style={{ background: b.value }}
            onClick={() => onChange(b.value, false)}
          />
        ))}
      </div>
      <input className="cge-input cge-mono" value={value ?? ''} placeholder="Any CSS colour or gradient" onChange={e => onChange(e.target.value)} />
    </Row>
  )
}

async function upload(file) {
  const res = await fetch(`/__editor/upload?name=${encodeURIComponent(file.name)}`, { method: 'POST', body: file })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data.src
}

function ImageField({ label, value, onChange }) {
  const img = value ?? {}
  const input = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [over, setOver] = useState(false)

  async function handleFile(file) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const src = await upload(file)
      onChange({ ...img, src, alt: img.alt || file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') }, false)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Row label={label}>
      <div
        className={`cge-image${over ? ' is-over' : ''}`}
        onDragOver={e => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={e => { e.preventDefault(); setOver(false); handleFile(e.dataTransfer.files[0]) }}
        onClick={() => input.current?.click()}
      >
        {img.src ? <img src={img.src} alt="" /> : <span>{busy ? 'Uploading…' : 'Drop an image or click to upload'}</span>}
        <input ref={input} type="file" accept="image/*" hidden onChange={e => handleFile(e.target.files[0])} />
      </div>
      {error && <div className="cge-error">{error}</div>}
      <input className="cge-input cge-mono" value={img.src ?? ''} placeholder="/images/… or https://…" onChange={e => onChange({ ...img, src: e.target.value })} />
      <input className="cge-input" value={img.alt ?? ''} placeholder="Alt text (describe the image)" onChange={e => onChange({ ...img, alt: e.target.value })} />
    </Row>
  )
}

const PARA_STYLES = [
  { value: 'body-large', label: 'Large' },
  { value: 'body', label: 'Body' },
  { value: 'body-small', label: 'Small' },
  { value: 'plain', label: 'Plain' },
]

function ItemControls({ i, count, onMove, onRemove }) {
  return (
    <div className="cge-item-controls">
      <button type="button" className="cge-icon-btn" disabled={i === 0} onClick={() => onMove(i, i - 1)} title="Move up">↑</button>
      <button type="button" className="cge-icon-btn" disabled={i === count - 1} onClick={() => onMove(i, i + 1)} title="Move down">↓</button>
      <button type="button" className="cge-icon-btn" onClick={() => onRemove(i)} title="Remove">×</button>
    </div>
  )
}

function BodyField({ label, value, onChange, plainDefault }) {
  const setItem = (i, item, merge = true) => onChange(value.map((x, j) => (j === i ? item : x)), merge)
  const remove = i => onChange(value.filter((_, j) => j !== i), false)
  const moveItem = (a, b) => onChange(move(value, a, b), false)
  const add = () => onChange([...value, { style: plainDefault ? 'plain' : 'body', html: '' }], false)

  return (
    <Row label={label} hint="Tip: you can also click any paragraph on the page and type.">
      <div className="cge-list">
        {value.map((item, i) => (
          <div key={i} className={`cge-para${item.tight ? ' is-tight' : ''}`}>
            <div className="cge-para-head">
              <select className="cge-select" value={item.style} onChange={e => setItem(i, { ...item, style: e.target.value }, false)}>
                {PARA_STYLES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              {i > 0 && (
                <label className="cge-mini-toggle" title="No gap above: groups this line with the one before (lists, sub-lines)">
                  <input type="checkbox" checked={!!item.tight} onChange={e => setItem(i, clean(item, 'tight', e.target.checked), false)} />
                  Join above
                </label>
              )}
              <ItemControls i={i} count={value.length} onMove={moveItem} onRemove={remove} />
            </div>
            <AutoTextarea value={item.html} rows={2} onChange={html => setItem(i, { ...item, html })} />
          </div>
        ))}
        <button type="button" className="cge-add-btn" onClick={add}>+ Add paragraph</button>
      </div>
    </Row>
  )
}

function ListField({ field, value, onChange, idPrefix }) {
  const remove = i => onChange(value.filter((_, j) => j !== i), false)
  const moveItem = (a, b) => onChange(move(value, a, b), false)
  return (
    <Row label={field.label}>
      <div className="cge-list">
        {value.map((item, i) => (
          <div key={i} className="cge-card">
            <div className="cge-para-head">
              <span className="cge-card-title">{field.itemLabel} {i + 1}</span>
              <ItemControls i={i} count={value.length} onMove={moveItem} onRemove={remove} />
            </div>
            <Fields
              fields={field.fields}
              value={item}
              idPrefix={`${idPrefix}.${i}`}
              onChange={(next, key) => onChange(value.map((x, j) => (j === i ? next : x)), key)}
            />
          </div>
        ))}
        <button type="button" className="cge-add-btn" onClick={() => onChange([...value, { ...field.newItem }], false)}>
          + Add {field.itemLabel.toLowerCase()}
        </button>
      </div>
    </Row>
  )
}

function SlotsField({ field, value, onChange, idPrefix }) {
  return (
    <Row label={field.label}>
      <div className="cge-list">
        {field.slots.map((slot, i) => (
          <div key={slot} className="cge-card">
            <span className="cge-card-title">{slot}</span>
            <Fields
              fields={field.fields}
              value={value[i] ?? {}}
              idPrefix={`${idPrefix}.${i}`}
              onChange={(next, key) => {
                const copy = field.slots.map((_, j) => value[j] ?? {})
                copy[i] = next
                onChange(copy, key)
              }}
            />
          </div>
        ))}
      </div>
    </Row>
  )
}

// ── Style inputs ──────────────────────────────────────────────────────────

const pxOf = v => {
  const token = SPACE_TOKENS.find(t => t.value === v)
  if (token) return token.px
  const m = /^(-?[\d.]+)px$/.exec(v ?? '')
  return m ? Number(m[1]) : null
}

export function SpaceInput({ value, onChange, current }) {
  const px = pxOf(value)
  return (
    <div className="cge-space">
      <div className="cge-chips">
        {SPACE_TOKENS.map(t => (
          <button
            key={t.label}
            type="button"
            title={`${t.px}px`}
            className={`cge-chip${value === t.value ? ' is-on' : ''}`}
            onClick={() => onChange(t.value, false)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="cge-num">
        <input
          type="number"
          className="cge-input"
          value={px ?? ''}
          placeholder={current ?? ''}
          step={4}
          onChange={e => onChange(e.target.value === '' ? '' : `${e.target.value}px`)}
        />
        <span>px</span>
      </div>
    </div>
  )
}

export function SizeInput({ value, onChange, current }) {
  const m = /^(-?[\d.]+)(px|vh|%)$/.exec(value ?? '')
  const num = m ? m[1] : ''
  const unit = m ? m[2] : 'px'
  return (
    <div className="cge-num cge-num--wide">
      <input
        type="number"
        className="cge-input"
        value={num}
        placeholder={current ?? ''}
        onChange={e => onChange(e.target.value === '' ? '' : `${e.target.value}${unit}`)}
      />
      <select className="cge-select" value={unit} onChange={e => num !== '' && onChange(`${num}${e.target.value}`, false)}>
        <option value="px">px</option>
        <option value="vh">vh</option>
        <option value="%">%</option>
      </select>
    </div>
  )
}

const toHex = v => (/^#[0-9a-f]{6}$/i.test(v ?? '') ? v : '#ffffff')

export function ColorInput({ value, onChange, current }) {
  return (
    <div className="cge-num cge-num--wide">
      <input type="color" className="cge-color" value={toHex(value)} onChange={e => onChange(e.target.value)} />
      <input className="cge-input cge-mono" value={value ?? ''} placeholder={current ?? ''} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

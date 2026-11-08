// Immutable helpers for editing the content tree

export function getIn(obj, path) {
  return path.reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

/** Returns a copy of obj with value at path. undefined removes the key. */
export function setIn(obj, path, value) {
  if (!path.length) return value
  const [k, ...rest] = path
  const base = obj ?? (typeof k === 'number' ? [] : {})
  const copy = Array.isArray(base) ? [...base] : { ...base }
  const next = setIn(base[k], rest, value)
  if (next === undefined && !Array.isArray(copy)) delete copy[k]
  else copy[k] = next
  return copy
}

export function updateIn(obj, path, fn) {
  return setIn(obj, path, fn(getIn(obj, path)))
}

export function move(list, from, to) {
  if (to < 0 || to >= list.length) return list
  const copy = [...list]
  const [item] = copy.splice(from, 1)
  copy.splice(to, 0, item)
  return copy
}

export const newId = () => 'b' + Math.random().toString(36).slice(2, 8)

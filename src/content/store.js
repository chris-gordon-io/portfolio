import { useSyncExternalStore } from 'react'
import theme from './theme.json'

/**
 * Site content: global component styles (theme.json) plus one JSON file per
 * project page in ./pages. In production this is static. In dev the editor
 * (src/editor) swaps in edited copies and writes them back to disk on save.
 */
const pageModules = import.meta.glob('./pages/*.json', { eager: true, import: 'default' })

function loadPages(modules) {
  return Object.fromEntries(
    Object.entries(modules).map(([path, data]) => [path.match(/([^/]+)\.json$/)[1], data])
  )
}

let state = { theme, pages: loadPages(pageModules) }
let editMode = false
const listeners = new Set()

function emit() {
  listeners.forEach(l => l())
}

export const contentStore = {
  get: () => state,
  set(next) {
    state = next
    emit()
  },
  getEditMode: () => editMode,
  setEditMode(next) {
    editMode = next
    emit()
  },
  subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  // Set by the editor: called when inline text on the page is edited (path, html)
  commitEdit: null,
}

export function useContent() {
  return useSyncExternalStore(contentStore.subscribe, contentStore.get)
}

export function useEditMode() {
  return useSyncExternalStore(contentStore.subscribe, contentStore.getEditMode)
}

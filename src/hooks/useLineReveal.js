import { useLayoutEffect, useRef } from 'react'

const STAGGER = 110 // ms between lines
const TAIL = 1200   // ms for the last line's transition to finish

/**
 * Animates a block of text in line by line instead of as one block.
 *
 * Words (and unbreakable chip groups) are marked with `.hx-unit`. Once laid out
 * we group the units by the line they landed on, give each a `--line` index, and
 * CSS staggers the transition by that index. Wrapping is measured from the real
 * layout, so it follows the viewport width and the webfont once it loads.
 *
 * States on the container: is-measuring (hidden until the first measure),
 * is-split (units hidden), is-revealed (units animate in), is-done (transitions
 * off again so hover styles aren't affected).
 */
export function useLineReveal() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.remove('is-measuring')
      el.classList.add('is-done')
      return
    }

    let maxLine = 0
    let started = false
    let doneTimer

    function assignLines() {
      const units = [...el.querySelectorAll('.hx-unit')]
      if (!units.length) return
      const h1 = el.querySelector('h1') || el
      const lineH = parseFloat(getComputedStyle(h1).lineHeight) || 40
      let line = -1
      let refCentre = null
      for (const u of units) {
        const r = u.getBoundingClientRect()
        const centre = r.top + r.height / 2
        // a unit starts a new line once it sits clearly below the line's first unit
        if (refCentre === null || centre - refCentre > lineH * 0.5) {
          line += 1
          refCentre = centre
        }
        u.style.setProperty('--line', line)
      }
      maxLine = line
    }

    function start() {
      assignLines()
      el.classList.add('is-split')
      el.classList.remove('is-measuring')
      void el.offsetWidth // commit the hidden state before animating
      requestAnimationFrame(() => {
        el.classList.add('is-revealed')
        started = true
        doneTimer = setTimeout(() => el.classList.add('is-done'), maxLine * STAGGER + TAIL)
      })
    }

    start()

    // Re-measure if the font loads or the width changes (lines may re-wrap)
    const remeasure = () => { if (started) assignLines() }
    document.fonts?.ready.then(remeasure)
    const ro = new ResizeObserver(remeasure)
    ro.observe(el)

    return () => {
      clearTimeout(doneTimer)
      ro.disconnect()
    }
  }, [])

  return ref
}

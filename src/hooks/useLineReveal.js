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
 * is-split (units hidden), is-prep (hide without transitions), is-revealed
 * (units animate in), is-done (transitions off again so hover styles aren't
 * affected).
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
      // Hide instantly (is-prep turns transitions off) and force that state to
      // be computed, then switch transitions back on and reveal in the same tick.
      // Without the committed hidden state the hide itself would transition and
      // the text would never visibly start hidden.
      el.classList.add('is-split', 'is-prep')
      el.classList.remove('is-measuring')
      void el.offsetWidth
      el.classList.remove('is-prep')
      el.classList.add('is-revealed')
      setTimeout(() => el.classList.add('is-done'), maxLine * STAGGER + TAIL)
    }

    // Once per element: React's dev double-run of effects would otherwise hide the
    // text again mid-reveal and snap it straight to visible
    if (!el.dataset.lineRevealStarted) {
      el.dataset.lineRevealStarted = '1'
      start()
    }

    // Re-measure if the font loads or the width changes (lines may re-wrap)
    const remeasure = () => { if (el.classList.contains('is-revealed')) assignLines() }
    document.fonts?.ready.then(remeasure)
    const ro = new ResizeObserver(remeasure)
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  return ref
}

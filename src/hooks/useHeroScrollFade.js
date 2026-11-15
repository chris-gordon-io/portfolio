import { useEffect } from 'react'

/**
 * useHeroScrollFade — the hero copy (and the "Selected work" button) fade
 * out and blur as the project container slides up over them.
 *
 * The fade runs for the whole approach: it starts the moment you scroll and
 * finishes once the container has covered FULL_AT of the copy, eased at both
 * ends so it feels gradual rather than switching on. The inline
 * opacity/filter are cleared again at 0, so nothing is left creating a
 * stacking context or filter while the page sits at the top.
 */
const MAX_BLUR = 10 // px at full progress
const FULL_AT = 0.85 // fraction of the copy that is covered when it is fully faded

const smoothstep = t => t * t * (3 - 2 * t)

export default function useHeroScrollFade() {
  useEffect(() => {
    const hero = document.querySelector('.hero')
    const copy = document.querySelector('.hero .hx-copy')
    const cta = document.querySelector('.hero .hero-cta')
    const work = document.getElementById('work')
    if (!hero || !copy || !work) return

    const els = [copy, cta].filter(Boolean)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const update = () => {
      const { top, bottom } = copy.getBoundingClientRect()
      const workTop = work.getBoundingClientRect().top
      // the container starts at the hero's bottom edge and rises to this point
      const startTop = hero.offsetHeight
      const endTop = bottom - FULL_AT * (bottom - top)
      const raw = (startTop - workTop) / (startTop - endTop)
      const p = smoothstep(Math.min(1, Math.max(0, raw)))

      // below the threshold, clear the inline styles (rounding noise at the very top)
      const on = p > 0.002
      for (const el of els) {
        el.style.opacity = on ? String(1 - p) : ''
        el.style.filter = on && !reduceMotion ? `blur(${(p * MAX_BLUR).toFixed(2)}px)` : ''
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      for (const el of els) {
        el.style.opacity = ''
        el.style.filter = ''
      }
    }
  }, [])
}

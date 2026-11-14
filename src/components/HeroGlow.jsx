import { useEffect, useRef } from 'react'

/**
 * HeroGlow — a soft blurred white blob that eases after the cursor.
 * Render it as a child of the hero (position: relative/sticky/absolute); it
 * tracks the pointer relative to that parent and sits behind the content.
 */
export default function HeroGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const hero = el?.parentElement
    if (!el || !hero) return
    // no hover on touch screens, so no blob
    if (window.matchMedia('(hover: none)').matches) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduce ? 1 : 0.12
    let tx = 0, ty = 0   // target (pointer)
    let x = 0, y = 0     // rendered position
    let raf = 0
    let seen = false

    const tick = () => {
      x += (tx - x) * ease
      y += (ty - y) * ease
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0
    }

    const onMove = e => {
      const r = hero.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
      if (!seen) {
        // first move: start under the pointer, then fade in
        seen = true
        x = tx
        y = ty
        el.classList.add('is-visible')
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => el.classList.remove('is-visible')
    const onEnter = () => { if (seen) el.classList.add('is-visible') }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="hero-glow" aria-hidden="true" />
}

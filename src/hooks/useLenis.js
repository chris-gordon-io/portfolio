import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Initialises Lenis smooth scroll for the whole page.
 * Call once at the app root.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -16 * t)),
      smoothWheel: true,
    })

    // Expose globally so any component can call window.lenis.scrollTo(...)
    window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      window.lenis = null
    }
  }, [])
}

import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport it gets the class "revealed",
 * which CSS transitions use to drive the animation.
 *
 * @param {object} options
 * @param {number} options.threshold  0–1, how much of the element must be visible. Default 0.15.
 * @param {string} options.rootMargin Offset. Default "0px 0px -40px 0px" (triggers slightly before bottom edge).
 * @param {boolean} options.once      If false, the class is removed again when the element leaves
 *                                    the viewport, so it fades in AND out every time. Default true.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('revealed')
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}

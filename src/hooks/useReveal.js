import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport it gets the class "revealed",
 * which CSS transitions use to drive the animation.
 *
 * @param {object} options
 * @param {number} options.threshold  0–1, how much of the element must be visible. Default 0.15.
 * @param {string} options.rootMargin Offset. Default "0px 0px -40px 0px" (triggers slightly before bottom edge).
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el) // animate once
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

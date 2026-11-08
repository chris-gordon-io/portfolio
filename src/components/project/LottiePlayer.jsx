import { useEffect, useRef } from 'react'

/**
 * LottiePlayer — loops a Lottie (.json) animation, playing only while it's on
 * screen. lottie-web is loaded on demand so it isn't in the initial bundle.
 * With reduced motion it shows the first frame instead of playing.
 *
 * @param {string} src  URL of the Lottie JSON (e.g. /animations/thing.json).
 * @param {string} alt  Accessible description.
 */
export default function LottiePlayer({ src, alt = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let anim
    let observer
    let cancelled = false

    import('lottie-web').then(({ default: lottie }) => {
      if (cancelled) return
      anim = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: src,
      })

      anim.addEventListener('DOMLoaded', () => {
        // Size the box to the animation's own proportions
        const { w, h } = anim.animationData
        el.style.aspectRatio = `${w} / ${h}`
        el.style.setProperty('--lottie-ratio', w / h)

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          anim.goToAndStop(0, true)
          return
        }
        observer = new IntersectionObserver(
          ([entry]) => (entry.isIntersecting ? anim.play() : anim.pause()),
          { threshold: 0.25 },
        )
        observer.observe(el)
      })
    })

    return () => {
      cancelled = true
      observer?.disconnect()
      anim?.destroy()
    }
  }, [src])

  return <div ref={ref} className="pc-lottie" role="img" aria-label={alt} />
}

import { useEffect } from 'react'

/**
 * Periodically swaps the <link rel="icon"> href to a "wink" frame and back,
 * echoing the nav logo's hover animation. Browsers only ever rasterize a
 * static snapshot of an SVG favicon — they won't play CSS/SMIL animation
 * inside it — so this fakes motion the same way an animated GIF favicon
 * would: swapping between pre-rendered frames via JS.
 */
export default function FaviconWink() {
  useEffect(() => {
    const link = document.getElementById('favicon')
    if (!link) return

    let timeoutId
    const intervalId = setInterval(() => {
      link.href = '/favicon-wink.svg'
      timeoutId = setTimeout(() => {
        link.href = '/favicon.svg'
      }, 180)
    }, 4000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [])

  return null
}

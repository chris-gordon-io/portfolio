import { useRef } from 'react'

/**
 * useDraggablePages — lets the `.cv-page` elements inside a container be
 * dragged around within their card.
 *
 * Returns pointer handlers to spread on the container. The offset lives in the
 * --dx / --dy custom properties, which the stylesheet applies through the
 * separate `translate` property (the load animation owns `transform`, so the
 * two don't fight). The dragged page is raised above the others and stays
 * there when dropped. Pages are kept inside the card: fully inside to the left,
 * right and top, with at least MIN_VISIBLE px still showing at the bottom.
 */
const MIN_VISIBLE = 60
const BORDER = 4

export default function useDraggablePages(cardSelector = '.bento-cell--c') {
  const drag = useRef(null)
  const zTop = useRef(3)

  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), Math.max(lo, hi))

  function onPointerDown(e) {
    const page = e.target.closest('.cv-page')
    if (!page || (e.pointerType === 'mouse' && e.button !== 0)) return
    const card = page.closest(cardSelector)
    if (!card) return

    const r = page.getBoundingClientRect()
    const c = card.getBoundingClientRect()
    drag.current = {
      page,
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      dx: parseFloat(page.style.getPropertyValue('--dx')) || 0,
      dy: parseFloat(page.style.getPropertyValue('--dy')) || 0,
      // allowed pointer travel from here, so the page stays inside the card
      minX: c.left + BORDER - r.left,
      maxX: c.right - BORDER - r.right,
      minY: c.top + BORDER - r.top,
      maxY: c.bottom - MIN_VISIBLE - r.top,
    }
    page.setPointerCapture(e.pointerId)
    page.classList.add('is-dragging')
    page.style.zIndex = ++zTop.current
    e.preventDefault()
  }

  function onPointerMove(e) {
    const d = drag.current
    if (!d || e.pointerId !== d.id) return
    const mx = clamp(e.clientX - d.x, d.minX, d.maxX)
    const my = clamp(e.clientY - d.y, d.minY, d.maxY)
    d.page.style.setProperty('--dx', `${d.dx + mx}px`)
    d.page.style.setProperty('--dy', `${d.dy + my}px`)
  }

  function onPointerEnd(e) {
    const d = drag.current
    if (!d || e.pointerId !== d.id) return
    d.page.classList.remove('is-dragging')
    if (d.page.hasPointerCapture?.(e.pointerId)) d.page.releasePointerCapture(e.pointerId)
    drag.current = null
  }

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
  }
}

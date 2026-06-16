import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './GlobalCursor.css'

export default function GlobalCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = e => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const hide = () => setVisible(false)
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
    }
  }, [])

  return createPortal(
    <div
      className="global-cursor"
      style={{ left: pos.x, top: pos.y, opacity: visible ? 1 : 0 }}
    />,
    document.body
  )
}

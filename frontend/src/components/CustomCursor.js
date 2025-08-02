import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }}
      className="fixed z-50 w-8 h-8 border-2 border-blue-400 rounded-full mix-blend-difference transition-all duration-75"
    />
  )
}
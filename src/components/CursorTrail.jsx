import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PARTICLE_ICONS = ['🎀', '💖', '✨', '🌸', '⭐']

export default function CursorTrail() {
  const [particles, setParticles] = useState([])
  const lastPosRef = useRef({ x: 0, y: 0 })
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now()
      const dist = Math.hypot(e.clientX - lastPosRef.current.x, e.clientY - lastPosRef.current.y)

      // Throttle particle spawning to avoid DOM overhead
      if (now - lastTimeRef.current > 45 && dist > 12) {
        lastTimeRef.current = now
        lastPosRef.current = { x: e.clientX, y: e.clientY }

        const newParticle = {
          id: `${now}-${Math.random()}`,
          x: e.clientX - 10,
          y: e.clientY - 10,
          icon: PARTICLE_ICONS[Math.floor(Math.random() * PARTICLE_ICONS.length)],
          rotate: Math.floor(Math.random() * 40) - 20,
        }

        setParticles((prev) => [...prev.slice(-16), newParticle])
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const removeParticle = (id) => {
    setParticles((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0.9,
              scale: 0.9,
              x: p.x,
              y: p.y,
              rotate: p.rotate,
            }}
            animate={{
              opacity: 0,
              scale: 0.3,
              y: p.y - 25,
              rotate: p.rotate + 25,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            onAnimationComplete={() => removeParticle(p.id)}
            className="absolute top-0 left-0 text-base filter drop-shadow-xs"
          >
            {p.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

// Bow Logo SVG Component styled with design token classes
function BowLogo({ className = "w-28 h-28 sm:w-36 sm:h-36" }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={`${className} filter drop-shadow-md`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Celebration Bow Logo"
      role="img"
    >
      {/* Left Ribbon Tail */}
      <path
        d="M85 105 C75 125, 55 145, 35 155 C50 140, 60 120, 68 100 Z"
        className="fill-red-bow"
        opacity="0.9"
      />
      {/* Right Ribbon Tail */}
      <path
        d="M115 105 C125 125, 145 145, 165 155 C150 140, 140 120, 132 100 Z"
        className="fill-red-bow"
        opacity="0.9"
      />
      
      {/* Left Bow Loop */}
      <path
        d="M90 75 C45 35, 15 50, 20 80 C25 105, 55 105, 90 85 Z"
        className="fill-red-bow stroke-pink-base"
        strokeWidth="3"
      />
      {/* Left Inner Fold Shadow */}
      <path
        d="M82 78 C55 60, 35 70, 38 85 C42 95, 65 92, 85 82"
        className="stroke-pink-base/60"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      
      {/* Right Bow Loop */}
      <path
        d="M110 75 C155 35, 185 50, 180 80 C175 105, 145 105, 110 85 Z"
        className="fill-red-bow stroke-pink-base"
        strokeWidth="3"
      />
      {/* Right Inner Fold Shadow */}
      <path
        d="M118 78 C145 60, 165 70, 162 85 C158 95, 135 92, 115 82"
        className="stroke-pink-base/60"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Center Knot */}
      <rect
        x="84"
        y="66"
        width="32"
        height="30"
        rx="12"
        className="fill-red-bow stroke-gold"
        strokeWidth="3"
      />
      {/* Knot Gold Ribbon Ring Detail */}
      <circle
        cx="100"
        cy="81"
        r="5"
        className="fill-gold"
      />
    </svg>
  )
}

// Little Sparkle SVG
function SparkleIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}

export default function Landing({ onEnter }) {
  const [isEntered, setIsEntered] = useState(false)

  const handleEnterClick = () => {
    // 1. Trigger initial celebratory burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD6E8', '#E63950', '#D4A017', '#FF8C42', '#FFF8F3'],
    })

    // 2. Delayed side bursts for grand entrance feel
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD6E8', '#E63950', '#D4A017', '#FF8C42'],
      })
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD6E8', '#E63950', '#D4A017', '#FF8C42'],
      })
    }, 250)

    setIsEntered(true)
    if (onEnter) {
      setTimeout(() => {
        onEnter()
      }, 550)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-cream bg-radial-soft overflow-hidden select-none px-4">
      {/* Floating Background Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-10 text-gold/60"
        >
          <SparkleIcon className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -12, 6, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-16 left-12 text-marigold/50"
        >
          <SparkleIcon className="w-10 h-10 sm:w-14 sm:h-14" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, 15, -8, 0],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-20 right-14 text-pink-base/80"
        >
          <SparkleIcon className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 16, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-20 right-16 text-gold/60"
        >
          <SparkleIcon className="w-8 h-8 sm:w-10 sm:h-10" />
        </motion.div>
      </div>

      {/* Main Entrance Content */}
      <AnimatePresence mode="wait">
        {!isEntered && (
          <motion.div
            key="landing-card"
            initial={{ scale: 0.7, opacity: 0, y: 35 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, filter: 'blur(8px)', transition: { duration: 0.4 } }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 18,
              mass: 0.8,
            }}
            className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto py-10"
          >
            {/* Top Soft Bounce Bow Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 16,
                delay: 0.15,
              }}
              whileHover={{ scale: 1.1, rotate: [-2, 2, -2] }}
              className="cursor-pointer mb-2 float-animation"
            >
              <BowLogo />
            </motion.div>

            {/* Handwritten Greeting Intro */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="font-handwriting text-2xl sm:text-3xl text-marigold tracking-wide mb-1"
            >
              A special celebration for
            </motion.p>

            {/* Crisp Shimmer "Umaima" Text with Soft Bounce */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 15,
                delay: 0.45,
              }}
              className="relative my-2 px-2"
            >
              {/* Decorative Accent Sparkles hugging the name */}
              <motion.span
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 -left-4 sm:-left-8 text-gold"
              >
                <SparkleIcon className="w-5 h-5 sm:w-7 sm:h-7" />
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                className="absolute -bottom-1 -right-4 sm:-right-8 text-gold"
              >
                <SparkleIcon className="w-5 h-5 sm:w-7 sm:h-7" />
              </motion.span>

              {/* Name Display */}
              <h1 className="font-header text-6xl sm:text-8xl md:text-9xl font-black tracking-tight glitter-text leading-tight py-1 px-4">
                Umaima
              </h1>
            </motion.div>

            {/* Heartfelt celebration tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex items-center gap-2.5 mb-8"
            >
              <span className="h-0.5 w-6 sm:w-10 bg-gold/50 rounded-full" />
              <span className="font-handwriting text-lg sm:text-xl text-neutral-600">
                it's time to celebrate ✨
              </span>
              <span className="h-0.5 w-6 sm:w-10 bg-gold/50 rounded-full" />
            </motion.div>

            {/* "Tap to Enter" Button with Soft Bounce */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 18,
                delay: 0.75,
              }}
            >
              <motion.button
                id="tap-to-enter-button"
                onClick={handleEnterClick}
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 12px 30px rgba(230, 57, 80, 0.35)',
                }}
                whileTap={{ scale: 0.94 }}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  y: {
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className="group relative cursor-pointer px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-red-bow text-cream font-header text-lg sm:text-xl font-bold tracking-wide border-2 border-gold/40 shadow-xl transition-colors duration-200 focus:outline-hidden focus:ring-4 focus:ring-pink-base"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-gold text-lg">✨</span>
                  <span>Tap to Enter</span>
                  <span className="text-gold text-lg group-hover:translate-x-1 transition-transform duration-200">
                    🎀
                  </span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

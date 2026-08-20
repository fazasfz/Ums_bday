import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Vector Thumbtack / Pushpin Component
function ThumbTack({ colorClass = "text-red-bow", className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${className} ${colorClass} filter drop-shadow-sm select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pin shadow at point */}
      <ellipse cx="16" cy="30" rx="4" ry="1.5" className="fill-black/20" />
      {/* Needle point */}
      <path d="M16 16 L16 29" stroke="#718096" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pin base disc */}
      <ellipse cx="16" cy="16" rx="7" ry="3.5" className="fill-current" />
      <ellipse cx="16" cy="15" rx="7" ry="3" fill="#D4A017" opacity="0.4" />
      {/* Pin main bulb */}
      <path
        d="M11 15 C11 11, 13 8, 16 8 C19 8, 21 11, 21 15 Z"
        className="fill-current"
      />
      {/* Pin top cap */}
      <circle cx="16" cy="8" r="4.5" className="fill-current" />
      {/* Shiny highlight */}
      <circle cx="14.5" cy="6.5" r="1.5" fill="#FFF8F3" opacity="0.8" />
    </svg>
  )
}

const CHAPTERS = [
  {
    id: 'facts',
    title: 'Facts',
    emoji: '🎀',
    bgClass: 'bg-pink-base',
    borderClass: 'border-red-bow/30',
    textClass: 'text-red-bow',
    pinColor: 'text-red-bow',
    rotateClass: '-rotate-3 hover:rotate-0',
    rotateDeg: -3,
  },
  {
    id: 'memories',
    title: 'Memories',
    emoji: '📸',
    bgClass: 'bg-cream',
    borderClass: 'border-marigold/40',
    textClass: 'text-neutral-800',
    pinColor: 'text-marigold',
    rotateClass: 'rotate-2 hover:rotate-0',
    rotateDeg: 2.5,
  },
  {
    id: 'wishes',
    title: 'Wishes',
    emoji: '💌',
    bgClass: 'bg-pink-base',
    borderClass: 'border-gold/50',
    textClass: 'text-neutral-800',
    pinColor: 'text-gold',
    rotateClass: '-rotate-2 hover:rotate-0',
    rotateDeg: -2,
  },
  {
    id: 'cake',
    title: 'Cake',
    emoji: '🎂',
    bgClass: 'bg-cream',
    borderClass: 'border-red-bow/30',
    textClass: 'text-red-bow',
    pinColor: 'text-red-bow',
    rotateClass: 'rotate-3 hover:rotate-0',
    rotateDeg: 3.5,
  },
]

export default function StickyNavPins({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(true)
  const [activeChapter, setActiveChapter] = useState(null)

  const scrollToChapter = (chapterId) => {
    setActiveChapter(chapterId)
    if (onNavigate) {
      onNavigate(chapterId)
    }

    const target = document.getElementById(chapterId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <aside
      aria-label="Chapter Navigation"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end pointer-events-none select-none"
    >
      {/* Pins Cluster */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="pointer-events-auto flex flex-col sm:flex-row gap-2 sm:gap-3 items-end sm:items-center bg-cream/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-3xl border-2 border-gold/40 shadow-2xl mb-2 max-h-[70vh] overflow-y-auto sm:overflow-visible"
          >
            {CHAPTERS.map((chapter, index) => {
              const isActive = activeChapter === chapter.id
              return (
                <motion.button
                  key={chapter.id}
                  id={`nav-pin-${chapter.id}`}
                  onClick={() => scrollToChapter(chapter.id)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: chapter.rotateDeg,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    y: -3,
                    zIndex: 20,
                  }}
                  whileTap={{ scale: 0.94 }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 18,
                    delay: index * 0.04,
                  }}
                  className={`group relative cursor-pointer flex flex-col items-center justify-between min-w-[64px] sm:min-w-[76px] h-16 sm:h-20 px-2 pt-2 pb-1 sm:pt-2.5 sm:pb-1.5 rounded-lg border paper-shadow transition-shadow duration-200 focus:outline-hidden focus:ring-2 focus:ring-red-bow ${chapter.bgClass} ${chapter.borderClass} ${
                    isActive ? 'ring-2 ring-red-bow shadow-lg' : ''
                  }`}
                >
                  {/* Pin Thumbtack centered at the top of the paper */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 transition-transform duration-200 group-hover:-translate-y-0.5">
                    <ThumbTack colorClass={chapter.pinColor} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {/* Icon */}
                  <span className="text-lg sm:text-2xl mt-0.5 group-hover:scale-110 transition-transform">
                    {chapter.emoji}
                  </span>

                  {/* Title in handwritten font */}
                  <span
                    className={`font-handwriting text-xs sm:text-base font-bold leading-none pb-0.5 tracking-tight ${chapter.textClass}`}
                  >
                    {chapter.title}
                  </span>

                  {/* Corner fold accent decoration */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 border-b border-r border-black/10 rounded-br-sm"
                  />
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Badge Button */}
      <motion.button
        id="sticky-nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="pointer-events-auto cursor-pointer flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-red-bow text-cream border-2 border-gold font-header font-bold text-xs sm:text-sm paper-shadow hover:paper-shadow-hover transition-all focus:outline-hidden focus:ring-2 focus:ring-pink-base"
        aria-label={isOpen ? 'Collapse Chapter Navigation' : 'Expand Chapter Navigation'}
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base">{isOpen ? '📌' : '📍'}</span>
        <span>{isOpen ? 'Hide Pins' : 'Chapters'}</span>
      </motion.button>
    </aside>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import CursorTrail from './CursorTrail'
import MusicToggle from './MusicToggle'
import Landing from './Landing'
import FactsFlipCards from './FactsFlipCards'
import MemoryLane from './MemoryLane'
import WishWheel from './WishWheel'
import CakeCutting from './CakeCutting'
import StickyNavPins from './StickyNavPins'

export default function App() {
  const [hasEntered, setHasEntered] = useState(false)

  return (
    <div className="relative min-h-screen bg-cream text-neutral-800 selection:bg-pink-base selection:text-red-bow">
      {/* Global Interactive Cursor Trail */}
      <CursorTrail />

      {/* Global Background Desi Music Toggle */}
      <MusicToggle />

      {!hasEntered ? (
        /* Full-screen entrance hero */
        <Landing onEnter={() => setHasEntered(true)} />
      ) : (
        /* Revealed full celebration experience */
        <main className="w-full flex flex-col items-center">
          {/* Top Celebration Welcome Header */}
          <header className="w-full pt-12 pb-6 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-base/70 text-red-bow border border-pink-base font-header text-sm font-bold uppercase tracking-wider mb-2 shadow-xs"
            >
              <span>🎀</span>
              <span>Umaima's Special Day</span>
              <span>✨</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-header text-4xl sm:text-6xl font-black text-red-bow tracking-tight"
            >
              Welcome to the Celebration!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-handwriting text-2xl sm:text-3xl text-marigold mt-2"
            >
              "Scroll through each chapter to explore all your surprises..."
            </motion.p>
          </header>

          {/* Chapter 1: Facts */}
          <FactsFlipCards />

          {/* Chapter 2: Memories */}
          <MemoryLane />

          {/* Chapter 3: Wishes */}
          <WishWheel />

          {/* Chapter 4: Cake */}
          <CakeCutting />

          {/* Bottom Pinned Chapter Navigation */}
          <StickyNavPins />

          {/* Celebration Footer */}
          <footer className="w-full py-12 px-6 bg-pink-base/30 border-t border-gold/40 text-center select-none mt-12">
            <div className="max-w-md mx-auto space-y-2">
              <span className="text-3xl">🎀✨🎂</span>
              <h3 className="font-header text-xl sm:text-2xl font-bold text-red-bow">
                Happy Birthday Umaima!
              </h3>
              <p className="font-handwriting text-lg sm:text-xl text-marigold">
                "Crafted with love, laughter, and sprinkles of gold."
              </p>
              <p className="font-header text-xs text-neutral-500 pt-2">
                Forever cheering you on ❤️
              </p>
            </div>
          </footer>
        </main>
      )}
    </div>
  )
}

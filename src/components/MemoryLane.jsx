import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { memories } from '../data/memories'

// Washi Tape SVG Decoration
function WashiTape({ className = "w-24 h-6", colorClass = "bg-pink-base/80" }) {
  return (
    <div
      className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 ${className} ${colorClass} backdrop-blur-xs border-y border-black/10 shadow-xs transform -rotate-1 pointer-events-none select-none tape-strip`}
    />
  )
}

// Fallback Illustrated Camera Scene when real photo is pending
function PolaroidPlaceholder({ gradient, title, tag }) {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden`}
    >
      {/* Soft background circles */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/40 blur-xs" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/30 blur-xs" />

      {/* Camera Icon */}
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-xs flex items-center justify-center shadow-xs text-2xl mb-2 text-red-bow border border-white/60">
        📸
      </div>

      <span className="relative z-10 font-header text-xs font-bold uppercase tracking-widest text-neutral-600 bg-white/70 px-2.5 py-0.5 rounded-full mb-1">
        {tag}
      </span>
      <span className="relative z-10 font-header text-sm font-extrabold text-neutral-800 line-clamp-1">
        {title}
      </span>
      <span className="relative z-10 font-handwriting text-xs text-marigold mt-0.5">
        Photo Slot
      </span>
    </div>
  )
}

function PolaroidCard({ memory, constraintsRef, onSelect }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      initial={{ opacity: 0, scale: 0.8, rotate: memory.initialRotation * 2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: memory.initialRotation }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 35,
        cursor: 'grab',
      }}
      whileDrag={{
        scale: 1.1,
        rotate: 0,
        zIndex: 50,
        cursor: 'grabbing',
        boxShadow: '0 25px 35px rgba(45, 55, 72, 0.25)',
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`relative w-full max-w-[280px] sm:max-w-[300px] bg-white p-3.5 pb-6 rounded-xs border border-neutral-200 shadow-lg select-none cursor-grab active:cursor-grabbing ${memory.staggerClass || ''}`}
    >
      {/* Top Washi Tape Strip */}
      <WashiTape colorClass={memory.tapeColor} />

      {/* Photo Frame (Square Aspect) */}
      <div className="relative aspect-square w-full bg-neutral-100 rounded-xs overflow-hidden border border-neutral-300 shadow-inner">
        {!imageError && memory.image ? (
          <img
            src={memory.image}
            alt={memory.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
        ) : (
          <PolaroidPlaceholder
            gradient={memory.placeholderGradient}
            title={memory.title}
            tag={memory.tag}
          />
        )}

        {/* View full-screen button trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(memory)
          }}
          className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white text-[11px] px-2 py-1 rounded-md font-header font-semibold opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer"
          aria-label={`Enlarge ${memory.title}`}
        >
          🔍 View
        </button>
      </div>

      {/* Polaroid Handwritten Caption Section */}
      <div className="mt-3.5 px-1">
        <div className="flex items-center justify-between gap-1 mb-1">
          <h3 className="font-header text-sm font-bold text-neutral-800 truncate">
            {memory.title}
          </h3>
          <span className="font-handwriting text-xs text-marigold whitespace-nowrap font-bold">
            {memory.tag}
          </span>
        </div>
        <p className="font-handwriting text-base sm:text-lg text-neutral-700 leading-snug">
          "{memory.caption}"
        </p>
      </div>
    </motion.div>
  )
}

export default function MemoryLane() {
  const constraintsRef = useRef(null)
  const [selectedMemory, setSelectedMemory] = useState(null)
  const [scatterKey, setScatterKey] = useState(0)

  return (
    <section
      id="memories"
      aria-labelledby="memories-heading"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream text-marigold border border-marigold/40 font-header text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 shadow-xs"
        >
          <span>📸</span>
          <span>Chapter 02 • Scrapbook Lane</span>
        </motion.div>

        <motion.h2
          id="memories-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-header text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight"
        >
          Moments We'll <span className="text-red-bow">Treasure</span> Forever
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-handwriting text-2xl sm:text-3xl text-marigold mt-2"
        >
          "Grab and drag any polaroid around your table!"
        </motion.p>

        {/* Re-scatter action button */}
        <div className="mt-4">
          <button
            onClick={() => setScatterKey((prev) => prev + 1)}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-base/50 hover:bg-pink-base text-red-bow font-header text-xs font-bold border border-pink-base transition-colors"
          >
            <span>🔀</span>
            <span>Reset / Re-scatter Polaroids</span>
          </button>
        </div>
      </div>

      {/* Draggable Scrapbook Canvas: Staggered 3-Polaroid Arrangement */}
      <div
        ref={constraintsRef}
        key={scatterKey}
        className="relative w-full min-h-[580px] sm:min-h-[500px] p-6 sm:p-10 rounded-3xl bg-cream/60 border-2 border-dashed border-gold/40 shadow-inner flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10"
      >
        {memories.map((memory) => (
          <PolaroidCard
            key={`${memory.id}-${scatterKey}`}
            memory={memory}
            constraintsRef={constraintsRef}
            onSelect={setSelectedMemory}
          />
        ))}
      </div>

      {/* Polaroid Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full max-w-md bg-white p-5 sm:p-6 rounded-2xl shadow-2xl border-4 border-pink-base"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pink-base text-red-bow flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-red-bow hover:text-cream transition-colors z-10"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="aspect-square w-full rounded-xl overflow-hidden mb-4 border border-neutral-200 bg-neutral-100">
                {selectedMemory.image ? (
                  <img
                    src={selectedMemory.image}
                    alt={selectedMemory.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PolaroidPlaceholder
                    gradient={selectedMemory.placeholderGradient}
                    title={selectedMemory.title}
                    tag={selectedMemory.tag}
                  />
                )}
              </div>

              <div className="text-center">
                <span className="inline-block font-header text-xs uppercase font-bold text-marigold mb-1 tracking-wider">
                  {selectedMemory.tag}
                </span>
                <h3 className="font-header text-2xl font-bold text-neutral-900 mb-2">
                  {selectedMemory.title}
                </h3>
                <p className="font-handwriting text-2xl text-neutral-700">
                  "{selectedMemory.caption}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

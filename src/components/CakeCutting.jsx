import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export const HEARTFELT_MESSAGE = `Dearest Umaima,

Happy birthday to the one person I somehow ended up telling everything to, in between classes, more times than either of us could count.

I don't say this enough, so let me say it here: you are, hands down, the best listener I know. Not the "waiting for my turn to talk" kind — the kind who actually hears me, without ever once making me feel like I owe you something back for it.

That's rare. That's you.

And I love you so much, mera pookie bear ❤️✨`

export default function CakeCutting() {
  const [candlesLit, setCandlesLit] = useState(true)
  const [isBlowing, setIsBlowing] = useState(false)
  const [isCut, setIsCut] = useState(false)
  const [showUnfoldedNote, setShowUnfoldedNote] = useState(false)

  // Blow out candles handler
  const handleBlowCandles = () => {
    if (!candlesLit || isBlowing) return

    setIsBlowing(true)
    setTimeout(() => {
      setCandlesLit(false)
      setIsBlowing(false)
    }, 600)
  }

  // Cut the cake handler
  const handleCutCake = () => {
    if (isCut) return

    // If candles are still lit, blow them out first as part of cutting
    if (candlesLit) {
      setCandlesLit(false)
    }

    setIsCut(true)

    // Trigger grand celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD6E8', '#E63950', '#D4A017', '#FF8C42', '#FFF8F3'],
    })

    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#FFD6E8', '#E63950', '#D4A017'],
      })
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#FF8C42', '#D4A017', '#FFF8F3'],
      })

      // Reveal the unfolding heartfelt letter after confetti completes
      setShowUnfoldedNote(true)
    }, 500)
  }

  const handleReset = () => {
    setCandlesLit(true)
    setIsCut(false)
    setShowUnfoldedNote(false)
  }

  return (
    <section
      id="cake"
      aria-labelledby="cake-heading"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden text-center"
    >
      {/* Chapter Badge & Title */}
      <div className="max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-bow/15 text-red-bow border border-red-bow/30 font-header text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 shadow-xs"
        >
          <span>🎂</span>
          <span>Chapter 04 • The Grand Cake Ceremony</span>
        </motion.div>

        <motion.h2
          id="cake-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-header text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight"
        >
          Make a Wish & <span className="text-red-bow">Cut the Cake</span>!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-handwriting text-2xl sm:text-3xl text-marigold mt-2"
        >
          "Blow out the candles, slice a sweet piece, and celebrate!"
        </motion.p>
      </div>

      {/* Main Cake Stage */}
      <div className="relative max-w-xl mx-auto flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl bg-cream/80 border-3 border-pink-base shadow-xl">
        {/* SVG Cake Scene */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center">
          <svg
            viewBox="0 0 400 380"
            className="w-full h-full filter drop-shadow-md select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cake Pedestal Stand */}
            <ellipse cx="200" cy="350" rx="140" ry="18" fill="#D4A017" opacity="0.8" />
            <path
              d="M170 345 L180 310 L220 310 L230 345 Z"
              fill="#D4A017"
              stroke="#FFF8F3"
              strokeWidth="2"
            />
            <ellipse cx="200" cy="310" rx="160" ry="20" fill="#FFF8F3" stroke="#D4A017" strokeWidth="4" />

            {/* Bottom Tier (Pink Strawberry Base) */}
            <g className={isCut ? 'transition-transform duration-500' : ''}>
              {/* Main bottom tier cylinder */}
              <rect x="70" y="210" width="260" height="90" rx="16" fill="#FFD6E8" stroke="#E63950" strokeWidth="2.5" />
              {/* Layer stripes */}
              <path d="M70 255 Q200 270 330 255" stroke="#D4A017" strokeWidth="3" strokeDasharray="6 6" />
              {/* Scalloped Frosting Drips */}
              <path
                d="M70 210 Q90 230 110 210 Q130 238 150 210 Q170 235 190 210 Q210 240 230 210 Q250 232 270 210 Q290 238 310 210 Q320 225 330 210"
                fill="#FFF8F3"
                stroke="#E63950"
                strokeWidth="2"
              />
              {/* Pearl Decor */}
              {[95, 135, 175, 215, 255, 295].map((x) => (
                <circle key={x} cx={x} cy="285" r="4.5" fill="#D4A017" stroke="#FFF8F3" strokeWidth="1.5" />
              ))}
            </g>

            {/* Top Tier (Cream & Gold Sponge) */}
            <g>
              <rect x="110" y="130" width="180" height="85" rx="12" fill="#FFF8F3" stroke="#E63950" strokeWidth="2.5" />
              {/* Top tier frosting swag */}
              <path
                d="M110 135 Q130 155 150 135 Q170 160 190 135 Q210 160 230 135 Q250 155 270 135 Q280 148 290 135"
                fill="#FFD6E8"
                stroke="#E63950"
                strokeWidth="1.5"
              />
              {/* Top tier center bow badge */}
              <g transform="translate(182, 160)">
                <path d="M5 12 C-5 4, -12 6, -10 14 C-8 20, 2 16, 8 13 Z" fill="#E63950" />
                <path d="M11 12 C21 4, 28 6, 26 14 C24 20, 14 16, 8 13 Z" fill="#E63950" />
                <circle cx="8" cy="13" r="4" fill="#D4A017" />
              </g>
              {/* Decorative Strawberries on top tier */}
              <circle cx="135" cy="128" r="8" fill="#E63950" />
              <circle cx="170" cy="125" r="8" fill="#E63950" />
              <circle cx="230" cy="125" r="8" fill="#E63950" />
              <circle cx="265" cy="128" r="8" fill="#E63950" />
            </g>

            {/* Cut Slice Wedge Graphic when cut */}
            {isCut && (
              <g transform="translate(45, 10)">
                <path
                  d="M260 215 L320 240 L310 295 L255 285 Z"
                  fill="#FFF8F3"
                  stroke="#E63950"
                  strokeWidth="2.5"
                  className="filter drop-shadow-lg"
                />
                <path d="M260 215 L300 200 L320 240 Z" fill="#FFD6E8" stroke="#E63950" strokeWidth="1.5" />
                <circle cx="285" cy="235" r="4" fill="#D4A017" />
              </g>
            )}

            {/* 3 Candles (Left, Center, Right) */}
            {[
              { id: 'left', cx: 160, cy: 90, color: '#E63950', stripe: '#FFF8F3' },
              { id: 'center', cx: 200, cy: 75, color: '#D4A017', stripe: '#FFF8F3' },
              { id: 'right', cx: 240, cy: 90, color: '#E63950', stripe: '#FFF8F3' },
            ].map((candle) => (
              <g key={candle.id}>
                {/* Candle Body */}
                <rect
                  x={candle.cx - 5}
                  y={candle.cy}
                  width="10"
                  height="45"
                  rx="3"
                  fill={candle.color}
                  stroke="#2D3748"
                  strokeWidth="1"
                />
                {/* Spiral Stripes */}
                <line
                  x1={candle.cx - 4}
                  y1={candle.cy + 10}
                  x2={candle.cx + 4}
                  y2={candle.cy + 16}
                  stroke={candle.stripe}
                  strokeWidth="2.5"
                />
                <line
                  x1={candle.cx - 4}
                  y1={candle.cy + 24}
                  x2={candle.cx + 4}
                  y2={candle.cy + 30}
                  stroke={candle.stripe}
                  strokeWidth="2.5"
                />

                {/* Candle Wick */}
                <line
                  x1={candle.cx}
                  y1={candle.cy}
                  x2={candle.cx}
                  y2={candle.cy - 7}
                  stroke="#2D3748"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Animated Candle Flame */}
                {candlesLit ? (
                  <g
                    className="flame-animation cursor-pointer"
                    onClick={handleBlowCandles}
                  >
                    {/* Outer Flame Glow */}
                    <circle cx={candle.cx} cy={candle.cy - 16} r="12" fill="#FF8C42" opacity="0.3" />
                    {/* Outer Flame Teardrop */}
                    <path
                      d={`M ${candle.cx} ${candle.cy - 26} C ${candle.cx + 7} ${candle.cy - 16}, ${candle.cx + 6} ${candle.cy - 7}, ${candle.cx} ${candle.cy - 7} C ${candle.cx - 6} ${candle.cy - 7}, ${candle.cx - 7} ${candle.cy - 16}, ${candle.cx} ${candle.cy - 26} Z`}
                      fill="#FF8C42"
                    />
                    {/* Inner Flame (Gold / White Hot) */}
                    <path
                      d={`M ${candle.cx} ${candle.cy - 20} C ${candle.cx + 4} ${candle.cy - 14}, ${candle.cx + 3} ${candle.cy - 7}, ${candle.cx} ${candle.cy - 7} C ${candle.cx - 3} ${candle.cy - 7}, ${candle.cx - 4} ${candle.cy - 14}, ${candle.cx} ${candle.cy - 20} Z`}
                      fill="#FFF8F3"
                    />
                  </g>
                ) : (
                  /* Smoke Wisps when blown */
                  <g className="opacity-60">
                    <path
                      d={`M ${candle.cx} ${candle.cy - 8} Q ${candle.cx - 6} ${candle.cy - 18} ${candle.cx + 2} ${candle.cy - 28}`}
                      stroke="#A0AEC0"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5 z-10">
          {/* Button 1: Blow Out Candles */}
          <motion.button
            id="blow-candles-btn"
            onClick={handleBlowCandles}
            disabled={!candlesLit || isBlowing}
            whileHover={{ scale: candlesLit ? 1.06 : 1 }}
            whileTap={{ scale: candlesLit ? 0.95 : 1 }}
            className={`cursor-pointer px-6 py-3 rounded-full font-header font-bold text-sm sm:text-base border-2 border-gold shadow-md transition-all duration-200 focus:outline-hidden ${
              candlesLit
                ? 'bg-marigold text-cream hover:bg-gold hover:text-neutral-900 shadow-marigold/30'
                : 'bg-neutral-200 text-neutral-400 border-neutral-300 cursor-default opacity-80'
            }`}
          >
            {candlesLit ? '🌬️ Blow Out Candles' : '💨 Candles Blown Out'}
          </motion.button>

          {/* Button 2: Cut The Cake */}
          <motion.button
            id="cut-cake-btn"
            onClick={handleCutCake}
            disabled={isCut}
            whileHover={{ scale: isCut ? 1 : 1.08 }}
            whileTap={{ scale: isCut ? 1 : 0.94 }}
            className={`cursor-pointer px-8 py-3 rounded-full font-header font-bold text-sm sm:text-base border-2 border-gold shadow-lg transition-all duration-200 focus:outline-hidden ${
              !isCut
                ? 'bg-red-bow text-cream hover:bg-red-600 shadow-red-bow/40 animate-pulse'
                : 'bg-pink-base text-red-bow cursor-default opacity-90'
            }`}
          >
            {isCut ? '🍰 Cake Sliced & Served!' : '🔪 Cut the Cake! 🎉'}
          </motion.button>

          {/* Reset button if cut */}
          {isCut && (
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-5 py-3 rounded-full bg-cream text-neutral-700 hover:bg-pink-base/60 font-header font-semibold text-xs sm:text-sm border border-neutral-300 transition-colors"
            >
              ↺ Reset & Light Again
            </motion.button>
          )}
        </div>
      </div>

      {/* Unfolding Handwritten Card Modal */}
      <AnimatePresence>
        {showUnfoldedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs perspective-1000">
            <motion.div
              initial={{
                scaleY: 0.15,
                scaleX: 0.75,
                rotateX: 65,
                rotateZ: -6,
                opacity: 0,
                y: 60,
              }}
              animate={{
                scaleY: 1,
                scaleX: 1,
                rotateX: 0,
                rotateZ: 0,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scaleY: 0.15,
                scaleX: 0.75,
                rotateX: 65,
                opacity: 0,
                y: 40,
                transition: { duration: 0.35 },
              }}
              transition={{
                type: 'spring',
                stiffness: 190,
                damping: 18,
                mass: 0.9,
              }}
              className="relative w-full max-w-lg bg-cream rounded-3xl p-6 sm:p-9 border-4 border-pink-base shadow-2xl text-left transform-style-3d overflow-hidden"
            >
              {/* Paper Top Fold Accent */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-pink-base/50 border-b border-dashed border-marigold/40" />

              {/* Small Close / Dismiss Button */}
              <button
                onClick={() => setShowUnfoldedNote(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-base/80 text-red-bow flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-red-bow hover:text-cream transition-colors shadow-xs z-10"
                aria-label="Dismiss note"
              >
                ✕
              </button>

              {/* Card Header Stamp */}
              <div className="flex items-center gap-3 pt-2 mb-4 pb-3 border-b border-dashed border-marigold/40">
                <div className="w-10 h-10 rounded-full bg-red-bow text-cream flex items-center justify-center text-lg shadow-xs border border-gold">
                  🎀
                </div>
                <div>
                  <span className="font-header text-xs font-bold text-marigold uppercase tracking-wider block">
                    Handwritten Letter
                  </span>
                  <h3 className="font-header text-xl sm:text-2xl font-extrabold text-neutral-900 leading-tight">
                    For Uma, With Love
                  </h3>
                </div>
              </div>

              {/* Heartfelt Message Body (uses --font-handwriting) */}
              <div className="py-2 pr-1 max-h-[60vh] overflow-y-auto shaadi-scrollbar">
                <p className="font-handwriting text-xl sm:text-2xl text-neutral-800 leading-relaxed whitespace-pre-line">
                  {HEARTFELT_MESSAGE}
                </p>
              </div>

              {/* Card Footer / Action */}
              <div className="mt-6 pt-3 border-t border-dashed border-marigold/40 flex items-center justify-between">
                <span className="font-handwriting text-base sm:text-lg text-marigold font-bold">
                  Forever Celebrating You ✨
                </span>
                <button
                  onClick={() => setShowUnfoldedNote(false)}
                  className="cursor-pointer px-5 py-2 rounded-full bg-red-bow text-cream font-header font-bold text-xs sm:text-sm shadow-md hover:bg-marigold hover:text-neutral-900 transition-colors"
                >
                  Close Letter ❤️
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

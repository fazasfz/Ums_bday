import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { wishes } from '../data/wishes'

// Helper to calculate SVG wedge path
function getWedgePath(cx, cy, r, startAngle, endAngle) {
  const rad = Math.PI / 180
  const x1 = cx + r * Math.cos(startAngle * rad)
  const y1 = cy + r * Math.sin(startAngle * rad)
  const x2 = cx + r * Math.cos(endAngle * rad)
  const y2 = cy + r * Math.sin(endAngle * rad)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
}

export default function WishWheel() {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedWish, setSelectedWish] = useState(null)
  const [hasSpunOnce, setHasSpunOnce] = useState(false)

  const numSlices = wishes.length
  const sliceAngle = 360 / numSlices

  const spinWheel = () => {
    if (isSpinning) return

    setSelectedWish(null)
    setIsSpinning(true)

    // Pick a random target index
    const targetIndex = Math.floor(Math.random() * numSlices)
    const targetWish = wishes[targetIndex]

    // Calculate rotation to align the slice center with the top pointer (at 270 deg in SVG polar coordinates)
    const sliceCenterAngle = targetIndex * sliceAngle + sliceAngle / 2
    // Extra full turns (between 6 and 9 full rotations)
    const extraTurns = (6 + Math.floor(Math.random() * 3)) * 360
    const targetRotation = rotation + extraTurns + (360 - ((rotation + sliceCenterAngle) % 360)) + 270

    setRotation(targetRotation)

    // Trigger celebration upon landing after 4.5 seconds
    setTimeout(() => {
      setIsSpinning(false)
      setSelectedWish(targetWish)
      setHasSpunOnce(true)

      // Celebratory Confetti Blast
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FFD6E8', '#E63950', '#D4A017', '#FF8C42', '#FFF8F3'],
      })

      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5, x: 0.3 },
          colors: ['#FFD6E8', '#E63950', '#D4A017'],
        })
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5, x: 0.7 },
          colors: ['#FF8C42', '#D4A017', '#FFF8F3'],
        })
      }, 200)
    }, 4500)
  }

  return (
    <section
      id="wishes"
      aria-labelledby="wishes-heading"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Chapter Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 text-neutral-800 border border-gold font-header text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 shadow-xs"
        >
          <span>💌</span>
          <span>Chapter 03 • Birthday Oracle</span>
        </motion.div>

        <motion.h2
          id="wishes-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-header text-3xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight"
        >
          The Magical <span className="text-red-bow">Wish & Blessing</span> Wheel
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl md:text-3xl text-marigold mt-2"
        >
          "Give the wheel a spin to reveal a special wish crafted just for you!"
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center max-w-5xl mx-auto">
        {/* Wheel Display Column */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
            {/* Outer Decorative Gold Rim Ring with SVG Studs */}
            <div className="absolute inset-0 rounded-full border-6 sm:border-8 border-gold shadow-2xl bg-cream flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 400" className="w-full h-full pointer-events-none">
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180
                  const cx = 200 + 188 * Math.cos(angle)
                  const cy = 200 + 188 * Math.sin(angle)
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r="6"
                      fill="#E63950"
                      stroke="#FFF8F3"
                      strokeWidth="2"
                    />
                  )
                })}
              </svg>
            </div>

            {/* Top Indicator Arrow / Stopper Pin */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-md select-none pointer-events-none">
              <svg width="32" height="40" viewBox="0 0 36 44" fill="none">
                <path
                  d="M18 44 L4 12 C0 4, 36 4, 32 12 Z"
                  className="fill-red-bow stroke-gold"
                  strokeWidth="2.5"
                />
                <circle cx="18" cy="14" r="5" className="fill-gold" />
                <circle cx="18" cy="14" r="2" fill="#FFF8F3" />
              </svg>
            </div>

            {/* Rotating SVG Wheel */}
            <motion.div
              animate={{ rotate: rotation }}
              transition={{
                duration: 4.5,
                ease: [0.15, 0.85, 0.25, 1],
              }}
              className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {wishes.map((wish, index) => {
                  const startAngle = index * sliceAngle
                  const endAngle = (index + 1) * sliceAngle
                  const midAngle = startAngle + sliceAngle / 2
                  const rad = Math.PI / 180
                  const textR = 125
                  const tx = 200 + textR * Math.cos(midAngle * rad)
                  const ty = 200 + textR * Math.sin(midAngle * rad)

                  return (
                    <g key={wish.id}>
                      <path
                        d={getWedgePath(200, 200, 195, startAngle, endAngle)}
                        fill={wish.colorHex}
                        stroke="#D4A017"
                        strokeWidth="2.5"
                      />
                      {/* Text & Icon in Slice */}
                      <g transform={`rotate(${midAngle + 90} ${tx} ${ty})`}>
                        <text
                          x={tx}
                          y={ty - 10}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="22"
                        >
                          {wish.emoji}
                        </text>
                        <text
                          x={tx}
                          y={ty + 14}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={wish.textColorHex}
                          fontFamily="var(--font-header)"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          {wish.label}
                        </text>
                      </g>
                    </g>
                  )
                })}
              </svg>
            </motion.div>

            {/* Center Hub Jewel */}
            <div className="absolute z-20 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-red-bow border-4 border-gold shadow-xl flex items-center justify-center text-cream font-header font-bold select-none pointer-events-none">
              <span className="text-xl sm:text-3xl filter drop-shadow-xs">🎀</span>
            </div>
          </div>

          {/* Spin Trigger Button */}
          <div className="mt-8">
            <motion.button
              id="spin-wheel-btn"
              onClick={spinWheel}
              disabled={isSpinning}
              whileHover={{ scale: isSpinning ? 1 : 1.08 }}
              whileTap={{ scale: isSpinning ? 1 : 0.94 }}
              className={`cursor-pointer px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-header text-base sm:text-xl font-bold tracking-wide border-2 border-gold shadow-xl transition-all duration-200 focus:outline-hidden focus:ring-4 focus:ring-pink-base ${
                isSpinning
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed opacity-80'
                  : 'bg-red-bow text-cream hover:bg-marigold hover:text-neutral-900 shadow-red-bow/30'
              }`}
            >
              {isSpinning ? '🌀 Spinning the Wheel...' : '✨ Spin for a Wish!'}
            </motion.button>
          </div>
        </div>

        {/* Revealed Wish / Compliment Card Column */}
        <div className="lg:col-span-5 w-full">
          <AnimatePresence mode="wait">
            {selectedWish ? (
              <motion.div
                key={`revealed-${selectedWish.id}`}
                initial={{ opacity: 0, scale: 0.85, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -20 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-gold shadow-2xl relative overflow-hidden"
              >
                {/* Top Ribbons */}
                <div className="flex items-center justify-between mb-4 border-b border-gold/30 pb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-base text-red-bow font-header text-xs font-bold uppercase tracking-wider">
                    <span>{selectedWish.emoji}</span>
                    <span>{selectedWish.label}</span>
                  </span>
                  <span className="font-header text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    Your Fortune
                  </span>
                </div>

                {/* Main Wish Content */}
                <div className="space-y-4">
                  <h3 className="font-header text-2xl sm:text-3xl font-extrabold text-red-bow leading-snug">
                    "{selectedWish.compliment}"
                  </h3>

                  <p className="font-header text-base sm:text-lg text-neutral-700 leading-relaxed">
                    {selectedWish.wish}
                  </p>

                  <div className="p-4 rounded-2xl bg-cream border border-dashed border-marigold/60 shadow-inner mt-4">
                    <p className="font-handwriting text-xl sm:text-2xl text-marigold">
                      — {selectedWish.author} ❤️
                    </p>
                  </div>
                </div>

                {/* Spin again tip */}
                <div className="mt-5 text-center pt-3 border-t border-neutral-100">
                  <span className="font-header text-xs text-neutral-500">
                    Want another blessing? Hit the button to spin again!
                  </span>
                </div>
              </motion.div>
            ) : (
              /* Idle / Instructions Card */
              <motion.div
                key="idle-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-cream/80 border-2 border-dashed border-gold/50 rounded-3xl p-6 sm:p-8 text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-pink-base/60 flex items-center justify-center text-2xl sm:text-3xl mb-3">
                  🎡
                </div>
                <h3 className="font-header text-xl sm:text-2xl font-bold text-neutral-800 mb-2">
                  {hasSpunOnce ? 'Ready for Another Spin?' : 'Spin to Unlock Your Wish'}
                </h3>
                <p className="font-handwriting text-lg sm:text-xl text-neutral-600">
                  "Every wedge holds a handpicked compliment and celebration wish for Uma's special day!"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

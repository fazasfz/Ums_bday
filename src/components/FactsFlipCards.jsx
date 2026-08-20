import { useState } from 'react'
import { motion } from 'framer-motion'
import { facts } from '../data/facts'

// Mehndi Mandala Stencil SVG
function MehndiMandalaSVG({ className = "w-24 h-24" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} filter drop-shadow-xs`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer petal ring */}
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" />
      
      {/* 8 Radial Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 12 C55 24, 60 32, 50 40 C40 32, 45 24, 50 12 Z"
            fill="currentColor"
            opacity="0.25"
          />
          <path
            d="M50 12 C55 24, 60 32, 50 40 C40 32, 45 24, 50 12 Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="50" cy="18" r="1.5" fill="currentColor" />
          <circle cx="50" cy="26" r="1.2" fill="currentColor" />
        </g>
      ))}

      {/* Inner Mandala */}
      <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.8" />
      <circle cx="50" cy="50" r="2.5" fill="#FFF8F3" />
    </svg>
  )
}

// Mehndi Paisley SVG
function MehndiPaisleySVG({ className = "w-24 h-24" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} filter drop-shadow-xs`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 75 C15 65, 12 38, 30 22 C48 8, 76 14, 78 36 C80 54, 66 65, 52 66 C42 67, 38 60, 44 52 C50 44, 64 45, 60 34 C56 25, 42 24, 34 35 C26 46, 28 62, 45 74 Z"
        fill="currentColor"
        opacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Inner filigree swirls */}
      <circle cx="52" cy="36" r="6" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <circle cx="52" cy="36" r="2.5" fill="currentColor" />
      
      {/* Dot trail */}
      <circle cx="38" cy="46" r="1.5" fill="currentColor" />
      <circle cx="34" cy="53" r="1.5" fill="currentColor" />
      <circle cx="36" cy="61" r="1.8" fill="currentColor" />
      <circle cx="44" cy="67" r="2" fill="currentColor" />
      <circle cx="56" cy="62" r="1.8" fill="currentColor" />
      
      <circle cx="70" cy="28" r="1.5" fill="currentColor" />
      <circle cx="68" cy="20" r="1.5" fill="currentColor" />
    </svg>
  )
}

// Mehndi Floral SVG
function MehndiFloralSVG({ className = "w-24 h-24" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} filter drop-shadow-xs`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 18 C58 28, 62 38, 50 46 C38 38, 42 28, 50 18 Z"
            fill="currentColor"
            opacity="0.25"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path d="M50 24 L50 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="50" cy="22" r="1.5" fill="currentColor" />
        </g>
      ))}
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.6" />
      <circle cx="50" cy="50" r="3" fill="#FFF8F3" />
    </svg>
  )
}

function StencilMotif({ type, className }) {
  if (type === 'paisley' || type === 'peacock') {
    return <MehndiPaisleySVG className={className} />
  }
  if (type === 'floral') {
    return <MehndiFloralSVG className={className} />
  }
  return <MehndiMandalaSVG className={className} />
}

function FactCard({ fact, index }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const accentColorClass =
    fact.accentColor === 'red-bow'
      ? 'text-red-bow'
      : fact.accentColor === 'gold'
      ? 'text-gold'
      : 'text-marigold'

  const borderHoverClass =
    fact.accentColor === 'red-bow'
      ? 'hover:border-red-bow'
      : fact.accentColor === 'gold'
      ? 'hover:border-gold'
      : 'hover:border-marigold'

  return (
    <div
      className="perspective-1000 w-full h-[380px] sm:h-[400px] cursor-pointer select-none"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`Fact card ${fact.number}: ${fact.frontHint}. Click to ${isFlipped ? 'hide' : 'reveal'} secret.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsFlipped(!isFlipped)
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        className="relative w-full h-full transform-style-3d transition-transform duration-700 ease-out"
      >
        {/* FRONT FACE: Mehndi Tattoo Stencil */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between card-stencil-bg border-3 border-pink-base shadow-lg transition-all duration-300 ${borderHoverClass}`}
        >
          {/* Stencil Header: Tag + Card Number */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-base/60 text-red-bow font-header text-xs font-bold uppercase tracking-wider">
              <span>🪷</span>
              <span>{fact.tag}</span>
            </span>
            <span className={`font-header text-xl font-extrabold ${accentColorClass}`}>
              #{fact.number}
            </span>
          </div>

          {/* Stencil Center Motif & Clue */}
          <div className="flex flex-col items-center text-center my-auto py-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className={`my-3 ${accentColorClass}`}
            >
              <StencilMotif type={fact.motif} className="w-24 h-24 sm:w-28 sm:h-28" />
            </motion.div>

            <h3 className="font-header text-2xl sm:text-3xl font-extrabold text-neutral-800 tracking-tight mt-1">
              {fact.frontHint}
            </h3>
            <p className="font-handwriting text-base sm:text-lg text-marigold mt-1">
              "A hidden trait waiting to be unlocked..."
            </p>
          </div>

          {/* Stencil Footer: Reveal Prompt */}
          <div className="flex items-center justify-center pt-2 border-t border-marigold/20">
            <div className="flex items-center gap-2 text-red-bow font-header text-sm font-bold tracking-wide group-hover:scale-105 transition-transform">
              <span className="text-base">✨</span>
              <span>Tap to Reveal Stencil</span>
              <span className="text-base">→</span>
            </div>
          </div>
        </div>

        {/* BACK FACE: Revealed Fact Parchment */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-pink-base/30 backdrop-blur-xs border-3 border-gold shadow-xl"
        >
          {/* Back Header */}
          <div className="flex items-center justify-between border-b border-gold/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <span className="font-header text-xs font-bold uppercase tracking-widest text-marigold">
                Secret Revealed
              </span>
            </div>
            <span className="font-header text-sm font-extrabold text-neutral-600">
              #{fact.number}
            </span>
          </div>

          {/* Back Main Content */}
          <div className="flex flex-col justify-center my-auto py-2 text-center">
            <h3 className="font-header text-2xl sm:text-3xl font-black text-red-bow mb-3 leading-snug">
              {fact.backTitle}
            </h3>

            <p className="font-header text-base sm:text-lg font-medium text-neutral-800 leading-relaxed px-1">
              {fact.revealedFact}
            </p>

            {/* Handwritten Note Callout */}
            <div className="mt-4 p-3 rounded-2xl bg-cream border border-dashed border-marigold/50 shadow-inner">
              <p className="font-handwriting text-lg sm:text-xl text-marigold leading-tight">
                "{fact.handwrittenNote}"
              </p>
            </div>
          </div>

          {/* Back Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gold/30 text-xs text-neutral-600 font-header font-semibold">
            <span>🪷 Mehndi Chapter</span>
            <span className="text-red-bow font-bold hover:underline">↺ Flip Back</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function FactsFlipCards() {
  return (
    <section
      id="facts"
      aria-labelledby="facts-heading"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Chapter Title & Intro */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-base text-red-bow font-header text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 shadow-xs"
        >
          <span>🎀</span>
          <span>Chapter 01 • Stencil Secrets</span>
        </motion.div>

        <motion.h2
          id="facts-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-header text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-900 tracking-tight"
        >
          Things Only We Know About{' '}
          <span className="text-red-bow">Uma</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-handwriting text-2xl sm:text-3xl text-marigold mt-2"
        >
          "Tap any henna stencil to peel back the secret!"
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {facts.map((fact, index) => (
          <FactCard key={fact.id} fact={fact} index={index} />
        ))}
      </div>
    </section>
  )
}

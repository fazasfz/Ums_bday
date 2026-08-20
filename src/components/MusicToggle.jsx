import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import birthdaySongMp3 from '../assets/Happy Birthday To You Ji - Funny Hindi Birthday Song (Part 1) - Funzoa Mimi Teddy, Krsna Solo.mp3'

// Procedural synthesizer playing the catchy "Happy Birthday To You Ji" melody as fallback
function createBirthdayJiSynth() {
  let audioCtx = null
  let intervalId = null
  let isMuted = false

  const noteFreqs = {
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    G5: 783.99,
  }

  const melody = [
    { n: 'G4', d: 0.22 }, { n: 'G4', d: 0.22 }, { n: 'A4', d: 0.38 }, { n: 'G4', d: 0.38 }, { n: 'C5', d: 0.38 }, { n: 'B4', d: 0.65 },
    { n: 'G4', d: 0.22 }, { n: 'G4', d: 0.22 }, { n: 'A4', d: 0.38 }, { n: 'G4', d: 0.38 }, { n: 'D5', d: 0.38 }, { n: 'C5', d: 0.65 },
    { n: 'G4', d: 0.22 }, { n: 'G4', d: 0.22 }, { n: 'G5', d: 0.38 }, { n: 'E5', d: 0.38 }, { n: 'C5', d: 0.38 }, { n: 'B4', d: 0.38 }, { n: 'A4', d: 0.65 },
    { n: 'F5', d: 0.22 }, { n: 'F5', d: 0.22 }, { n: 'E5', d: 0.38 }, { n: 'C5', d: 0.38 }, { n: 'D5', d: 0.38 }, { n: 'C5', d: 0.75 },
  ]

  const playNote = (freq, duration = 0.3) => {
    if (!audioCtx || isMuted || !freq) return
    try {
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime)

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration)

      osc.connect(gain)
      gain.connect(audioCtx.destination)

      osc.start()
      osc.stop(audioCtx.currentTime + duration)
    } catch (e) {
      console.warn('Audio note error', e)
    }
  }

  return {
    start: () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
      isMuted = false

      let step = 0
      intervalId = setInterval(() => {
        const item = melody[step % melody.length]
        if (item && noteFreqs[item.n]) {
          playNote(noteFreqs[item.n], item.d)
        }
        step++
      }, 290)
    },
    stop: () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      isMuted = true
    },
  }
}

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const synthRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    synthRef.current = createBirthdayJiSynth()
    return () => {
      if (synthRef.current) {
        synthRef.current.stop()
      }
    }
  }, [])

  const toggleMusic = () => {
    if (isPlaying) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (synthRef.current) {
        synthRef.current.stop()
      }
      setIsPlaying(false)
    } else {
      // Play
      setIsPlaying(true)
      if (audioRef.current) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (synthRef.current) {
              synthRef.current.start()
            }
          })
        }
      } else if (synthRef.current) {
        synthRef.current.start()
      }
    }
  }

  return (
    <aside
      aria-label="Background Music Controller"
      className="fixed top-4 right-4 sm:top-5 sm:right-5 z-40 select-none"
    >
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={birthdaySongMp3}
        onError={() => {
          if (isPlaying && synthRef.current) {
            synthRef.current.start()
          }
        }}
      />

      <motion.button
        id="music-toggle-btn"
        onClick={toggleMusic}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? 'Mute Birthday Song' : 'Play Happy Birthday To You Ji'}
        className={`cursor-pointer flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full border-2 shadow-lg backdrop-blur-md transition-all duration-300 font-header font-bold text-xs sm:text-sm focus:outline-hidden ${
          isPlaying
            ? 'bg-red-bow text-cream border-gold shadow-red-bow/30'
            : 'bg-white/90 text-neutral-700 border-neutral-300 hover:border-gold hover:bg-cream'
        }`}
      >
        {/* Animated Equalizer Waves or Teddy Icon */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4 w-4 text-gold shrink-0">
            <span className="w-1 bg-gold rounded-full audio-bar-1" />
            <span className="w-1 bg-cream rounded-full audio-bar-2" />
            <span className="w-1 bg-gold rounded-full audio-bar-3" />
            <span className="w-1 bg-cream rounded-full audio-bar-4" />
          </div>
        ) : (
          <span className="text-sm sm:text-base shrink-0">🐻</span>
        )}

        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider opacity-85">
            {isPlaying ? 'Funzoa • Playing 🎵' : 'Birthday Song Ji 🎂'}
          </span>
          <span className="font-extrabold text-xs sm:text-sm truncate max-w-[150px] sm:max-w-[180px]">
            {isPlaying ? 'Happy Birthday To You Ji' : 'Tap to Play Ji'}
          </span>
        </div>
      </motion.button>
    </aside>
  )
}

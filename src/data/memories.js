import catCafeImg from '../assets/Catcafe.jpeg'
import midLectureImg from '../assets/Mid-lecture.jpeg'
import afterClassImg from '../assets/after-class.jpeg'

export const memories = [
  {
    id: 1,
    image: catCafeImg,
    placeholderGradient: 'from-pink-200 via-rose-100 to-amber-100',
    title: 'The Cat Incident',
    caption: 'The day a cat peed on her bag mid-hangout, she panicked, I couldn’t stop laughing. 10/10 chaotic afternoon.',
    date: 'Cafe Felix Chaos',
    tapeColor: 'bg-pink-base/80',
    initialRotation: -5,
    tag: 'CAFE FELIX CHAOS',
    staggerClass: 'lg:-translate-y-6'
  },
  {
    id: 2,
    image: midLectureImg,
    placeholderGradient: 'from-amber-100 via-orange-100 to-rose-200',
    title: 'Tired But We Ate',
    caption: 'Thought we looked good enough for a picture anyway.',
    date: 'Mid-Lecture Moments',
    tapeColor: 'bg-gold/40',
    initialRotation: 4,
    tag: 'MID-LECTURE',
    staggerClass: 'lg:translate-y-8'
  },
  {
    id: 3,
    image: afterClassImg,
    placeholderGradient: 'from-rose-200 via-pink-100 to-yellow-100',
    title: 'Good Light, Good Day',
    caption: 'Perfect sunlight after class, so obviously we had to capture it.',
    date: 'Golden Hour Glow',
    tapeColor: 'bg-marigold/50',
    initialRotation: -3,
    tag: 'Achi light thi',
    staggerClass: 'lg:-translate-y-3'
  }
]

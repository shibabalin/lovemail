import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface Props {
  onComplete: () => void
}

export default function SendAnimation({ onComplete }: Props) {
  const controls = useAnimation()

  useEffect(() => {
    async function animate() {
      // 1. Card folds
      await controls.start('fold')
      await new Promise(r => setTimeout(r, 300))
      // 2. Envelope closes
      await controls.start('close')
      await new Promise(r => setTimeout(r, 400))
      // 3. Fly away
      await controls.start('fly')
      await new Promise(r => setTimeout(r, 800))
      onComplete()
    }
    animate()
  }, [controls, onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          animate={controls}
          variants={{
            fold: {
              scaleY: 0,
              y: 20,
              transition: { duration: 0.5, ease: 'easeIn' }
            },
            close: {
              scaleY: 0,
              y: 20,
              transition: { duration: 0 }
            },
            fly: {
              y: [-20, -300],
              x: [0, 80],
              rotate: [0, 15],
              scale: [1, 0.4],
              opacity: [1, 0],
              transition: { duration: 1, ease: 'easeIn' }
            }
          }}
          className="relative"
        >
          {/* Envelope SVG */}
          <svg width="160" height="110" viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg">
            {/* Envelope body */}
            <rect x="0" y="20" width="160" height="90" rx="6" fill="#fce4ec" stroke="#f48fb1" strokeWidth="2"/>
            {/* Envelope flap (closed) */}
            <polygon points="0,20 80,70 160,20" fill="#f8bbd9" stroke="#f48fb1" strokeWidth="1"/>
            {/* Bottom triangle left */}
            <polygon points="0,20 0,110 65,65" fill="#fad0e4"/>
            {/* Bottom triangle right */}
            <polygon points="160,20 160,110 95,65" fill="#fad0e4"/>
            {/* Heart seal */}
            <text x="80" y="48" textAnchor="middle" fontSize="18" fill="#e91e63">♥</text>
            {/* "LoveMail" text */}
            <text x="80" y="90" textAnchor="middle" fontSize="10" fill="#ad1457" fontFamily="serif" fontStyle="italic">LoveMail</text>
          </svg>

          {/* Sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 50}px`,
                left: `${80 + Math.cos(i * 60 * Math.PI / 180) * 70}px`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            >
              <span className="text-rose-400 text-sm">✦</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-rose-500 text-xl"
        >
          Votre lettre s'envole... ✉️
        </motion.p>
      </div>
    </div>
  )
}

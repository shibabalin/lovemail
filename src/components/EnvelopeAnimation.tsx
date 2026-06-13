import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Letter } from '../types'
import { STAMPS } from '../lib/stamps'

interface Props {
  letter: Letter
}

export default function EnvelopeAnimation({ letter }: Props) {
  const [phase, setPhase] = useState<'envelope' | 'opening' | 'card'>('envelope')
  const stamp = STAMPS.find(s => s.id === letter.stamp)

  const handleClick = () => {
    if (phase === 'envelope') {
      setPhase('opening')
      setTimeout(() => setPhase('card'), 1400)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto px-4">
      <AnimatePresence mode="wait">
        {phase !== 'card' && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-handwriting text-rose-400 text-lg"
            >
              {phase === 'envelope' ? 'Cliquez pour ouvrir votre lettre 💌' : 'Ouverture...'}
            </motion.p>

            <motion.div
              onClick={handleClick}
              whileHover={phase === 'envelope' ? { scale: 1.03, y: -4 } : {}}
              whileTap={phase === 'envelope' ? { scale: 0.98 } : {}}
              className={phase === 'envelope' ? 'cursor-pointer' : ''}
              animate={phase === 'opening' ? { y: [0, -5, 0, -3, 0] } : { y: [0, -6, 0] }}
              transition={
                phase === 'opening'
                  ? { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] }
                  : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <svg width="200" height="140" viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))' }}
              >
                {/* Envelope body */}
                <rect x="0" y="30" width="200" height="110" rx="8" fill="#fce4ec" stroke="#f48fb1" strokeWidth="2"/>

                {/* Flap animation */}
                <motion.polygon
                  points="0,30 100,95 200,30"
                  fill="#f8bbd9"
                  stroke="#f48fb1"
                  strokeWidth="1"
                  animate={phase === 'opening' ? {
                    points: ['0,30 100,95 200,30', '0,30 100,-35 200,30'],
                  } : {}}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{ transformOrigin: '50% 30px' }}
                />

                {/* Bottom triangles */}
                <polygon points="0,30 0,140 80,85" fill="#fad0e4"/>
                <polygon points="200,30 200,140 120,85" fill="#fad0e4"/>

                {/* Card peeking out when opening */}
                {phase === 'opening' && (
                  <motion.rect
                    x="30" y="40" width="140" height="90" rx="4"
                    fill="#fefce8"
                    stroke="#fbbf24"
                    strokeWidth="1"
                    initial={{ y: 90 }}
                    animate={{ y: 10 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                  />
                )}

                {/* Heart seal */}
                <motion.text
                  x="100" y="72" textAnchor="middle" fontSize="24"
                  animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >♥</motion.text>
              </svg>
            </motion.div>
          </motion.div>
        )}

        {phase === 'card' && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full"
          >
            {/* Postcard */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fefce8 0%, #fef9e7 40%, #fefde8 100%)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)',
                aspectRatio: '3/2',
              }}
            >
              {/* Decorative border */}
              <div className="absolute inset-2 border border-amber-200/60 rounded-lg pointer-events-none" />

              {/* Corner flowers */}
              <div className="absolute top-3 left-3 text-rose-200 text-xl opacity-60 select-none">❀</div>
              <div className="absolute top-3 right-16 text-rose-200 text-xl opacity-60 select-none">❀</div>
              <div className="absolute bottom-3 left-3 text-rose-200 text-base opacity-60 select-none">❀</div>

              {/* Divider */}
              <div className="absolute top-8 bottom-8 right-[45%] w-px bg-amber-300/40" />

              {/* Left — message */}
              <div className="absolute left-6 top-8 bottom-8 right-[47%] flex flex-col">
                <div className="flex-1 relative">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute left-0 right-0 border-b border-amber-200/40"
                      style={{ top: `${(i + 1) * 16.66}%` }} />
                  ))}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="absolute inset-0 font-handwriting text-gray-700 leading-relaxed whitespace-pre-wrap overflow-hidden"
                    style={{ fontSize: '15px', lineHeight: '2.1' }}
                  >
                    {letter.message}
                  </motion.p>
                </div>

                {letter.sender_name && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="font-handwriting text-rose-500 text-sm mt-2 border-t border-amber-200/50 pt-2"
                  >
                    {letter.sender_name}
                  </motion.p>
                )}
              </div>

              {/* Right — stamp + lines */}
              <div className="absolute right-4 top-6 bottom-8 left-[57%] flex flex-col items-end gap-3">
                {stamp && (
                  <motion.div
                    initial={{ rotate: -15, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: -3, scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    className="w-14 h-[72px]"
                  >
                    <img src={stamp.file} alt={stamp.name}
                      className="w-full h-full object-contain"
                      style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}
                    />
                  </motion.div>
                )}
                <div className="flex-1 w-full flex flex-col justify-end gap-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-amber-200/60" />
                  ))}
                  <div className="mt-1 text-right">
                    <span className="font-handwriting text-rose-300 text-xs italic">avec amour 💌</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hearts floating up */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-rose-400 text-sm select-none"
                  style={{ left: `${15 + i * 18}%`, bottom: '10%' }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -80 }}
                  transition={{ delay: 0.8 + i * 0.2, duration: 1.5 }}
                >♥</motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

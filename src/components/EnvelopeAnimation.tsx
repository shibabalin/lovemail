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
      setTimeout(() => setPhase('card'), 1500)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      <AnimatePresence mode="wait">

        {/* ── ENVELOPPE ── */}
        {phase !== 'card' && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-5 w-full"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-handwriting text-rose-400"
              style={{ fontSize: '18px' }}
            >
              {phase === 'envelope' ? 'Cliquez pour ouvrir votre lettre 💌' : 'Ouverture...'}
            </motion.p>

            <motion.div
              onClick={handleClick}
              whileHover={phase === 'envelope' ? { scale: 1.03, y: -4 } : {}}
              whileTap={phase === 'envelope' ? { scale: 0.97 } : {}}
              className={phase === 'envelope' ? 'cursor-pointer' : ''}
              animate={phase === 'opening'
                ? { y: [0, -6, 0, -4, 0] }
                : { y: [0, -7, 0] }
              }
              transition={phase === 'opening'
                ? { duration: 0.5 }
                : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
              }
              style={{ width: '100%', maxWidth: '340px' }}
            >
              {/* SVG enveloppe — viewBox ajusté pour ne PAS couper le rabat */}
              <svg
                width="100%"
                viewBox="0 0 280 210"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 16px 32px rgba(180,50,100,0.18))' }}
                overflow="visible"
              >
                {/* Corps enveloppe */}
                <rect x="4" y="70" width="272" height="136" rx="10" fill="#fce4ec" stroke="#f48fb1" strokeWidth="2"/>

                {/* Triangles bas-gauche et bas-droit */}
                <polygon points="4,70 4,206 112,138" fill="#f8bbd0"/>
                <polygon points="276,70 276,206 168,138" fill="#f8bbd0"/>

                {/* Triangle central bas (pli) */}
                <polygon points="4,206 140,138 276,206" fill="#fad0e4"/>

                {/* Rabat du haut — animé à l'ouverture */}
                <motion.polygon
                  points="4,70 140,148 276,70"
                  fill="#f48fb1"
                  stroke="#f48fb1"
                  strokeWidth="1"
                  animate={phase === 'opening'
                    ? { points: ['4,70 140,148 276,70', '4,70 140,-8 276,70'] }
                    : { points: '4,70 140,148 276,70' }
                  }
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />

                {/* Ombre légère sous le rabat fermé */}
                {phase !== 'opening' && (
                  <polygon points="4,70 140,148 276,70" fill="rgba(0,0,0,0.04)"/>
                )}

                {/* Carte qui sort à l'ouverture */}
                {phase === 'opening' && (
                  <motion.rect
                    x="44" y="80" width="192" height="120" rx="6"
                    fill="#fefce8"
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 10, opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.65, ease: 'easeOut' }}
                  />
                )}

                {/* Sceau cœur */}
                <motion.g
                  animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <circle cx="140" cy="125" r="18" fill="#e91e63" opacity="0.15"/>
                  <text x="140" y="133" textAnchor="middle" fontSize="26" fill="#e91e63">♥</text>
                </motion.g>
              </svg>
            </motion.div>
          </motion.div>
        )}

        {/* ── CARTE POSTALE ── */}
        {phase === 'card' && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 50, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full relative"
          >
            {/* Cœurs flottants */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 10 }}>
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-rose-400 select-none"
                  style={{ left: `${10 + i * 16}%`, bottom: '5%', fontSize: `${12 + i * 2}px` }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -100 }}
                  transition={{ delay: 0.6 + i * 0.18, duration: 1.8 }}
                >♥</motion.span>
              ))}
            </div>

            {/* La carte */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-2xl overflow-hidden w-full"
              style={{
                background: 'linear-gradient(155deg, #fffef7 0%, #fef9e7 50%, #fdf6e3 100%)',
                boxShadow: '0 24px 64px rgba(180,80,80,0.18), 0 4px 16px rgba(0,0,0,0.08)',
                // Ratio 3/2 maintenu mais hauteur min garantie pour lisibilité
                minHeight: '260px',
              }}
            >
              {/* Texture papier */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 30px, rgba(180,140,60,0.06) 30px, rgba(180,140,60,0.06) 31px)',
                backgroundPosition: '0 44px',
              }}/>
              {/* Bordures dorées */}
              <div className="absolute inset-2 rounded-xl pointer-events-none" style={{ border: '1.5px solid rgba(200,160,60,0.3)' }}/>
              <div className="absolute inset-4 rounded-xl pointer-events-none" style={{ border: '0.5px solid rgba(200,160,60,0.15)' }}/>

              {/* Contenu en flex colonne sur mobile, ligne sur desktop */}
              <div className="relative flex flex-col md:flex-row h-full" style={{ padding: '20px 16px 16px' }}>

                {/* Zone message */}
                <div className="flex-1 flex flex-col pr-0 md:pr-4" style={{ minHeight: '160px' }}>
                  <div className="absolute top-4 left-4 text-rose-200 opacity-50 select-none" style={{ fontSize: '20px' }}>❀</div>
                  <div className="absolute bottom-4 left-4 text-rose-200 opacity-40 select-none" style={{ fontSize: '15px' }}>❀</div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 1 }}
                    className="font-handwriting text-gray-700 flex-1 whitespace-pre-wrap"
                    style={{
                      fontSize: 'clamp(14px, 3.5vw, 18px)',
                      lineHeight: '1.85',
                      paddingLeft: '24px',
                      paddingTop: '8px',
                    }}
                  >
                    {letter.message}
                  </motion.p>

                  {letter.sender_name && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="font-handwriting text-rose-500 mt-3 pt-3"
                      style={{
                        fontSize: 'clamp(13px, 3vw, 16px)',
                        borderTop: '1px solid rgba(200,160,60,0.25)',
                        paddingLeft: '24px',
                      }}
                    >
                      {letter.sender_name}
                    </motion.p>
                  )}
                </div>

                {/* Séparateur vertical (desktop) / horizontal (mobile) */}
                <div className="hidden md:block self-stretch" style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(200,160,60,0.3) 20%, rgba(200,160,60,0.3) 80%, transparent)', margin: '0 8px' }}/>
                <div className="md:hidden my-3" style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,160,60,0.3) 20%, rgba(200,160,60,0.3) 80%, transparent)' }}/>

                {/* Zone timbre + lignes adresse */}
                <div className="flex md:flex-col flex-row-reverse md:items-end items-center gap-3" style={{ width: '100%', maxWidth: '160px', alignSelf: 'flex-start' }}>
                  {stamp && (
                    <motion.div
                      initial={{ rotate: -18, scale: 0.5, opacity: 0 }}
                      animate={{ rotate: -3, scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 180, damping: 16 }}
                      style={{ width: '72px', height: '88px', flexShrink: 0 }}
                    >
                      <img
                        src={stamp.file}
                        alt={stamp.name}
                        style={{ width: '72px', height: '88px', objectFit: 'contain', filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.22))' }}
                      />
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-2 flex-1 md:w-full justify-end">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{ height: '1px', background: 'rgba(200,160,60,0.25)', width: '100%' }}/>
                    ))}
                    <div className="text-right mt-1">
                      <span className="font-handwriting text-rose-300 italic" style={{ fontSize: '11px' }}>avec amour 💌</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

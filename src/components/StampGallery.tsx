import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STAMPS } from '../lib/stamps'
import type { Stamp } from '../types'

interface Props {
  selectedStamp: Stamp | null
  onSelect: (stamp: Stamp | null) => void
}

export default function StampGallery({ selectedStamp, onSelect }: Props) {
  const dragRef = useRef<{ stamp: Stamp | null }>({ stamp: null })

  const handleDragStart = (stamp: Stamp) => {
    dragRef.current.stamp = stamp
  }

  const handleDragEnd = () => {
    // drag ended
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(190,24,93,0.2))' }} />
        <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#be185d' }}>
          Timbres
        </h3>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(190,24,93,0.2))' }} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {STAMPS.map((stamp) => {
          const isSelected = selectedStamp?.id === stamp.id
          return (
            <motion.div
              key={stamp.id}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(isSelected ? null : stamp)}
              draggable
              onDragStart={() => handleDragStart(stamp)}
              onDragEnd={handleDragEnd}
              className="relative cursor-pointer rounded-xl overflow-hidden transition-all duration-200"
              style={{
                boxShadow: isSelected
                  ? '0 0 0 2.5px #f43f5e, 0 8px 24px rgba(244,63,94,0.25)'
                  : '0 2px 10px rgba(0,0,0,0.1)',
                background: 'white',
              }}
            >
              <img
                src={stamp.file}
                alt={stamp.name}
                className="w-full h-auto block"
                draggable={false}
              />

              {/* Badge sélectionné */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-1.5 right-1.5 rounded-full flex items-center justify-center"
                    style={{ width: '20px', height: '20px', background: '#f43f5e', boxShadow: '0 2px 6px rgba(244,63,94,0.4)' }}
                  >
                    <span className="text-white" style={{ fontSize: '10px', fontWeight: 700 }}>✓</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Nom au survol */}
              <div
                className="absolute inset-x-0 bottom-0 py-1 text-center"
                style={{ background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(2px)' }}
              >
                <p className="text-white font-medium truncate px-1" style={{ fontSize: '9px', letterSpacing: '0.03em' }}>
                  {stamp.name}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedStamp && (
          <motion.button
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            onClick={() => onSelect(null)}
            className="text-xs underline underline-offset-2 transition-colors"
            style={{ color: 'rgba(190,24,93,0.5)' }}
          >
            Retirer le timbre
          </motion.button>
        )}
      </AnimatePresence>

      <p className="text-xs italic" style={{ color: 'rgba(150,100,120,0.5)' }}>
        Cliquez pour sélectionner
      </p>
    </div>
  )
}

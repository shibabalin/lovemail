import { useRef } from 'react'
import { motion } from 'framer-motion'
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
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-rose-700 uppercase tracking-widest">
        Choisissez un timbre
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {STAMPS.map((stamp) => (
          <motion.div
            key={stamp.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 shadow-sm
              ${selectedStamp?.id === stamp.id
                ? 'border-rose-500 shadow-rose-200 shadow-md ring-2 ring-rose-300'
                : 'border-amber-200 hover:border-rose-300 hover:shadow-md'
              }
            `}
            onClick={() => onSelect(selectedStamp?.id === stamp.id ? null : stamp)}
            draggable
            onDragStart={() => handleDragStart(stamp)}
            onDragEnd={handleDragEnd}
          >
            <img
              src={stamp.file}
              alt={stamp.name}
              className="w-full h-auto"
              draggable={false}
            />
            {selectedStamp?.id === stamp.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1 right-1 bg-rose-500 rounded-full w-5 h-5 flex items-center justify-center"
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-black/20 backdrop-blur-sm py-0.5">
              <p className="text-center text-white text-[9px] font-medium truncate px-1">
                {stamp.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedStamp && (
        <motion.button
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onSelect(null)}
          className="text-xs text-rose-400 hover:text-rose-600 underline underline-offset-2 transition-colors"
        >
          Retirer le timbre
        </motion.button>
      )}

      <p className="text-xs text-gray-400 italic">
        Cliquez ou glissez le timbre sur la carte
      </p>
    </div>
  )
}

export { }
export type { }

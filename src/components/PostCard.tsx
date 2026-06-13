import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { Stamp } from '../types'

interface Props {
  message: string
  senderName: string
  selectedStamp: Stamp | null
  onStampDrop: (stamp: Stamp) => void
  onMessageChange: (v: string) => void
  onSenderChange: (v: string) => void
}

export default function PostCard({
  message,
  senderName,
  selectedStamp,
  onStampDrop: _onStampDrop,
  onMessageChange,
  onSenderChange,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    // The stamp data is managed via the gallery component's state
    // We just need a signal — the parent handles the stamp selection
  }

  return (
    <motion.div
      ref={cardRef}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative w-full max-w-lg mx-auto"
      style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
    >
      {/* Card body */}
      <div
        className="relative bg-amber-50 rounded-xl overflow-hidden paper-texture"
        style={{
          aspectRatio: '3/2',
          background: 'linear-gradient(135deg, #fefce8 0%, #fef9e7 40%, #fefde8 100%)',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.04)',
        }}
      >
        {/* Decorative border */}
        <div className="absolute inset-2 border border-amber-200/60 rounded-lg pointer-events-none" />
        <div className="absolute inset-3 border border-amber-100/40 rounded-lg pointer-events-none" />

        {/* Floral corner decorations */}
        <div className="absolute top-3 left-3 text-rose-200 text-xl pointer-events-none select-none opacity-60">❀</div>
        <div className="absolute top-3 right-16 text-rose-200 text-xl pointer-events-none select-none opacity-60">❀</div>
        <div className="absolute bottom-3 left-3 text-rose-200 text-base pointer-events-none select-none opacity-60">❀</div>

        {/* Left side — message area */}
        <div className="absolute left-4 top-8 bottom-8 right-[45%] flex flex-col">
          {/* Ruled lines */}
          <div className="flex-1 relative">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-b border-amber-200/50"
                style={{ top: `${(i + 1) * 16.66}%` }}
              />
            ))}
            <textarea
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder="Écrivez votre message ici..."
              maxLength={300}
              className="absolute inset-0 w-full h-full resize-none bg-transparent font-handwriting text-gray-700 text-base leading-relaxed focus:outline-none placeholder:text-amber-300 placeholder:text-sm"
              style={{ fontSize: '15px', lineHeight: '2.05' }}
            />
          </div>

          {/* Sender name */}
          <div className="mt-2 border-t border-amber-200/50 pt-2">
            <input
              type="text"
              value={senderName}
              onChange={(e) => onSenderChange(e.target.value)}
              placeholder="Votre prénom (facultatif)"
              maxLength={30}
              className="w-full bg-transparent font-handwriting text-rose-500 text-sm focus:outline-none placeholder:text-amber-300"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="absolute top-8 bottom-8 right-[45%] w-px bg-amber-300/40" />

        {/* Right side — stamp area + address lines */}
        <div className="absolute right-4 top-6 bottom-8 left-[57%] flex flex-col items-end gap-3">
          {/* Stamp slot */}
          <div
            className={`w-16 h-20 border-2 border-dashed rounded transition-all duration-200 flex items-center justify-center
              ${selectedStamp ? 'border-transparent' : 'border-amber-300 bg-amber-50/50'}
            `}
          >
            {selectedStamp ? (
              <motion.img
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: -3 }}
                src={selectedStamp.file}
                alt={selectedStamp.name}
                className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))' }}
              />
            ) : (
              <span className="text-amber-300 text-xs text-center leading-tight">
                timbre
              </span>
            )}
          </div>

          {/* Address lines (decorative) */}
          <div className="flex-1 w-full flex flex-col justify-end gap-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-px bg-amber-200/60" />
            ))}
            <div className="mt-1 text-right">
              <span className="font-handwriting text-rose-300 text-xs italic">avec amour 💌</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

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
  }

  return (
    <motion.div
      ref={cardRef}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative w-full max-w-lg mx-auto"
      style={{ filter: 'drop-shadow(0 24px 48px rgba(180,80,80,0.18))' }}
    >
      {/* Petite ombre portée dessous */}
      <div className="absolute -bottom-3 left-6 right-6 h-4 rounded-full bg-rose-200/30 blur-md" />

      {/* Card body */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          aspectRatio: '3/2',
          background: 'linear-gradient(160deg, #fffef7 0%, #fef9e7 35%, #fefce8 70%, #fdf6e3 100%)',
          boxShadow: '0 2px 0 #e8d5a3, inset 0 0 60px rgba(200,150,50,0.06)',
        }}
      >
        {/* Texture lignes horizontales très subtiles (papier) */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(180,140,60,0.07) 27px, rgba(180,140,60,0.07) 28px)',
          backgroundPosition: '0 40px',
        }}/>

        {/* Bordure dorée double */}
        <div className="absolute inset-2 rounded-xl pointer-events-none" style={{ border: '1.5px solid rgba(200,160,60,0.35)' }} />
        <div className="absolute inset-3.5 rounded-xl pointer-events-none" style={{ border: '0.5px solid rgba(200,160,60,0.18)' }} />

        {/* Coin floral haut-gauche */}
        <div className="absolute top-4 left-4 pointer-events-none select-none" style={{ fontSize: '22px', lineHeight: 1, color: '#e8c4c4', opacity: 0.55 }}>❀</div>
        {/* Coin floral bas-gauche */}
        <div className="absolute bottom-4 left-4 pointer-events-none select-none" style={{ fontSize: '16px', color: '#e8c4c4', opacity: 0.45 }}>❀</div>
        {/* Coin floral haut (zone message) */}
        <div className="absolute top-4 right-[47%] pointer-events-none select-none" style={{ fontSize: '14px', color: '#e8c4c4', opacity: 0.4 }}>✿</div>

        {/* Zone message gauche */}
        <div className="absolute left-5 top-9 bottom-9 right-[46%] flex flex-col">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder="Écrivez votre message ici..."
              maxLength={300}
              className="absolute inset-0 w-full h-full resize-none bg-transparent font-handwriting text-gray-700 focus:outline-none placeholder:text-amber-300/80"
              style={{ fontSize: '14px', lineHeight: '1.95', paddingTop: '2px' }}
            />
          </div>

          {/* Prénom expéditeur */}
          <div className="border-t mt-2 pt-2" style={{ borderColor: 'rgba(200,160,60,0.25)' }}>
            <input
              type="text"
              value={senderName}
              onChange={(e) => onSenderChange(e.target.value)}
              placeholder="Votre prénom..."
              maxLength={30}
              className="w-full bg-transparent font-handwriting text-rose-400 focus:outline-none placeholder:text-rose-200"
              style={{ fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Séparateur vertical */}
        <div className="absolute top-8 bottom-8 right-[45%]" style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(200,160,60,0.3) 20%, rgba(200,160,60,0.3) 80%, transparent)' }} />

        {/* Zone droite : timbre + lignes adresse */}
        <div className="absolute right-5 top-7 bottom-8 left-[57%] flex flex-col items-end gap-2">
          {/* Slot timbre */}
          <div
            className={`relative flex items-center justify-center transition-all duration-300
              ${selectedStamp ? '' : 'border-2 border-dashed rounded-sm bg-amber-50/40'}
            `}
            style={{ width: '72px', height: '88px', borderColor: selectedStamp ? 'transparent' : 'rgba(200,160,60,0.4)' }}
          >
            {selectedStamp ? (
              <motion.img
                initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: -4 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                src={selectedStamp.file}
                alt={selectedStamp.name}
                style={{ width: '72px', height: '88px', objectFit: 'contain', filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.25))' }}
              />
            ) : (
              <div className="text-center">
                <div style={{ fontSize: '18px', color: 'rgba(200,160,60,0.4)' }}>✉</div>
                <span className="text-amber-300/60 font-serif" style={{ fontSize: '9px' }}>timbre</span>
              </div>
            )}
          </div>

          {/* Lignes adresse (déco) */}
          <div className="flex-1 w-full flex flex-col justify-end gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full" style={{ height: '1px', background: 'rgba(200,160,60,0.25)' }} />
            ))}
            <div className="mt-1 text-right">
              <span className="font-handwriting text-rose-300/80 italic" style={{ fontSize: '11px' }}>avec amour 💌</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

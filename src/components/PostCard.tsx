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

  return (
    <motion.div
      ref={cardRef}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      className="relative w-full mx-auto"
      style={{ filter: 'drop-shadow(0 24px 48px rgba(180,80,80,0.18))' }}
    >
      <div className="absolute -bottom-3 left-6 right-6 h-4 rounded-full bg-rose-200/30 blur-md" />

      {/* Card body — hauteur fixe généreuse */}
      <div
        className="relative rounded-2xl overflow-hidden flex flex-row"
        style={{
          height: '380px',
          background: 'linear-gradient(160deg, #fffef7 0%, #fef9e7 35%, #fefce8 70%, #fdf6e3 100%)',
          boxShadow: '0 2px 0 #e8d5a3, inset 0 0 60px rgba(200,150,50,0.06)',
        }}
      >
        {/* Texture lignes papier */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(180,140,60,0.07) 31px, rgba(180,140,60,0.07) 32px)',
          backgroundPosition: '0 48px',
        }}/>

        {/* Bordures dorées */}
        <div className="absolute inset-2 rounded-xl pointer-events-none" style={{ border: '1.5px solid rgba(200,160,60,0.35)' }} />
        <div className="absolute inset-[14px] rounded-xl pointer-events-none" style={{ border: '0.5px solid rgba(200,160,60,0.18)' }} />

        {/* ── ZONE GAUCHE : message ── */}
        <div className="flex-1 flex flex-col px-7 pt-8 pb-6 relative min-w-0">
          {/* Décors floraux */}
          <div className="absolute top-5 left-5 pointer-events-none select-none" style={{ fontSize: '20px', color: '#e8c4c4', opacity: 0.5 }}>❀</div>
          <div className="absolute bottom-5 left-5 pointer-events-none select-none" style={{ fontSize: '15px', color: '#e8c4c4', opacity: 0.4 }}>❀</div>

          {/* Textarea message — prend tout l'espace disponible */}
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Écrivez votre message ici..."
            maxLength={300}
            className="flex-1 w-full resize-none bg-transparent font-handwriting text-gray-700 focus:outline-none placeholder:text-amber-300/70"
            style={{
              fontSize: '17px',
              lineHeight: '2',
              paddingLeft: '18px',
            }}
          />

          {/* Prénom */}
          <div className="pt-3 mt-1" style={{ borderTop: '1px solid rgba(200,160,60,0.25)' }}>
            <input
              type="text"
              value={senderName}
              onChange={(e) => onSenderChange(e.target.value)}
              placeholder="Votre prénom..."
              maxLength={30}
              className="w-full bg-transparent font-handwriting text-rose-400 focus:outline-none placeholder:text-rose-200"
              style={{ fontSize: '15px', paddingLeft: '18px' }}
            />
          </div>
        </div>

        {/* Séparateur vertical */}
        <div className="self-stretch my-8" style={{
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(200,160,60,0.35) 20%, rgba(200,160,60,0.35) 80%, transparent)',
          flexShrink: 0,
        }} />

        {/* ── ZONE DROITE : timbre + lignes adresse ── */}
        <div className="flex flex-col items-end px-5 pt-7 pb-6 gap-4" style={{ width: '140px', flexShrink: 0 }}>
          {/* Slot timbre */}
          <div
            className={`flex items-center justify-center transition-all duration-300 ${selectedStamp ? '' : 'border-2 border-dashed rounded-sm bg-amber-50/40'}`}
            style={{
              width: '80px',
              height: '96px',
              borderColor: selectedStamp ? 'transparent' : 'rgba(200,160,60,0.4)',
            }}
          >
            {selectedStamp ? (
              <motion.img
                initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: -4 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                src={selectedStamp.file}
                alt={selectedStamp.name}
                style={{ width: '80px', height: '96px', objectFit: 'contain', filter: 'drop-shadow(2px 3px 6px rgba(0,0,0,0.25))' }}
              />
            ) : (
              <div className="text-center">
                <div style={{ fontSize: '22px', color: 'rgba(200,160,60,0.4)' }}>✉</div>
                <span className="font-serif" style={{ fontSize: '10px', color: 'rgba(200,160,60,0.5)' }}>timbre</span>
              </div>
            )}
          </div>

          {/* Lignes adresse */}
          <div className="flex-1 w-full flex flex-col justify-end gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full" style={{ height: '1px', background: 'rgba(200,160,60,0.3)' }} />
            ))}
            <div className="mt-1 text-right">
              <span className="font-handwriting text-rose-300/80 italic" style={{ fontSize: '12px' }}>avec amour 💌</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

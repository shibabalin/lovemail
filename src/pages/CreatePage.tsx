import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PostCard from '../components/PostCard'
import StampGallery from '../components/StampGallery'
import SendAnimation from '../components/SendAnimation'
import ShareCode from '../components/ShareCode'
import { createLetter } from '../lib/supabase'
import type { Stamp } from '../types'

type Phase = 'create' | 'sending' | 'done'

export default function CreatePage() {
  const [message, setMessage] = useState('')
  const [senderName, setSenderName] = useState('')
  const [selectedStamp, setSelectedStamp] = useState<Stamp | null>(null)
  const [phase, setPhase] = useState<Phase>('create')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const canSend = message.trim().length > 0 && selectedStamp !== null

  const handleSend = async () => {
    if (!canSend || loading) return
    setError('')
    setLoading(true)

    const { code: newCode, error: err } = await createLetter(
      message.trim(),
      selectedStamp!.id,
      senderName.trim() || null
    )

    if (err) {
      setError('Erreur lors de l\'envoi. Vérifiez votre connexion et réessayez.')
      setLoading(false)
      return
    }

    setCode(newCode)
    setPhase('sending')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #fff5f7 0%, #fdf2f8 40%, #fef9f0 100%)' }}>

      <AnimatePresence mode="wait">
        {phase === 'sending' && (
          <SendAnimation key="sending" onComplete={() => setPhase('done')} />
        )}

        {phase === 'done' && (
          <motion.main
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex items-center justify-center px-4 py-8"
          >
            <ShareCode code={code} />
          </motion.main>
        )}

        {phase === 'create' && (
          <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col flex-1">

            {/* Header premium */}
            <header className="pt-8 pb-6 text-center relative overflow-hidden">
              {/* Petits cœurs déco en arrière-plan */}
              <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                {['12%', '25%', '75%', '88%'].map((left, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-rose-200"
                    style={{ left, top: `${20 + i * 15}%`, fontSize: `${14 + i * 4}px`, opacity: 0.4 }}
                    animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                  >♥</motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                {/* Logo enveloppe */}
                <motion.div
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-5xl mb-3 inline-block"
                >💌</motion.div>

                <h1 className="font-serif font-semibold tracking-wide" style={{ fontSize: '38px', color: '#be185d', letterSpacing: '0.04em' }}>
                  LoveMail
                </h1>
                <p className="font-handwriting mt-1" style={{ fontSize: '17px', color: '#f472b6' }}>
                  des mots qui voyagent jusqu'au cœur
                </p>
              </motion.div>

              {/* Lien ouvrir */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3"
              >
                <a
                  href="/lovemail/ouvrir"
                  className="inline-flex items-center gap-1.5 text-sm text-rose-400 hover:text-rose-600 transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Vous avez reçu un code ?</span>
                  <span className="underline underline-offset-2 font-medium">Ouvrir ma lettre →</span>
                </a>
              </motion.div>
            </header>

            <main className="flex-1 px-4 pb-10">
              <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Colonne gauche — timbres */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="lg:col-span-1 order-2 lg:order-1"
                >
                  <div className="rounded-2xl p-5 border" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', borderColor: 'rgba(251,207,232,0.5)', boxShadow: '0 4px 24px rgba(190,24,93,0.07)' }}>
                    <StampGallery selectedStamp={selectedStamp} onSelect={setSelectedStamp} />
                  </div>

                  {/* Astuce */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 rounded-xl p-3.5 border"
                    style={{ background: 'rgba(255,241,242,0.7)', borderColor: 'rgba(251,207,232,0.5)' }}
                  >
                    <p className="text-xs leading-relaxed" style={{ color: '#be185d' }}>
                      💡 Choisissez un timbre, écrivez votre message, puis envoyez — vous recevrez un <strong>code secret</strong> à partager.
                    </p>
                  </motion.div>
                </motion.div>

                {/* Colonne droite — carte + bouton */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="lg:col-span-2 order-1 lg:order-2 space-y-5"
                >
                  <PostCard
                    message={message}
                    senderName={senderName}
                    selectedStamp={selectedStamp}
                    onStampDrop={setSelectedStamp}
                    onMessageChange={setMessage}
                    onSenderChange={setSenderName}
                  />

                  {/* Compteur + avertissement timbre */}
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs" style={{ color: 'rgba(180,80,100,0.5)' }}>{message.length}/300</span>
                    {!selectedStamp && message.length > 0 && (
                      <motion.span
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs font-medium"
                        style={{ color: '#f59e0b' }}
                      >
                        ⚠️ Choisissez un timbre pour envoyer
                      </motion.span>
                    )}
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl px-4 py-3 text-sm border"
                      style={{ background: '#fff1f2', borderColor: '#fecdd3', color: '#be123c' }}
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Bouton envoyer */}
                  <motion.button
                    whileHover={canSend ? { scale: 1.02, y: -2 } : {}}
                    whileTap={canSend ? { scale: 0.98 } : {}}
                    onClick={handleSend}
                    disabled={!canSend || loading}
                    className="w-full py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300"
                    style={canSend ? {
                      background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
                      boxShadow: '0 8px 32px rgba(244,63,94,0.35), 0 2px 8px rgba(244,63,94,0.2)',
                      cursor: 'pointer',
                    } : {
                      background: '#e5e7eb',
                      color: '#9ca3af',
                      cursor: 'not-allowed',
                      boxShadow: 'none',
                    }}
                  >
                    {loading ? '⏳ Envoi en cours...' : '💌 Envoyer ma lettre'}
                  </motion.button>
                </motion.div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

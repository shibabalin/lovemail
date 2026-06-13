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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl text-rose-700 font-semibold tracking-wide">
            LoveMail
          </h1>
          <p className="text-rose-400 font-handwriting text-lg mt-1">
            des mots qui voyagent jusqu'au cœur
          </p>
        </motion.div>
      </header>

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
          <motion.main
            key="create"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 px-4 py-4 pb-8"
          >
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column — stamp gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1 order-2 lg:order-1"
              >
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-rose-100">
                  <StampGallery selectedStamp={selectedStamp} onSelect={setSelectedStamp} />
                </div>

                {/* Tips */}
                <div className="mt-4 bg-rose-50 rounded-xl p-3 border border-rose-100">
                  <p className="text-xs text-rose-500 leading-relaxed">
                    💡 <strong>Comment ça marche ?</strong><br />
                    Écrivez votre message, choisissez un timbre, envoyez — vous recevrez un code secret à partager avec votre destinataire.
                  </p>
                </div>
              </motion.div>

              {/* Right column — card + send */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 order-1 lg:order-2 space-y-6"
              >
                <PostCard
                  message={message}
                  senderName={senderName}
                  selectedStamp={selectedStamp}
                  onStampDrop={setSelectedStamp}
                  onMessageChange={setMessage}
                  onSenderChange={setSenderName}
                />

                {/* Character count */}
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs text-gray-400">{message.length}/300 caractères</span>
                  {!selectedStamp && (
                    <span className="text-xs text-amber-500">⚠️ Choisissez un timbre</span>
                  )}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Send button */}
                <motion.button
                  whileHover={canSend ? { scale: 1.02, y: -2 } : {}}
                  whileTap={canSend ? { scale: 0.98 } : {}}
                  onClick={handleSend}
                  disabled={!canSend || loading}
                  className={`w-full py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 shadow-lg
                    ${canSend
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-rose-200 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed shadow-none'
                    }
                  `}
                >
                  {loading ? '⏳ Envoi en cours...' : '💌 Envoyer ma lettre'}
                </motion.button>

                {/* Nav to open */}
                <p className="text-center text-sm text-gray-400">
                  Vous avez reçu un code ?{' '}
                  <a href="/lovemail/ouvrir" className="text-rose-500 hover:text-rose-700 underline underline-offset-2 transition-colors">
                    Ouvrir ma lettre
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

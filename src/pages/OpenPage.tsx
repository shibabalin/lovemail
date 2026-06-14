import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import EnvelopeAnimation from '../components/EnvelopeAnimation'
import { getLetter, markLetterOpened } from '../lib/supabase'
import type { Letter } from '../types'

export default function OpenPage() {
  const { code: urlCode } = useParams<{ code?: string }>()
  // Lire aussi le paramètre query ?code=LOVE-XXXXXX
  const queryCode = new URLSearchParams(window.location.search).get('code') ?? ''
  const initialCode = urlCode ?? queryCode
  const [inputCode, setInputCode] = useState(initialCode)
  const [letter, setLetter] = useState<Letter | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [phase, setPhase] = useState<'input' | 'reveal'>('input')

  // Auto-load si code présent dans l'URL (path param ou query param)
  useEffect(() => {
    if (initialCode) {
      handleOpen(initialCode)
    }
  }, [])

  const handleOpen = async (code?: string) => {
    const target = (code ?? inputCode).toUpperCase().trim()
    if (!target) return

    setLoading(true)
    setError('')

    const { letter: found, error: err } = await getLetter(target)

    if (err || !found) {
      setError('Aucune lettre trouvée avec ce code. Vérifiez qu\'il est correct.')
      setLoading(false)
      return
    }

    setLetter(found)
    setPhase('reveal')
    markLetterOpened(found.code)
    setLoading(false)
  }

  const formatCode = (value: string) => {
    // Auto-format: LOVE-XXXXXX
    const clean = value.toUpperCase().replace(/[^A-Z0-9-]/g, '')
    return clean.slice(0, 11)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a href="/lovemail/" className="inline-block">
            <h1 className="font-serif text-4xl text-rose-700 font-semibold tracking-wide">
              LoveMail
            </h1>
          </a>
          <p className="text-rose-400 font-handwriting text-lg mt-1">
            une lettre vous attend 💌
          </p>
        </motion.div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {phase === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-sm mx-auto"
            >
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-rose-100 space-y-6 text-center">
                {/* Envelope illustration */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex justify-center"
                >
                  <svg width="120" height="84" viewBox="0 0 120 84" xmlns="http://www.w3.org/2000/svg"
                    style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }}
                  >
                    <rect x="0" y="18" width="120" height="66" rx="6" fill="#fce4ec" stroke="#f48fb1" strokeWidth="1.5"/>
                    <polygon points="0,18 60,56 120,18" fill="#f8bbd9" stroke="#f48fb1" strokeWidth="1"/>
                    <polygon points="0,18 0,84 48,51" fill="#fad0e4"/>
                    <polygon points="120,18 120,84 72,51" fill="#fad0e4"/>
                    <text x="60" y="44" textAnchor="middle" fontSize="14" fill="#e91e63">♥</text>
                  </svg>
                </motion.div>

                <div className="space-y-1">
                  <h2 className="font-serif text-2xl text-rose-700 font-semibold">
                    Votre lettre vous attend
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Entrez le code secret que vous avez reçu
                  </p>
                </div>

                {/* Code input */}
                <div className="space-y-3">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(formatCode(e.target.value))}
                    onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
                    placeholder="LOVE-XXXXXX"
                    maxLength={11}
                    className="w-full text-center font-mono text-xl font-bold text-rose-600 tracking-widest border-2 border-rose-200 rounded-2xl px-4 py-3 bg-rose-50/50 focus:outline-none focus:border-rose-400 focus:bg-white transition-all placeholder:text-rose-200 placeholder:font-mono"
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck={false}
                  />

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleOpen()}
                    disabled={loading || !inputCode.trim()}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-base hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-200"
                  >
                    {loading ? '⏳ Recherche...' : '💌 Ouvrir ma lettre'}
                  </motion.button>
                </div>

                <p className="text-xs text-gray-400">
                  Vous souhaitez envoyer une lettre ?{' '}
                  <a href="/lovemail/" className="text-rose-500 hover:text-rose-700 underline underline-offset-2 transition-colors">
                    Créer une carte postale
                  </a>
                </p>
              </div>
            </motion.div>
          )}

          {phase === 'reveal' && letter && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-lg"
            >
              <EnvelopeAnimation letter={letter} />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="mt-6 text-center"
              >
                <a
                  href="/lovemail/"
                  className="text-sm text-rose-400 hover:text-rose-600 underline underline-offset-2 transition-colors"
                >
                  Envoyer une lettre à mon tour 💌
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

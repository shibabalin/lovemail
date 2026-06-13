import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  code: string
}

export default function ShareCode({ code }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/lovemail/ouvrir/${code}`
    const text = `J'ai une lettre pour toi 💌\nEntre ce code sur LoveMail : ${code}\nOu ouvre ce lien : ${url}`

    if (navigator.share) {
      try {
        await navigator.share({ title: 'LoveMail 💌', text })
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`💌 J'ai une lettre pour toi ! Ton code : *${code}* — ouvre-la sur https://lovemail.app/ouvrir`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(`https://lovemail.app/ouvrir/${code}`)}&text=${encodeURIComponent(`💌 J'ai une lettre pour toi ! Ton code : ${code}`)}`,
    sms: `sms:?body=${encodeURIComponent(`💌 J'ai une lettre pour toi ! Ton code LoveMail : ${code}`)}`,
    email: `mailto:?subject=${encodeURIComponent('Une lettre pour toi 💌')}&body=${encodeURIComponent(`Bonjour,\n\nJ'ai une surprise pour toi sur LoveMail !\n\nTon code secret : ${code}\n\nRends-toi sur https://lovemail.app/ouvrir et entre ce code.\n\nAvec amour 💌`)}`,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto text-center"
    >
      {/* Success header */}
      <div className="space-y-2">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl"
        >
          💌
        </motion.div>
        <h2 className="font-serif text-2xl text-rose-700 font-semibold">
          Votre lettre est prête !
        </h2>
        <p className="text-gray-500 text-sm">
          Partagez ce code à la personne de votre choix
        </p>
      </div>

      {/* Code display */}
      <div className="w-full">
        <div
          className="relative bg-white border-2 border-rose-200 rounded-2xl px-6 py-4 shadow-inner"
          style={{ background: 'linear-gradient(135deg, #fff1f2, #fce7f3)' }}
        >
          <p className="font-mono text-3xl font-bold text-rose-600 tracking-widest letter-spacing">
            {code}
          </p>
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute -top-1 -right-1 text-rose-100 text-4xl opacity-30 select-none">♥</div>
            <div className="absolute -bottom-1 -left-1 text-rose-100 text-3xl opacity-30 select-none">♥</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 w-full">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-rose-200 text-rose-600 rounded-xl py-3 text-sm font-medium hover:bg-rose-50 transition-colors shadow-sm"
        >
          {copied ? '✓ Copié !' : '📋 Copier'}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-rose-500 text-white rounded-xl py-3 text-sm font-medium hover:bg-rose-600 transition-colors shadow-md"
        >
          🔗 Partager
        </motion.button>
      </div>

      {/* Share via */}
      <div className="w-full space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-widest">Partager via</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { href: shareLinks.whatsapp, emoji: '💬', label: 'WhatsApp', color: 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100' },
            { href: shareLinks.telegram, emoji: '✈️', label: 'Telegram', color: 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' },
            { href: shareLinks.sms, emoji: '📱', label: 'SMS', color: 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100' },
            { href: shareLinks.email, emoji: '📧', label: 'Email', color: 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100' },
          ].map(({ href, emoji, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-1 border rounded-xl py-2.5 text-xs transition-colors ${color}`}
            >
              <span className="text-lg">{emoji}</span>
              <span className="font-medium">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Create another */}
      <a
        href="/lovemail/"
        className="text-sm text-rose-400 hover:text-rose-600 underline underline-offset-2 transition-colors"
      >
        Créer une nouvelle lettre
      </a>
    </motion.div>
  )
}

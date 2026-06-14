import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  code: string
}

export default function ShareCode({ code }: Props) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Lien direct qui ouvre automatiquement la carte
  const directUrl = `${window.location.origin}/lovemail/ouvrir?code=${code}`

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(directUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2500)
  }

  const message = `💌 J'ai une lettre pour toi — clique ici pour l'ouvrir :\n${directUrl}`
  const messageEncoded = encodeURIComponent(message)
  const emailSubject = encodeURIComponent('Une lettre pour toi 💌')
  const emailBody = encodeURIComponent(
    `Bonjour,\n\nJ'ai quelque chose pour toi sur LoveMail.\n\nClique sur ce lien pour ouvrir ta lettre :\n${directUrl}\n\nAvec amour 💌`
  )

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${messageEncoded}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(directUrl)}&text=${encodeURIComponent("💌 J'ai une lettre pour toi")}`,
    sms: `sms:?body=${messageEncoded}`,
    email: `mailto:?subject=${emailSubject}&body=${emailBody}`,
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LoveMail 💌',
          text: "💌 J'ai une lettre pour toi",
          url: directUrl,
        })
      } catch {
        // annulé
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto text-center"
    >
      {/* Header */}
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
          Partagez le lien — votre lettre s'ouvrira directement
        </p>
      </div>

      {/* Lien direct — zone principale */}
      <div className="w-full space-y-2">
        <div
          className="relative rounded-2xl px-4 py-3 text-left border-2 border-rose-200 bg-rose-50 overflow-hidden cursor-pointer group"
          onClick={handleCopyLink}
          title="Cliquer pour copier"
        >
          <p className="text-xs text-rose-400 font-medium mb-1 uppercase tracking-wide">Lien direct</p>
          <p className="font-mono text-xs text-rose-600 break-all leading-relaxed pr-8">
            {directUrl}
          </p>
          <div className="absolute top-3 right-3 text-rose-300 group-hover:text-rose-500 transition-colors">
            {copiedLink ? '✓' : '📋'}
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-1.5 border border-rose-200 text-rose-600 rounded-xl py-2.5 text-sm font-medium hover:bg-rose-50 transition-colors bg-white shadow-sm"
          >
            {copiedLink ? '✓ Copié !' : '📋 Copier le lien'}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleNativeShare}
            className="flex-1 flex items-center justify-center gap-1.5 bg-rose-500 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-rose-600 transition-colors shadow-md"
          >
            🔗 Partager
          </motion.button>
        </div>
      </div>

      {/* Partage direct via apps */}
      <div className="w-full space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-widest">Envoyer via</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { href: shareLinks.whatsapp, emoji: '💬', label: 'WhatsApp', color: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' },
            { href: shareLinks.telegram, emoji: '✈️', label: 'Telegram', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
            { href: shareLinks.sms, emoji: '📱', label: 'SMS', color: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100' },
            { href: shareLinks.email, emoji: '📧', label: 'Email', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
          ].map(({ href, emoji, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-1 border rounded-xl py-2.5 text-xs transition-colors ${color}`}
            >
              <span className="text-xl">{emoji}</span>
              <span className="font-medium">{label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Code de secours (discret) */}
      <div className="w-full">
        <details className="text-left">
          <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-500 transition-colors select-none">
            Voir le code de secours
          </summary>
          <div className="mt-2 flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
            <span className="font-mono text-base font-bold text-rose-500 tracking-widest flex-1">{code}</span>
            <button
              onClick={handleCopyCode}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {copiedCode ? '✓' : '📋'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1 px-1">À utiliser sur lovemail.app/ouvrir si le lien ne marche pas</p>
        </details>
      </div>

      <a
        href="/lovemail/"
        className="text-sm text-rose-400 hover:text-rose-600 underline underline-offset-2 transition-colors"
      >
        Créer une nouvelle lettre
      </a>
    </motion.div>
  )
}

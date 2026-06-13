import { createClient } from '@supabase/supabase-js'
import type { Letter } from '../types'

// Remplacez ces valeurs par vos clés Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Génère un code unique LOVE-XXXXXX
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = 'LOVE-'
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function createLetter(
  message: string,
  stamp: string,
  senderName: string | null
): Promise<{ code: string; error: string | null }> {
  // Générer un code unique
  let code = generateCode()
  let attempts = 0

  while (attempts < 5) {
    const { data: existing } = await supabase
      .from('letters')
      .select('code')
      .eq('code', code)
      .single()

    if (!existing) break
    code = generateCode()
    attempts++
  }

  const { error } = await supabase.from('letters').insert({
    code,
    message,
    stamp,
    sender_name: senderName || null,
    opened: false,
  })

  if (error) return { code: '', error: error.message }
  return { code, error: null }
}

export async function getLetter(code: string): Promise<{ letter: Letter | null; error: string | null }> {
  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('code', code.toUpperCase().trim())
    .single()

  if (error) return { letter: null, error: 'Aucune lettre trouvée avec ce code.' }
  return { letter: data as Letter, error: null }
}

export async function markLetterOpened(code: string): Promise<void> {
  await supabase
    .from('letters')
    .update({ opened: true, opened_at: new Date().toISOString() })
    .eq('code', code)
    .eq('opened', false)
}

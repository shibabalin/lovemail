export interface Letter {
  id: string
  code: string
  message: string
  sender_name: string | null
  stamp: string
  created_at: string
  opened: boolean
  opened_at: string | null
}

export interface Stamp {
  id: string
  name: string
  file: string
  label: string
}

-- Script SQL à exécuter dans Supabase > SQL Editor

-- 1. Créer la table letters
CREATE TABLE IF NOT EXISTS letters (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code       VARCHAR(11) UNIQUE NOT NULL,
  message    TEXT NOT NULL,
  stamp      VARCHAR(50) NOT NULL,
  sender_name VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  opened     BOOLEAN DEFAULT FALSE,
  opened_at  TIMESTAMP WITH TIME ZONE
);

-- 2. Index pour recherche par code (rapide)
CREATE INDEX IF NOT EXISTS idx_letters_code ON letters(code);

-- 3. Row Level Security — tout le monde peut lire et créer (pas besoin de compte)
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut insérer une lettre
CREATE POLICY "Tout le monde peut créer une lettre"
  ON letters FOR INSERT
  WITH CHECK (true);

-- Politique : tout le monde peut lire par code
CREATE POLICY "Tout le monde peut lire une lettre"
  ON letters FOR SELECT
  USING (true);

-- Politique : tout le monde peut marquer comme ouvert
CREATE POLICY "Tout le monde peut ouvrir une lettre"
  ON letters FOR UPDATE
  USING (true)
  WITH CHECK (true);

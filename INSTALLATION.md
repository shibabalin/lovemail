# 💌 LoveMail — Guide d'installation

## Prérequis

- Node.js 18+
- Un compte [Supabase](https://supabase.com) (gratuit)
- Un compte [GitHub](https://github.com) (pour le déploiement)

---

## 1. Configurer Supabase

1. Créez un nouveau projet sur [supabase.com](https://supabase.com)
2. Allez dans **SQL Editor** et exécutez le contenu de `supabase_setup.sql`
3. Récupérez vos clés dans **Project Settings → API** :
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` → `VITE_SUPABASE_ANON_KEY`

---

## 2. Configuration locale

```bash
# Copiez le fichier d'exemple
cp .env.example .env

# Éditez .env avec vos clés Supabase
VITE_SUPABASE_URL=https://VOTRE_PROJET.supabase.co
VITE_SUPABASE_ANON_KEY=votre_anon_key_ici
```

---

## 3. Installer et lancer en local

```bash
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:5173/lovemail/`

---

## 4. Déployer sur GitHub Pages

### 4a. Créer le repo GitHub

```bash
git init
git add .
git commit -m "Initial commit — LoveMail"
git remote add origin https://github.com/VOTRE_USERNAME/lovemail.git
git push -u origin main
```

### 4b. Ajouter les secrets GitHub

Dans votre repo GitHub → **Settings → Secrets and variables → Actions** :

- `VITE_SUPABASE_URL` → votre URL Supabase
- `VITE_SUPABASE_ANON_KEY` → votre clé anon

### 4c. Activer GitHub Pages

Dans **Settings → Pages** :
- Source : `gh-pages` branch
- Le déploiement se déclenche automatiquement à chaque push sur `main`

L'app sera accessible sur : `https://VOTRE_USERNAME.github.io/lovemail/`

---

## 5. Ajouter des timbres

Déposez un fichier SVG (120×140px) dans `/public/stamps/` puis ajoutez une entrée dans `src/lib/stamps.ts` :

```ts
{
  id: 'mon-timbre',
  name: 'Mon timbre',
  file: '/lovemail/stamps/mon-timbre.svg',
  label: '🌸 Mon timbre',
},
```

---

## Structure des fichiers

```
lovemail/
├── public/
│   ├── stamps/          # Timbres SVG
│   │   ├── bear.svg
│   │   ├── lake.svg
│   │   └── night.svg
│   └── 404.html         # Redirect GitHub Pages
├── src/
│   ├── components/
│   │   ├── PostCard.tsx         # La carte postale
│   │   ├── StampGallery.tsx     # Galerie de timbres
│   │   ├── SendAnimation.tsx    # Animation d'envoi
│   │   ├── EnvelopeAnimation.tsx # Animation d'ouverture
│   │   └── ShareCode.tsx        # Partage du code
│   ├── pages/
│   │   ├── CreatePage.tsx       # Page création
│   │   └── OpenPage.tsx         # Page /ouvrir
│   ├── lib/
│   │   ├── supabase.ts          # Client Supabase + helpers
│   │   └── stamps.ts            # Liste des timbres
│   └── types/index.ts
├── supabase_setup.sql   # Script SQL à exécuter dans Supabase
├── .env.example
└── vite.config.ts
```

---

## 🔧 Personnalisation

- **Nom du repo différent** : modifiez `base: '/lovemail/'` dans `vite.config.ts` et `basename="/lovemail"` dans `src/main.tsx`
- **Domaine custom** : ajoutez un fichier `public/CNAME` avec votre domaine

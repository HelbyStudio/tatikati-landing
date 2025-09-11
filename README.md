# 🎧 Tatikati Landing - Site vitrine Astro

Site vitrine moderne pour l'application Tatikati, créé avec Astro 5 et le design system "julias".

## ✨ Fonctionnalités

### 🏗️ Architecture
- **Astro 5** avec TypeScript en mode strict
- **Astro Islands** pour l'interactivité (PodcastScroller)
- **Content Collections** pour la gestion du blog
- **Tailwind CSS** avec design system personnalisé
- **MDX** pour le contenu riche du blog

### 🎨 Design System "Julias"
- **Palette de couleurs** : #FF6B6B, #FFA94D, #4D96FF, #6BCB77
- **Typographie** : Mochiy Pop One (titres) + Inter (corps)
- **Tokens CSS** avec custom properties
- **Mode sombre** intégré
- **Design mobile-first** responsive

### 🔍 SEO & Performance
- ✅ Meta tags OpenGraph & Twitter Cards
- ✅ Sitemap XML automatique
- ✅ Données structurées (Schema.org)
- ✅ Favicon SVG personnalisé
- ✅ Robots.txt optimisé
- ✅ Manifest PWA
- ✅ Preload des fonts critiques
- ✅ Images optimisées et lazy loading

### ♿ Accessibilité
- ✅ Standards WCAG AA
- ✅ Navigation au clavier
- ✅ Skip navigation
- ✅ Textes alternatifs
- ✅ Contrast ratio optimal
- ✅ Aria labels et rôles

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd tatikati-landing

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:4321`

## 📁 Structure du projet

```
/
├── public/              # Assets statiques
│   ├── favicon.svg      # Favicon personnalisé
│   ├── manifest.json    # Manifest PWA
│   ├── robots.txt       # Directives SEO
│   └── sitemap-index.xml # Sitemap principal
├── src/
│   ├── components/      # Composants Astro
│   │   ├── NavBar.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── PodcastScroller.astro    # Astro Island
│   │   ├── PodcastScroller.ts       # Logique interactive
│   │   ├── Reviews.astro
│   │   ├── FAQ.astro
│   │   ├── Footer.astro
│   │   └── StructuredData.astro     # Schema.org
│   ├── content/         # Content Collections
│   │   ├── blog/        # Articles de blog en MDX
│   │   └── config.ts    # Configuration des collections
│   ├── data/           # Données statiques
│   │   ├── features.ts
│   │   ├── podcasts.ts
│   │   └── reviews.ts
│   ├── layouts/        # Layouts de page
│   │   ├── BaseLayout.astro
│   │   └── BlogLayout.astro
│   ├── pages/          # Pages du site
│   │   ├── index.astro      # Page d'accueil
│   │   ├── blog/           # Pages blog
│   │   ├── privacy.astro   # Politique de confidentialité
│   │   └── terms.astro     # Conditions d'utilisation
│   └── styles/
│       └── global.css   # Design system & styles globaux
└── astro.config.mjs    # Configuration Astro
```

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev          # Serveur de dev avec hot reload
npm run preview      # Preview de la build de production

# Production
npm run build        # Build pour la production
npm run check        # Vérification TypeScript

# Qualité
npm run format       # Formatage avec Prettier
```

## 📝 Content Collections

### Articles de blog

Créer un nouvel article dans `src/content/blog/` :

```markdown
---
title: "Mon titre d'article"
description: "Description SEO"
pubDate: 2024-01-01
category: "éducation"
tags: ["enfants", "podcasts"]
featured: true
image: "/images/article.jpg"
imageAlt: "Description de l'image"
---

Contenu de l'article en MDX...
```

Les articles supportent :
- **MDX** pour le contenu riche
- **Images** optimisées automatiquement
- **Catégories** et **tags** 
- **Articles featured** mis en avant
- **SEO** automatique avec meta tags

## 🎨 Personnalisation du design

### Couleurs du theme "julias"
Modifiez les couleurs dans `src/styles/global.css` :

```css
:root {
  --color-accent-1: #FF6B6B; /* Rouge corail */
  --color-accent-2: #FFA94D; /* Orange */  
  --color-accent-3: #4D96FF; /* Bleu */
  --color-accent-4: #6BCB77; /* Vert */
}
```

### Typographie
- **Titres** : Mochiy Pop One (Google Fonts)
- **Corps** : Inter (Fontsource)
- **Tailles** : Scale modulaire avec clamp()

### Composants
Chaque composant a son propre scope CSS et utilise les tokens du design system.

## 🏝️ Astro Islands

### PodcastScroller
Composant interactif avec :
- **Carousel** tactile et souris
- **Autoplay** configurable
- **Modal** pour les détails
- **Analytics** tracking
- **Accessibilité** complète

Le code JavaScript est dans `PodcastScroller.ts` et s'hydrate côté client uniquement.

## 🔍 SEO & Métadonnées

### Configuration
Base URL définie dans `astro.config.mjs` :
```js
site: 'https://tatikati.app'
```

### Données structurées
Types supportés :
- `WebSite` (page d'accueil)
- `BlogPosting` (articles)
- `Organization` (entreprise)
- `MobileApplication` (app)

### Sitemap
Généré automatiquement par l'intégration `@astrojs/sitemap`.

## 📱 PWA Ready

Le site inclut un manifest PWA dans `/public/manifest.json` avec :
- Icônes adaptives
- Couleurs de thème
- Shortcuts vers sections clés
- Support offline basique

## 🌐 Déploiement

### Netlify (recommandé)
1. Connecter le repo GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Variables d'environnement si nécessaire

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Build statique
```bash
npm run build
# Les fichiers sont dans /dist
```

## 🤝 Contribution

### Standards de code
- **TypeScript** strict activé
- **Prettier** pour le formatage
- **ESLint** pour la qualité
- **Accessibilité** WCAG AA minimum

### Workflow
1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Push et créer une PR

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question :
- 📧 Email : contact@tatikati.app  
- 🐛 Issues : GitHub Issues
- 📖 Docs : [Astro Documentation](https://docs.astro.build)

---

**Créé avec ❤️ par l'équipe Tatikati**

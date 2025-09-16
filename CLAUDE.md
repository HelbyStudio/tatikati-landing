# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro 5 landing page project for HELBY's "tatikati-landing" site - a French podcast app for children. It's configured as a **server-side rendered (SSR)** application using Node.js standalone mode, deployed on Railway with Brevo email integration.

## Development Commands

All commands should be run from the project root:

```bash
# Install dependencies
npm install

# Start development server at localhost:4321
npm run dev

# Build production site to ./dist/
npm run build

# Start production server (Railway uses this)
npm run start

# Preview production build locally
npm run preview

# Type-check and lint the project
npm run lint

# Format code with Prettier
npm run format

# Access Astro CLI directly
npm run astro

# Sync and generate TypeScript types
npm run astro -- sync
```

## Architecture

### Core Structure
- **Astro 5** with TypeScript (strict mode)
- **SSR Mode**: Server-side rendering with Node.js adapter
- **i18n Support**: French (default) and English with automatic routing
- **Integrations**: Tailwind CSS, MDX, Sitemap generation
- **API Routes**: Newsletter subscription via Brevo API
- **Content Collections**: Type-safe blog content management

### Key Directories
```
src/
├── pages/
│   ├── en/          # English locale pages (en/index.astro, en/blog/)
│   ├── api/         # API endpoints (newsletter.ts)
│   ├── blog/        # French blog pages with [...slug].astro dynamic routing
│   └── *.astro      # French static pages (index, legal, privacy, terms, cookies)
├── i18n/
│   ├── translations.ts  # Translation keys and values for FR/EN
│   └── utils.ts         # i18n utility functions
├── content/
│   ├── blog/        # MDX blog posts (with locale support)
│   └── config.ts    # Content collection schemas
├── data/            # TypeScript data files (features, podcasts, reviews)
├── components/      # Reusable Astro components with locale support
├── layouts/         # Page layout templates with i18n
└── assets/          # Brand assets (logos in multiple formats)
```

### Content Management System
Uses Astro's Content Collections for type-safe blog management:

- **Blog Schema**: Defined in `src/content/config.ts`
- **Content Types**: MDX files in `src/content/blog/`
- **Dynamic Routing**: `[...slug].astro` handles all blog posts
- **Categories**: `conseils-parents`, `developpement-enfant`, `podcasts`, `education`, `technologie`, `actualites`

### Data Architecture
- **Features**: `src/data/features.ts` - App feature definitions with FontAwesome icons
- **Podcasts**: `src/data/podcasts.ts` - Podcast catalog data
- **Reviews**: `src/data/reviews.ts` - User testimonials

### Brand System
Complete brand asset system in `src/assets/`:
- **Combined**: Logo + text in black/white/colored variants
- **Icon**: Logo symbol only in black/white/colored variants  
- **Logotype**: Text only in black/white/colored variants (horizontal + vertical)

### Styling Architecture
- **Tailwind CSS**: Primary styling framework
- **Custom Theme**: Accent colors, custom fonts (Mochiy Pop One, Inter, Kalam)
- **Global Styles**: `src/styles/global.css`
- **Font Loading**: Preloaded critical fonts + Google Fonts (Kalam)

### Internationalization (i18n)
- **Locales**: French (default, no prefix) and English (`/en/` prefix)
- **Configuration**: `astro.config.mjs` with `prefixDefaultLocale: false`
- **Translation System**: Centralized translations in `src/i18n/translations.ts`
- **Component Support**: All components accept `locale` prop
- **URL Structure**:
  - French: `/`, `/blog`, `/legal` (no prefix)
  - English: `/en`, `/en/blog`, `/en/legal`
- **SEO**: Automatic hreflang tags and language-specific sitemaps

### API Integration
- **Newsletter API**: `src/pages/api/newsletter.ts`
- **Brevo Integration**: Email list management
- **Environment**: `BREVO_API_KEY` required for production
- **Error Handling**: Graceful degradation when API unavailable

## Deployment

**Railway Configuration**:
- **SSR Deployment**: Node.js server mode with standalone adapter
- **Environment Variables**: `BREVO_API_KEY` for email integration
- **Build Process**: `npm run build` → `npm run start`
- **Domain**: `https://tatikati.app`

## Component Development

### Layout System
- **BaseLayout**: Global layout with SEO, structured data, and font loading
- **BlogLayout**: Extends BaseLayout for blog posts
- **Props Interface**: Comprehensive SEO and metadata options

### Component Patterns
```astro
---
// Frontmatter: Props interface + component logic
export interface Props {
  title: string;
  items: Item[];
}
const { title, items } = Astro.props;
---

<!-- Template: HTML with component interpolation -->
<section class="container mx-auto">
  <h2 class="font-heading">{title}</h2>
  {items.map(item => <div>{item.name}</div>)}
</section>

<style>
  /* Scoped CSS - prefer Tailwind classes */
</style>
```

## Troubleshooting

```bash
# Check for TypeScript errors
npm run lint

# Regenerate types after content changes
npm run astro -- sync

# Clear cache and restart
rm -rf .astro/ && npm run dev

# Debug SSR issues
npm run build && npm run start

# Test newsletter API locally
curl -X POST http://localhost:4321/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro 5 landing page project for HELBY's "tatikati-landing" site. It's a clean, minimal Astro project using TypeScript and configured for Railway deployment.

## Development Commands

All commands should be run from the project root:

```bash
# Install dependencies
npm install

# Start development server at localhost:4321
npm run dev

# Build production site to ./dist/
npm run build

# Preview production build locally
npm run preview

# Access Astro CLI directly
npm run astro

# Type-check the project
npm run astro -- check

# Sync and generate TypeScript types
npm run astro -- sync
```

## Architecture

### Core Structure
- **Astro 5** with TypeScript (strict mode configuration)
- **File-based routing**: Pages in `src/pages/` become routes automatically
- **Component system**: `.astro` files with frontmatter + template + scoped styles
- **Static site generation**: Builds to `dist/` for deployment

### Key Directories
```
src/
├── pages/           # File-based routing (index.astro = homepage)
├── components/      # Reusable Astro components  
├── layouts/         # Page layout templates
└── assets/          # Processed images and assets
public/              # Static files served directly
```

### Component Pattern
Astro components follow this structure:
```astro
---
// Frontmatter: TypeScript/JavaScript logic
import Component from '../components/Component.astro';
const data = 'example';
---

<!-- Template: HTML with component interpolation -->
<Layout>
  <Component prop={data} />
</Layout>

<style>
  /* Scoped CSS styles */
</style>
```

### Asset Handling
- Images in `src/assets/` are processed and optimized by Astro
- Import with: `import logo from '../assets/logo.svg'`
- Use in template: `<img src={logo.src} alt="Logo" />`
- Files in `public/` are served as-is at root URL

### TypeScript Configuration
- Uses `astro/tsconfigs/strict` preset
- Types auto-generated in `.astro/types.d.ts`
- Includes all files via `"include": [".astro/types.d.ts", "**/*"]`

## Deployment

**Railway Configuration**:
- Uses RAILPACK builder (`railway.json`)
- Automatic builds from Git pushes
- Serves static files from `dist/` after running `npm run build`

## Troubleshooting

```bash
# Check for TypeScript errors
npm run astro -- check

# Regenerate types after adding new components/pages
npm run astro -- sync

# Clear cache if encountering build issues
rm -rf .astro/ && npm run dev
```
# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an Astro 5 landing page project for HELBY's "tatikati-landing" site. The project uses:

- **Astro 5.4.2** - Modern static site generator with component islands
- **TypeScript** - Configured in strict mode (`astro/tsconfigs/strict`)
- **Railway** - Deployment platform using RAILPACK builder
- **VS Code** - Configured with Astro extension and debug setup

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

# Useful Astro CLI commands
npm run astro -- add <integration>    # Add integrations
npm run astro -- check               # Type-check project
npm run astro -- sync                # Generate TypeScript types
npm run astro -- --help              # Get help
```

## Project Architecture

### File Structure
```
/
├── src/
│   ├── pages/           # File-based routing (index.astro = homepage)
│   ├── components/      # Reusable Astro components
│   ├── layouts/         # Page layout templates
│   └── assets/          # Images and static assets
├── public/              # Static files served directly
├── dist/                # Build output (generated)
└── .astro/              # Generated types and cache
```

### Key Architecture Concepts

**File-Based Routing**: Pages in `src/pages/` automatically become routes. `index.astro` serves the root URL.

**Component System**: Astro components (`.astro` files) combine HTML-like templates with JavaScript/TypeScript frontmatter. Components in `src/components/` are reusable across pages.

**Layout System**: `src/layouts/Layout.astro` provides the base HTML structure. Pages import and wrap content with layouts.

**Asset Handling**: Images in `src/assets/` are processed and optimized. Files in `public/` are served as-is.

**TypeScript Integration**: Configured with strict mode. Astro generates types automatically in `.astro/types.d.ts`.

### Component Pattern
```astro
---
// Frontmatter: TypeScript/JavaScript code
import Component from '../components/Component.astro';
const data = 'example';
---

<!-- Template: HTML with component syntax -->
<Layout>
  <Component prop={data} />
</Layout>

<style>
  /* Scoped CSS styles */
</style>
```

## Deployment

### Railway Configuration
- Uses RAILPACK builder (`railway.json`)
- Automatic builds from Git pushes
- Serves static files from `dist/` after build

### Build Process
1. `npm run build` generates static files in `dist/`
2. Railway detects Node.js project and runs build automatically
3. Static files are served via Railway's CDN

## VS Code Integration

### Recommended Extensions
- `astro-build.astro-vscode` - Official Astro extension for syntax highlighting, IntelliSense, and formatting

### Debug Configuration
Launch configuration available in `.vscode/launch.json`:
- **"Development server"** - Starts `./node_modules/.bin/astro dev` in terminal

### Development Tips
- Astro extension provides syntax highlighting for `.astro` files
- TypeScript errors show in VS Code with strict type checking
- Hot reload works automatically with `npm run dev`

## Quick Reference

### Key Files
- `astro.config.mjs` - Astro configuration
- `tsconfig.json` - TypeScript configuration (extends strict preset)
- `package.json` - Dependencies and scripts
- `src/pages/index.astro` - Homepage
- `src/layouts/Layout.astro` - Base HTML layout

### Common Patterns
- Import assets: `import logo from '../assets/logo.svg'`
- Use in template: `<img src={logo.src} alt="Logo" />`
- Component props: Define in frontmatter, use in template
- Scoped styles: `<style>` blocks are component-scoped by default

### Troubleshooting
- Run `npm run astro -- check` for type errors
- Run `npm run astro -- sync` to regenerate types
- Clear `.astro/` directory if encountering cache issues
- Check browser console for client-side errors during development

### Documentation Links
- [Astro Documentation](https://docs.astro.build)
- [Astro 5.0 Features](https://astro.build/blog/astro-5/)
- [Railway Deployment Guide](https://railway.app/template/Ic0JBh)

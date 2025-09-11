// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://tatikati.fr',
  integrations: [
    tailwind(),
    mdx(),
    sitemap()
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    },
    server: {
      fs: {
        strict: false
      }
    }
  }
});

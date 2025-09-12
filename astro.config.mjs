// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://tatikati.app',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
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

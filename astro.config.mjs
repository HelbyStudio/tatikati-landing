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
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true
    }
  },
  integrations: [
    tailwind(),
    mdx(),
    sitemap()
  ],
  env: {
    schema: {
      BREVO_API_KEY: {
        context: 'server',
        access: 'secret',
        type: 'string'
      },
      FEATURED_PLAYLIST_URL: {
        context: 'server',
        access: 'public',
        type: 'string'
      }
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    },
    server: {
      fs: {
        strict: false
      }
    },
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  }
});

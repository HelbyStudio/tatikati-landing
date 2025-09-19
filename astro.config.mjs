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
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr',
          en: 'en'
        }
      },
      filter: (page) => {
        // Exclude API routes and private pages
        return !page.includes('/api/') && 
               !page.includes('/admin/') && 
               !page.includes('/_');
      },
      customPages: [
        // Add any custom pages that might not be auto-detected
        'https://tatikati.app/',
        'https://tatikati.app/en/',
      ],
      serialize: (item) => {
        // Set priority based on page importance
        const { url } = item;
        
        // Homepage gets highest priority
        if (url === 'https://tatikati.app/' || url === 'https://tatikati.app/en/') {
          return {
            ...item,
            priority: 1.0,
            changefreq: 'weekly'
          };
        }
        
        // Blog pages get high priority
        if (url.includes('/blog/') && !url.endsWith('/blog/')) {
          return {
            ...item,
            priority: 0.8,
            changefreq: 'monthly'
          };
        }
        
        // Blog index pages
        if (url.endsWith('/blog/')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'weekly'
          };
        }
        
        // Press and about pages
        if (url.includes('/press/') || url.includes('/about/')) {
          return {
            ...item,
            priority: 0.7,
            changefreq: 'monthly'
          };
        }
        
        // Legal pages get lower priority
        if (url.includes('/legal/') || url.includes('/privacy/') || 
            url.includes('/terms/') || url.includes('/cookies/')) {
          return {
            ...item,
            priority: 0.3,
            changefreq: 'yearly'
          };
        }
        
        // Contact and support pages
        if (url.includes('/contact/') || url.includes('/support/')) {
          return {
            ...item,
            priority: 0.6,
            changefreq: 'monthly'
          };
        }
        
        // Default for other pages
        return {
          ...item,
          priority: 0.5,
          changefreq: 'monthly'
        };
      }
    })
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

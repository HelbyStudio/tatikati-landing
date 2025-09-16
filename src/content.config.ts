import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    author: z.string().default('Équipe Tatikati'),
    authorImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum([
      'conseils-parents',
      'developpement-enfant', 
      'podcasts',
      'education',
      'technologie',
      'actualites'
    ]).default('conseils-parents'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    readingTime: z.number().optional(),
    locale: z.enum(['fr', 'en']).default('fr'),
    translatedFrom: z.string().optional(), // Reference to original post slug
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      noindex: z.boolean().default(false)
    }).optional()
  }),
});

// Data collections using file loader for JSON data
const faqFrCollection = defineCollection({
  loader: file('src/content/data/fr/faq.json'),
  schema: z.object({
    id: z.string(),
    category: z.string(),
    question: z.string(),
    answer: z.string()
  })
});

const faqEnCollection = defineCollection({
  loader: file('src/content/data/en/faq.json'),
  schema: z.object({
    id: z.string(),
    category: z.string(),
    question: z.string(),
    answer: z.string()
  })
});

const featuresFrCollection = defineCollection({
  loader: file('src/content/data/fr/features.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string()
  })
});

const featuresEnCollection = defineCollection({
  loader: file('src/content/data/en/features.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string()
  })
});

const reviewsFrCollection = defineCollection({
  loader: file('src/content/data/fr/reviews.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    rating: z.number(),
    quote: z.string()
  })
});

const reviewsEnCollection = defineCollection({
  loader: file('src/content/data/en/reviews.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    rating: z.number(),
    quote: z.string()
  })
});

const podcastsFrCollection = defineCollection({
  loader: file('src/content/data/fr/podcasts.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    cover: z.string(),
    episodeEmbedId: z.string(),
    description: z.string().optional()
  })
});

export const collections = {
  'blog': blogCollection,
  'faq-fr': faqFrCollection,
  'faq-en': faqEnCollection,
  'features-fr': featuresFrCollection,
  'features-en': featuresEnCollection,
  'reviews-fr': reviewsFrCollection,
  'reviews-en': reviewsEnCollection,
  'podcasts-fr': podcastsFrCollection,
};
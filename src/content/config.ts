import { defineCollection, z } from 'astro:content';

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
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      noindex: z.boolean().default(false)
    }).optional()
  }),
});

export const collections = {
  'blog': blogCollection,
};
import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.enum(['Programación', 'Otros']))
  }),
});

export const collections = {
  'blog': blogCollection,
};
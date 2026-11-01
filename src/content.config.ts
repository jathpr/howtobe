import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
	schema: z.object({
		lang: z.enum(['be', 'ru', 'en']),
		title: z.string(),
		description: z.string(),
	}),
});

export const collections = { pages };

// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	i18n: {
		locales: ['be', 'ru', 'en'],
		defaultLocale: 'be',
		routing: {
			prefixDefaultLocale: true,
		},
	},
});

export const locales = ['be', 'ru', 'en'] as const;

export type Locale = (typeof locales)[number];

export const languageNames: Record<Locale, string> = {
	be: 'Вітаю',
	ru: 'Здравствуй',
	en: 'Hello',
};

export const messages: Record<
	Locale,
	{
		title: string;
		description: string;
		intro: string;
		languageSelection: string;
	}
> = {
	be: {
		title: 'Вітаю.',
		description: 'Асабісты сайт Міці.',
		intro: 'Гэта пачатак новага сайта.',
		languageSelection: 'Выбраць мову',
	},
	ru: {
		title: 'Здравствуй.',
		description: 'Личный сайт Мити.',
		intro: 'Это начало нового сайта.',
		languageSelection: 'Выбрать язык',
	},
	en: {
		title: 'Hello.',
		description: 'Dzmitry’s personal website.',
		intro: 'A new site begins here.',
		languageSelection: 'Choose a language',
	},
};

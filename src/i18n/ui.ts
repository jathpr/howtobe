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
		awarenessLink: string;
		awarenessTitle: string;
		videoUnavailable: string;
		backHome: string;
	}
> = {
	be: {
		title: 'Вітаю.',
		description: 'Асабісты сайт Міці.',
		intro: 'Гэта пачатак новага сайта.',
		languageSelection: 'Выбраць мову',
		awarenessLink: 'Прысутнасць',
		awarenessTitle: 'Прысутнасць',
		videoUnavailable: 'Відэа пакуль не падключана.',
		backHome: 'На галоўную',
	},
	ru: {
		title: 'Здравствуй.',
		description: 'Личный сайт Мити.',
		intro: 'Это начало нового сайта.',
		languageSelection: 'Выбрать язык',
		awarenessLink: 'Присутствие',
		awarenessTitle: 'Присутствие',
		videoUnavailable: 'Видео пока не подключено.',
		backHome: 'На главную',
	},
	en: {
		title: 'Hello.',
		description: 'Dzmitry’s personal website.',
		intro: 'A new site begins here.',
		languageSelection: 'Choose a language',
		awarenessLink: 'Awareness',
		awarenessTitle: 'Awareness',
		videoUnavailable: 'The video is not connected yet.',
		backHome: 'Back to home',
	},
};

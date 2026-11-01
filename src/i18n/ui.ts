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
		videoUnavailable: string;
		backHome: string;
		navigation: {
			theory: string;
			practice: string;
			cook: string;
			faq: string;
		};
	}
> = {
	be: {
		title: 'Вітаю.',
		description: 'Асабісты сайт Міці.',
		intro: 'Гэта пачатак новага сайта.',
		languageSelection: 'Выбраць мову',
		awarenessLink: 'Прысутнасць',
		videoUnavailable: 'Відэа пакуль не падключана.',
		backHome: 'На галоўную',
		navigation: {
			theory: 'Тэорыя',
			practice: 'Практыка',
			cook: 'Повар',
			faq: 'Чаво?',
		},
	},
	ru: {
		title: 'Здравствуй.',
		description: 'Личный сайт Мити.',
		intro: 'Это начало нового сайта.',
		languageSelection: 'Выбрать язык',
		awarenessLink: 'Присутствие',
		videoUnavailable: 'Видео пока не подключено.',
		backHome: 'На главную',
		navigation: {
			theory: 'Теория',
			practice: 'Практика',
			cook: 'Повар',
			faq: 'ЧаВо?',
		},
	},
	en: {
		title: 'Hello.',
		description: 'Dzmitry’s personal website.',
		intro: 'A new site begins here.',
		languageSelection: 'Choose a language',
		awarenessLink: 'Awareness',
		videoUnavailable: 'The video is not connected yet.',
		backHome: 'Back to home',
		navigation: {
			theory: 'Theory',
			practice: 'Practice',
			cook: 'Cook',
			faq: 'FAQ',
		},
	},
};

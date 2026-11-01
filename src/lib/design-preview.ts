export const designVariants = [
	{ slug: 'sand', label: 'Пясок', title: 'Пясочны месяц' },
	{ slug: 'kraft', label: 'Крафт', title: 'Крафтавая папера' },
	{ slug: 'white', label: 'Белы', title: 'Чысты мінімалізм' },
	{ slug: 'ink', label: 'Чарнільны', title: 'Чарнільная ноч' },
] as const;

export type DesignVariant = (typeof designVariants)[number];

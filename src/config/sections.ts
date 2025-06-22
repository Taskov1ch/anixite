export interface ISection {
	key: string;
	title: string;
	status?: number;
}

export const SECTIONS: ISection[] = [
	{ key: 'latest', title: 'Последние' },
	{ key: 'ongoing', title: 'Онгоинги', status: 2 },
	{ key: 'announced', title: 'Анонсы', status: 3 },
	{ key: 'completed', title: 'Завершенные', status: 1 },
	{ key: 'secret', title: 'Засекречено', status: 0 },
];
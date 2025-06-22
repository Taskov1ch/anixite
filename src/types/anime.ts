export interface IAnime {
	id: number;
	image: string;
	title_ru: string;
	episodes_released: number | null;
	episodes_total: number | null;
	grade: number;
	year: string;
}

export interface IApiResponse {
	code: number;
	content: IAnime[];
}
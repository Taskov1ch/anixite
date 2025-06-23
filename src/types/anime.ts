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

export interface IReleaseStatus {
	id: number;
	name: string;
}

export interface IReleaseDetails extends IAnime {
	title_original: string;
	description: string;
	status: IReleaseStatus;
	genres: string;
	studio: string;
	source: string;
}

export interface IReleaseApiResponse {
	code: number;
	release: IReleaseDetails;
}
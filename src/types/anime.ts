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

export interface ICategory {
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
	screenshot_images: string[];
	country: string;
	note: string | null;
	comments: IComment[];
	category: ICategory;
}

export interface IReleaseApiResponse {
	code: number;
	release: IReleaseDetails;
}

export interface ICommentProfile {
	id: number;
	login: string;
	avatar: string;
	is_verified: boolean;
	badge_id: number | null;
	badge_name: string | null;
	badge_url: string | null;
}

export interface IComment {
	id: number;
	profile: ICommentProfile;
	message: string;
	timestamp: number;
	likes_count: number;
	is_spoiler: boolean;
	is_edited: boolean;
}

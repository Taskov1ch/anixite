export interface IUserProfile {
	id: number;
	avatar: string;
	login: string;
	is_verified: boolean;
	badge_id: number | null;
	badge_name: string | null;
	badge_url: string | null;
}

export interface IUserSearchApiResponse {
	code: number;
	content: IUserProfile[];
}

export interface IChannel {
	id: number;
	cover: string | null;
}

export interface IChannelApiResponse {
	code: number;
	channel: IChannel | null;
}
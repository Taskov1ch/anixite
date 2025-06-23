import axios from 'axios';
import type { IApiResponse, IReleaseApiResponse, IReleaseDetails } from '../types/anime';
import type { IChannelApiResponse, IUserSearchApiResponse } from '../types/user';

interface FetchParams {
	page: number;
	apiUrl: string;
	status?: number;
}

export const fetchAnime = async ({ page, apiUrl, status }: FetchParams): Promise<IApiResponse['content']> => {
	const url = new URL(`${apiUrl}/filter/${page}`);
	if (status !== undefined) {
		url.searchParams.append('status', status.toString());
	}
	const response = await axios.get<IApiResponse>(url.toString());
	if (response.data && response.data.code === 0) {
		return response.data.content;
	}
	return [];
};

interface SearchParams {
	page: number;
	apiUrl: string;
	query: string;
}

export const searchAnimeByQuery = async ({ page, apiUrl, query }: SearchParams): Promise<IApiResponse['content']> => {
	const url = `${apiUrl}/search/releases/${page}`;
	const payload = {
		query,
		searchBy: 0,
	};

	const response = await axios.post<IApiResponse>(url, payload);

	if (response.data && response.data.code === 0) {
		return response.data.content;
	}
	return [];
}

export const searchUsersByQuery = async ({ page, apiUrl, query }: SearchParams): Promise<IUserSearchApiResponse['content']> => {
	const url = `${apiUrl}/search/profiles/${page}`;
	const payload = {
		query,
		searchBy: 0,
	};

	const response = await axios.post<IUserSearchApiResponse>(url, payload);

	if (response.data && response.data.code === 0) {
		return response.data.content;
	}
	return [];
}

export const fetchUserChannelCover = async (profileId: number, apiUrl: string): Promise<string | null> => {
	const url = `${apiUrl}/channel/blog/${profileId}`;
	const response = await axios.get<IChannelApiResponse>(url);

	if (response.data && response.data.code === 0 && response.data.channel?.cover) {
		return response.data.channel.cover;
	}

	return null;
}

export const fetchReleaseById = async (id: number, apiUrl: string): Promise<IReleaseDetails | null> => {
	const url = `${apiUrl}/release/${id}`;
	const response = await axios.get<IReleaseApiResponse>(url);

	if (response.data && response.data.code === 0) {
		return response.data.release;
	}
	return null;
};
// src/api/animeService.ts
import axios from 'axios';
import type { IApiResponse } from '../types/anime';

const API_BASE_URL = 'https://api.anixart.tv/filter';

interface FetchParams {
  page: number;
  status?: number;
}

// Переименуем функцию для большей универсальности
export const fetchAnime = async ({ page, status }: FetchParams): Promise<IApiResponse['content']> => {
  try {
    // Формируем URL с параметрами
    const url = new URL(`${API_BASE_URL}/${page}`);
    if (status !== undefined) {
      url.searchParams.append('status', status.toString());
    }

    const response = await axios.get<IApiResponse>(url.toString());

    if (response.data && response.data.code === 0) {
      return response.data.content;
    }
    return [];
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return [];
  }
};
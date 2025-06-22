import React, { createContext, useState, useMemo } from 'react';
import { getCookie, setCookie } from '../utils/cookies';

export const API_URLS = {
	default: 'https://api.anixart.tv',
	alternative: 'https://api-s2.anixart.tv'
};

const API_COOKIE_NAME = 'api_preference';

interface ApiContextType {
	apiUrl: string;
	setApiPreference: (preference: 'default' | 'alternative') => void;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
	const getInitialApiUrl = () => {
		const preference = getCookie(API_COOKIE_NAME);
		return preference === 'alternative' ? API_URLS.alternative : API_URLS.default;
	};

	const [apiUrl, setApiUrl] = useState<string>(getInitialApiUrl);

	const setApiPreference = (preference: 'default' | 'alternative') => {
		const newUrl = preference === 'alternative' ? API_URLS.alternative : API_URLS.default;
		setApiUrl(newUrl);
		setCookie(API_COOKIE_NAME, preference, 365);
	};

	const contextValue = useMemo(() => ({
		apiUrl,
		setApiPreference
	}), [apiUrl]);

	return (
		<ApiContext.Provider value={contextValue}>
			{children}
		</ApiContext.Provider>
	);
};
export const formatTimestamp = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};

	return date.toLocaleString('ru-RU', options);
};
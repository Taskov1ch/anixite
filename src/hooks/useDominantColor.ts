import { useState, useEffect } from 'react';

const getAverageRGB = (imgEl: HTMLImageElement): string => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	if (!context) return 'rgba(0,0,0,0)';

	const width = imgEl.width;
	const height = imgEl.height;
	canvas.width = width;
	canvas.height = height;

	context.drawImage(imgEl, 0, 0);

	const imageData = context.getImageData(0, 0, width, height);
	const data = imageData.data;
	let r = 0, g = 0, b = 0;

	for (let i = 0; i < data.length; i += 4) {
		r += data[i];
		g += data[i + 1];
		b += data[i + 2];
	}

	const pixelCount = data.length / 4;
	r = Math.floor(r / pixelCount);
	g = Math.floor(g / pixelCount);
	b = Math.floor(b / pixelCount);

	return `rgba(${r}, ${g}, ${b}, 0.25)`;
};

export const useDominantColor = (imageUrl: string | null | undefined): string | null => {
	const [color, setColor] = useState<string | null>(null);

	useEffect(() => {
		if (!imageUrl) return;

		const img = new Image();
		img.crossOrigin = "Anonymous";
		img.src = imageUrl;

		const handleLoad = () => {
			try {
				const dominantColor = getAverageRGB(img);
				setColor(dominantColor);
			} catch (e) {
				console.error("Error getting dominant color:", e);
				setColor(null);
			}
		};

		img.addEventListener('load', handleLoad);

		return () => {
			img.removeEventListener('load', handleLoad);
		};
	}, [imageUrl]);

	return color;
};
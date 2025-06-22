import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import type { IAnime } from '../../types/anime';
import { fetchAnime } from '../../api/animeService';
import { SECTIONS } from '../../config/sections';
import AnimeCard from '../../components/AnimeCard/AnimeCard';
import ShimmerCard from '../../components/ShimmerCard/ShimmerCard';
import styles from './LatestPage.module.css';
import { ApiContext } from '../../context/ApiContext';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

const AnimeSection = ({ sectionKey }: { sectionKey: string }) => {
	const apiContext = useContext(ApiContext);
	const [animeList, setAnimeList] = useState<IAnime[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const observer = useRef<IntersectionObserver | null>(null);
	const currentSection = SECTIONS.find(s => s.key === sectionKey);

	const loadInitialData = useCallback(async () => {
		if (!apiContext) return;
		setIsLoading(true);
		setError(null);
		try {
			const initialAnime = await fetchAnime({ page: 0, apiUrl: apiContext.apiUrl, status: currentSection?.status });
			if (initialAnime.length === 0) setHasMore(false);
			setAnimeList(initialAnime);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Произошла неизвестная ошибка'));
		} finally {
			setIsLoading(false);
		}
	}, [apiContext, currentSection]);

	const loadMoreAnime = useCallback(async () => {
		if (isLoading || !hasMore || !apiContext) return;
		setIsLoading(true);
		try {
			const newAnime = await fetchAnime({ page, status: currentSection?.status, apiUrl: apiContext.apiUrl });
			if (newAnime.length === 0) {
				setHasMore(false);
			} else {
				setAnimeList(prev => [...prev, ...newAnime]);
				setPage(prev => prev + 1);
			}
		} catch (err) {
			console.error("Failed to load more anime:", err);
		} finally {
			setIsLoading(false);
		}
	}, [page, hasMore, isLoading, currentSection, apiContext]);

	useEffect(() => {
		setAnimeList([]);
		setPage(1);
		setHasMore(true);
		loadInitialData();
	}, [loadInitialData]);

	const lastAnimeElementRef = useCallback((node: HTMLDivElement) => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				loadMoreAnime();
			}
		});
		if (node) observer.current.observe(node);
	}, [isLoading, hasMore, loadMoreAnime]);

	if (error && animeList.length === 0) {
		return <ErrorComponent onRetry={loadInitialData} />;
	}

	if (!isLoading && !error && animeList.length === 0) {
		return <p className={styles.endMessage}>Ничего не найдено.</p>
	}

	return (
		<div className={styles.gridContainer}>
			<div className={styles.grid}>
				{animeList.map((anime, index) => {
					if (animeList.length === index + 4) {
						return <div ref={lastAnimeElementRef} key={`${anime.id}-${index}`}><AnimeCard anime={anime} /></div>;
					}
					return <AnimeCard key={`${anime.id}-${index}`} anime={anime} />;
				})}
				{isLoading && Array.from({ length: 12 }).map((_, i) => <ShimmerCard key={`shimmer-${i}`} />)}
			</div>
			{!hasMore && !isLoading && <p className={styles.endMessage}>Вы просмотрели все аниме.</p>}
		</div>
	);
};

export default AnimeSection;
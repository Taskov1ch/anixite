import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { IAnime } from '../../types/anime';
import { searchAnimeByQuery } from '../../api/animeService';
import { ApiContext } from '../../context/ApiContext';
import AnimeCard from '../../components/AnimeCard/AnimeCard';
import ShimmerCard from '../../components/ShimmerCard/ShimmerCard';
import styles from './SearchPage.module.css';

const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('q');

	const apiContext = useContext(ApiContext);
	const [animeList, setAnimeList] = useState<IAnime[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		if (!query || !apiContext) {
			setAnimeList([]);
			setIsLoading(false);
			return;
		}

		setAnimeList([]);
		setPage(1);
		setHasMore(true);
		setIsLoading(true);

		searchAnimeByQuery({ page: 0, apiUrl: apiContext.apiUrl, query })
			.then(initialAnime => {
				if (initialAnime.length === 0) {
					setHasMore(false);
				}
				setAnimeList(initialAnime);
			})
			.finally(() => {
				setIsLoading(false);
			});

	}, [query, apiContext]);


	const loadMoreResults = useCallback(async () => {
		if (isLoading || !hasMore || !apiContext || !query) return;

		setIsLoading(true);
		const newAnime = await searchAnimeByQuery({
			page,
			apiUrl: apiContext.apiUrl,
			query,
		});

		if (newAnime.length === 0) {
			setHasMore(false);
		} else {
			setAnimeList(prev => [...prev, ...newAnime]);
			setPage(prev => prev + 1);
		}
		setIsLoading(false);
	}, [page, isLoading, hasMore, apiContext, query]);

	const lastAnimeElementRef = useCallback((node: HTMLDivElement) => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				loadMoreResults();
			}
		});

		if (node) observer.current.observe(node);
	}, [isLoading, hasMore, loadMoreResults]);

	if (!query) {
		return <main className={styles.pageContainer}><p>Пожалуйста, введите поисковый запрос.</p></main>
	}

	return (
		<main className={styles.pageContainer}>
			<h2 className={styles.title}>
				Результаты поиска по запросу: <span>"{query}"</span>
			</h2>

			{!isLoading && animeList.length === 0 && hasMore === false && (
				<p>По вашему запросу ничего не найдено.</p>
			)}

			<div className={styles.grid}>
				{animeList.map((anime, index) => {
					if (animeList.length === index + 4) {
						return <div ref={lastAnimeElementRef} key={`${anime.id}-${index}`}><AnimeCard anime={anime} /></div>;
					}
					return <AnimeCard key={`${anime.id}-${index}`} anime={anime} />;
				})}
				{isLoading && Array.from({ length: 12 }).map((_, i) => <ShimmerCard key={`shimmer-${i}`} />)}
			</div>
		</main>
	);
};

export default SearchPage;
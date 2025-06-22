import { useState, useEffect, useRef, useCallback } from 'react';
import type { IAnime } from '../../types/anime';
import { fetchAnime } from '../../api/animeService';
import { SECTIONS } from '../../config/sections';
import AnimeCard from '../../components/AnimeCard/AnimeCard';
import ShimmerCard from '../../components/ShimmerCard/ShimmerCard';
import styles from './LatestPage.module.css';

const AnimeSection = ({ sectionKey }: { sectionKey: string }) => {
	const [animeList, setAnimeList] = useState<IAnime[]>([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const observer = useRef<IntersectionObserver | null>(null);
	const currentSection = SECTIONS.find(s => s.key === sectionKey);

	const loadMoreAnime = useCallback(async () => {
		if (!hasMore) return;
		setIsLoading(true);
		const newAnime = await fetchAnime({ page, status: currentSection?.status });
		if (newAnime.length === 0) {
			setHasMore(false);
		} else {
			setAnimeList(prev => [...prev, ...newAnime]);
			setPage(prev => prev + 1);
		}
		setIsLoading(false);
	}, [page, hasMore, currentSection]);

	useEffect(() => {
		loadMoreAnime();
	}, []);

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
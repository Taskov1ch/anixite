import React, { useState, useEffect, useRef } from 'react';
import type { IAnime } from '../../types/anime';
import styles from './AnimeCard.module.css';
import { Link } from 'react-router-dom';

interface AnimeCardProps {
	anime: IAnime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
	const cardRef = useRef<HTMLDivElement | null>(null);

	const [isVisible, setIsVisible] = useState(false);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const episodes = `${anime.episodes_released ?? '?'} / ${anime.episodes_total ?? '?'}`;
	const grade = anime.grade > 0 ? anime.grade.toFixed(1) : null;
	const details = `${episodes} • ${anime.year}`;

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{
				rootMargin: '100px',
			}
		);

		if (cardRef.current) {
			observer.observe(cardRef.current);
		}

		return () => {
			if (cardRef.current) {
				observer.unobserve(cardRef.current);
			}
		};
	}, []);

	return (
		<Link
			to={`/anime/${anime.id}`}
			state={{ animeData: anime }}
			className={styles.linkWrapper}
		>
			<div className={styles.card} ref={cardRef}>
				<div className={styles.imageContainer}>
					{!isImageLoaded && <div className={styles.imagePlaceholder}></div>}
					<img
						src={isVisible ? anime.image : ''}
						alt={anime.title_ru}
						className={`${styles.poster} ${isImageLoaded ? styles.loaded : ''}`}
						onLoad={() => setIsImageLoaded(true)}
					/>
					{grade && <div className={styles.grade}>{grade}</div>}
				</div>
				<div className={styles.info}>
					<h3 className={styles.title}>{anime.title_ru}</h3>
					<p className={styles.details}>{details}</p>
				</div>
			</div>
		</Link>
	);
};

export default React.memo(AnimeCard);
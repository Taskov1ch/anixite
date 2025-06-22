import React, { useState } from 'react';
import type { IAnime } from '../../types/anime';
import styles from './AnimeCard.module.css';

interface AnimeCardProps {
	anime: IAnime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const episodes = `${anime.episodes_released ?? '?'} / ${anime.episodes_total ?? '?'}`;
	const grade = anime.grade > 0 ? anime.grade.toFixed(1) : null;

	const details = `${episodes} эп. • ${anime.year ?? '?'} год`;

	return (
		<div className={styles.card}>
			<div className={styles.imageContainer}>
				{!isImageLoaded && <div className={styles.imagePlaceholder}></div>}
				<img
					src={anime.image}
					alt={anime.title_ru}
					className={`${styles.poster} ${isImageLoaded ? styles.loaded : ''}`}
					onLoad={() => setIsImageLoaded(true)}
					loading="lazy"
				/>
				{grade && <div className={styles.grade}>{grade}</div>}
			</div>
			<div className={styles.info}>
				<h3 className={styles.title}>{anime.title_ru}</h3>
				<p className={styles.details}>{details}</p>
			</div>
		</div>
	);
};

export default React.memo(AnimeCard);
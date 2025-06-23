import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBook, faCircleCheck, faFilm, faGlobe, faInfoCircle, faListOl, faTags } from '@fortawesome/free-solid-svg-icons';
import type { IReleaseDetails } from '../../types/anime';
import { fetchReleaseById } from '../../api/animeService';
import { ApiContext } from '../../context/ApiContext';
import ScreenshotCarousel from '../../components/ScreenshotCarousel/ScreenshotCarousel';
import styles from './AnimePage.module.css';
import navStyles from '../../components/Navbar/Navbar.module.css';
import CommentCard from '../../components/CommentCard/CommentCard';

interface OutletContextType {
	setPageSections: (sections: React.ReactNode | null) => void;
}

const AnimePage = () => {
	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const navigate = useNavigate();
	const { setPageSections } = useOutletContext<OutletContextType>();

	const apiContext = useContext(ApiContext);

	const passedAnimeData = location.state?.animeData;
	const [release, setRelease] = useState<IReleaseDetails | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const episodes = release ? `${release.episodes_released ?? '?'} / ${release.episodes_total ?? '?'}` : null;

	useEffect(() => {
		const handleGoBack = () => navigate(-1);
		const backButtonUI = (
			<button onClick={handleGoBack} className={navStyles.textButton}>
				<FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
				Назад
			</button>
		);
		setPageSections(backButtonUI);
		return () => {
			setPageSections(null);
		};
	}, [navigate, setPageSections]);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!id || !apiContext) return;

		setIsLoading(true);
		fetchReleaseById(parseInt(id, 10), apiContext.apiUrl)
			.then(data => {
				if (data) {
					setRelease(data);
				} else {
					setError("Не удалось загрузить информацию о релизе.");
				}
			})
			.catch(() => setError("Произошла ошибка при загрузке."))
			.finally(() => setIsLoading(false));
	}, [id, apiContext]);

	const posterToShow = release?.image || passedAnimeData?.image;
	const titleToShow = release?.title_ru || passedAnimeData?.title_ru;

	return (
		<div className={styles.pageContainer}>
			<div className={styles.mainContent}>
				<div className={styles.leftPanel}>
					{posterToShow ? (
						<img src={posterToShow} alt={titleToShow} className={styles.poster} />
					) : (
						<div className={`${styles.poster} ${styles.posterPlaceholder}`} />
					)}

					{release && !isLoading && (
						<div className={styles.posterDetails}>
							{release.status && (
								<p className={styles.detailItem}>
									<FontAwesomeIcon icon={faCircleCheck} className={styles.detailIcon} />
									Статус: <strong>{release.status.name}</strong>
								</p>
							)}
							{release.category && (
								<p className={styles.detailItem}>
									<FontAwesomeIcon icon={faTags} className={styles.detailIcon} />
									Тип: <strong>{release.category.name}</strong>
								</p>
							)}
							{episodes && (
								<p className={styles.detailItem}>
									<FontAwesomeIcon icon={faListOl} className={styles.detailIcon} />
									Эпизоды: <strong>{episodes}</strong>
								</p>
							)}
							{release.studio && (
								<p className={styles.detailItem}>
									<FontAwesomeIcon icon={faFilm} className={styles.detailIcon} />
									Студия: <strong>{release.studio}</strong>
								</p>
							)}
							{release.source && (
								<p className={styles.detailItem}>
									<FontAwesomeIcon icon={faBook} className={styles.detailIcon} />
									Источник: <strong>{release.source}</strong>
								</p>
							)}
							{release.country && (
								<p className={styles.detailItem}>
									<FontAwesomeIcon icon={faGlobe} className={styles.detailIcon} />
									Страна: <strong>{release.country}</strong>
								</p>
							)}
						</div>
					)}
				</div>
				<div className={styles.rightPanel}>
					{isLoading ? (
						<div className={styles.loadingInfo}>
							<div className={styles.shimmerTitle}></div>
							<div className={styles.shimmerText}></div>
							<div className={styles.shimmerTextShort}></div>
						</div>
					) : error ? (
						<div className={styles.errorInfo}>
							<h2>{error}</h2>
							<p>Попробуйте обновить страницу.</p>
						</div>
					) : release ? (
						<div className={styles.animeInfo}>
							<h1 className={styles.title}>{release.title_ru}</h1>
							<p className={styles.originalTitle}>{release.title_original} • {release.year}</p>
							<div className={styles.genres}>
								{release.genres.split(',').map(g => g.trim()).map(genre => (
									<span key={genre} className={styles.genreTag}>{genre}</span>
								))}
							</div>
							<p className={styles.description}>{release.description}</p>
							{release.note && (
								<div className={styles.noteBox}>
									<FontAwesomeIcon icon={faInfoCircle} className={styles.noteIcon} />
									<p dangerouslySetInnerHTML={{ __html: release.note }} />
								</div>
							)}
							<ScreenshotCarousel images={release.screenshot_images} />
							{release.comments && release.comments.length > 0 && (
								<div className={styles.commentsSection}>
									<h2 className={styles.sectionTitle}>Комментарии</h2>
									<div className={styles.commentsList}>
										{release.comments.map(comment => (
											<CommentCard key={comment.id} comment={comment} />
										))}
									</div>
								</div>
							)}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default AnimePage;
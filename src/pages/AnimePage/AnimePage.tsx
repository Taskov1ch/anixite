// src/pages/AnimePage/AnimePage.tsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import type { IReleaseDetails } from '../../types/anime';
import { fetchReleaseById } from '../../api/animeService';
import { ApiContext } from '../../context/ApiContext';
import styles from './AnimePage.module.css';

const AnimePage = () => {
  const { id } = useParams<{ id: string }>();
  // Получаем данные, переданные с карточки
  const location = useLocation();
  const passedAnimeData = location.state?.animeData;

  const apiContext = useContext(ApiContext);
  const [release, setRelease] = useState<IReleaseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Прокручиваем наверх при загрузке
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

  // Используем постер из переданных данных для быстрой загрузки,
  // а потом заменяем на данные из полного ответа
  const posterToShow = release?.image || passedAnimeData?.image;
  const titleToShow = release?.title_ru || passedAnimeData?.title_ru;
  const yearToShow = release?.year || passedAnimeData?.year;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftPanel}>
        {posterToShow ? (
          <img src={posterToShow} alt={titleToShow} className={styles.poster} />
        ) : (
          <div className={`${styles.poster} ${styles.posterPlaceholder}`} />
        )}
      </div>

      <div className={styles.rightPanel}>
        {isLoading ? (
          // Shimmer-эффект для информации
          <div className={styles.loadingInfo}>
            <div className={styles.shimmerTitle}></div>
            <div className={styles.shimmerText}></div>
            <div className={styles.shimmerTextShort}></div>
          </div>
        ) : error ? (
          // Отображение ошибки
          <div className={styles.errorInfo}>
            <h2>{error}</h2>
            <p>Попробуйте обновить страницу.</p>
          </div>
        ) : release ? (
          // Отображение загруженной информации
          <div className={styles.animeInfo}>
            <h1 className={styles.title}>{release.title_ru}</h1>
            <p className={styles.originalTitle}>{release.title_original} • {release.year}</p>
            <div className={styles.genres}>
              {release.genres.split(',').map(g => g.trim()).map(genre => (
                <span key={genre} className={styles.genreTag}>{genre}</span>
              ))}
            </div>
            <p className={styles.description}>{release.description}</p>
            <div className={styles.details}>
              <p><strong>Статус:</strong> {release.status.name}</p>
              <p><strong>Студия:</strong> {release.studio}</p>
              <p><strong>Источник:</strong> {release.source}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AnimePage;
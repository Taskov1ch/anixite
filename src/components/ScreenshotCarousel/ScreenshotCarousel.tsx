import { useRef, useState, type UIEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './ScreenshotCarousel.module.css';

interface ScreenshotCarouselProps {
	images: string[];
}

const ScreenshotCarousel = ({ images }: ScreenshotCarouselProps) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isAtStart, setIsAtStart] = useState(true);
	const [isAtEnd, setIsAtEnd] = useState(false);

	const handleScroll = (event: UIEvent<HTMLDivElement>) => {
		const { scrollLeft, scrollWidth, clientWidth } = event.currentTarget;
		setIsAtStart(scrollLeft === 0);
		setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
	};

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
			scrollContainerRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			});
		}
	};

	if (!images || images.length === 0) {
		return null;
	}

	return (
		<div className={styles.carouselWrapper}>
			<h2 className={styles.carouselTitle}>Скриншоты</h2>
			<div className={styles.carouselContainer}>
				{!isAtStart && (
					<button className={`${styles.navButton} ${styles.prev}`} onClick={() => scroll('left')}>
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
				)}
				<div className={styles.scrollArea} ref={scrollContainerRef} onScroll={handleScroll}>
					{images.map((src, index) => (
						<img key={index} src={src} alt={`Screenshot ${index + 1}`} className={styles.screenshot} />
					))}
				</div>
				{!isAtEnd && (
					<button className={`${styles.navButton} ${styles.next}`} onClick={() => scroll('right')}>
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				)}
			</div>
		</div>
	);
};

export default ScreenshotCarousel;
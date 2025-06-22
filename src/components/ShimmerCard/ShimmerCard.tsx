import styles from './ShimmerCard.module.css';

const ShimmerCard = () => {
	return (
		<div className={styles.card}>
			<div className={`${styles.shimmer} ${styles.image}`}></div>
			<div className={styles.info}>
				<div className={`${styles.shimmer} ${styles.title}`}></div>
				<div className={`${styles.shimmer} ${styles.details}`}></div>
			</div>
		</div>
	);
};

export default ShimmerCard;
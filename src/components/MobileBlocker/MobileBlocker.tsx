import styles from './MobileBlocker.module.css';

const MobileBlocker = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Сайт не предназначен для мобильных устройств</h1>
			<p className={styles.subtitle}>Пожалуйста, воспользуйтесь нашим приложением.</p>
			<a
				href="https://anixart.tv"
				target="_blank"
				rel="noopener noreferrer"
				className={styles.button}
			>
				Перейти к приложению
			</a>
		</div>
	);
};

export default MobileBlocker;
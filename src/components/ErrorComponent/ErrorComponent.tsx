import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faComments, faSync, faCog } from '@fortawesome/free-solid-svg-icons';
import { ApiContext, API_URLS } from '../../context/ApiContext';
import styles from './ErrorComponent.module.css';

interface ErrorComponentProps {
	onRetry: () => void;
}

const ErrorComponent = ({ onRetry }: ErrorComponentProps) => {
	const apiContext = useContext(ApiContext);
	const navigate = useNavigate();

	const isAlternativeActive = apiContext?.apiUrl === API_URLS.alternative;

	const goToSettings = () => navigate('/settings');

	return (
		<div className={styles.errorContainer}>
			<FontAwesomeIcon icon={faExclamationTriangle} className={styles.errorIcon} />
			<h2 className={styles.errorTitle}>Произошла ошибка</h2>

			{isAlternativeActive ? (
				<>
					<p className={styles.errorDescription}>
						Не удалось загрузить данные, даже используя альтернативное соединение. Попробуйте спросить у других в общем чате.
					</p>
					<div className={styles.buttonGroup}>
						<button onClick={onRetry} className={styles.button}>
							<FontAwesomeIcon icon={faSync} /> Повторить
						</button>
						<a href="https://t.me/anixart_chat" target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.primary}`}>
							<FontAwesomeIcon icon={faComments} /> Перейти в чат
						</a>
					</div>
				</>
			) : (
				<>
					<p className={styles.errorDescription}>
						Не удалось загрузить данные. Возможно, проблема связана с доступом к API. Попробуйте включить альтернативное соединение.
					</p>
					<div className={styles.buttonGroup}>
						<button onClick={onRetry} className={styles.button}>
							<FontAwesomeIcon icon={faSync} /> Повторить
						</button>
						<button onClick={goToSettings} className={`${styles.button} ${styles.primary}`}>
							<FontAwesomeIcon icon={faCog} /> В настройки
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ErrorComponent;
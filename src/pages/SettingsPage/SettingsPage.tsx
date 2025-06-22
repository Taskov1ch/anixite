import { useContext } from 'react';
import styles from './SettingsPage.module.css';
import { ApiContext, API_URLS } from '../../context/ApiContext';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

const SettingsPage = () => {
	const apiContext = useContext(ApiContext);

	if (!apiContext) {
		return <div>Ошибка загрузки контекста API.</div>;
	}

	const { apiUrl, setApiPreference } = apiContext;
	const isAlternative = apiUrl === API_URLS.alternative;

	const handleToggleChange = () => {
		setApiPreference(isAlternative ? 'default' : 'alternative');
	};

	return (
		<main className={styles.pageContainer}>
			<h1>Настройки</h1>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>Дополнительно</h2>
				<div className={styles.settingItem}>
					<div className={styles.settingInfo}>
						<p className={styles.settingName}>Альтернативное соединение</p>
						<p className={styles.settingDesc}>При включении, запросы будут идти на альтернативный API адрес.</p>
					</div>
					<div className={styles.settingControl}>
						<ToggleSwitch isChecked={isAlternative} onChange={handleToggleChange} />
					</div>
				</div>
			</section>
		</main>
	);
};

export default SettingsPage;
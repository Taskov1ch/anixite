import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faBookmark, faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

interface NavbarProps {
	pageSections?: React.ReactNode;
}

const Navbar = ({ pageSections }: NavbarProps) => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.leftSection}>
				{pageSections}
			</div>

			<div className={styles.rightSection}>
				<NavLink to="/" className={({ isActive }) => isActive ? `${styles.iconButton} ${styles.active}` : styles.iconButton} title="Последние">
					<FontAwesomeIcon icon={faHome} />
				</NavLink>
				<NavLink to="/explore" className={({ isActive }) => isActive ? `${styles.iconButton} ${styles.active}` : styles.iconButton} title="Исследование">
					<FontAwesomeIcon icon={faCompass} />
				</NavLink>
				<NavLink to="/bookmarks" className={({ isActive }) => isActive ? `${styles.iconButton} ${styles.active}` : styles.iconButton} title="Закладки">
					<FontAwesomeIcon icon={faBookmark} />
				</NavLink>
				<NavLink to="/news" className={({ isActive }) => isActive ? `${styles.iconButton} ${styles.active}` : styles.iconButton} title="Новости">
					<FontAwesomeIcon icon={faNewspaper} />
				</NavLink>
				<NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.iconButton} ${styles.active}` : styles.iconButton} title="Профиль">
					<FontAwesomeIcon icon={faUser} />
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
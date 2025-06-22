import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faBookmark, faNewspaper, faUser, faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';

interface NavbarProps {
	pageSections?: React.ReactNode;
}

const Navbar = ({ pageSections }: NavbarProps) => {
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const searchInputRef = useRef<HTMLInputElement>(null);

	const searchablePages = ['/', '/explore', '/profile'];
	const isSearchEnabledOnCurrentPage = searchablePages.includes(location.pathname);
	const onSearchResultsPage = location.pathname.startsWith('/search/');
	const showSearchInput = onSearchResultsPage || (isSearchActive && isSearchEnabledOnCurrentPage);
	const showSearchIcon = isSearchEnabledOnCurrentPage && !onSearchResultsPage;


	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsSearchActive(false);
			}
		};
		if (isSearchActive) {
			window.addEventListener('keydown', handleEsc);
		}
		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [isSearchActive]);

	useEffect(() => {
		if (onSearchResultsPage) {
			setInputValue(searchParams.get('q') || '');
		}
		if (showSearchInput) {
			setTimeout(() => searchInputRef.current?.focus(), 0);
		}
	}, [showSearchInput, onSearchResultsPage, searchParams]);

	const handleSearchIconClick = () => {
		setIsSearchActive(!isSearchActive);
	};

	const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && inputValue.trim() !== '') {
			const query = encodeURIComponent(inputValue.trim());
			if (location.pathname === '/profile' || location.pathname === '/search/users') {
				navigate(`/search/users?q=${query}`);
			} else {
				navigate(`/search/anime?q=${query}`);
			}
			if (!onSearchResultsPage) {
				setIsSearchActive(false);
			}
		}
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.leftSection}>
				{showSearchInput ? (
					<input
						ref={searchInputRef}
						type="text"
						placeholder={location.pathname === '/profile' ? "Поиск пользователей..." : "Поиск аниме..."}
						className={styles.searchInput}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleSearchKeyDown}
					/>
				) : (
					pageSections
				)}
			</div>

			<div className={styles.rightSection}>
				{showSearchIcon && (
					<button onClick={handleSearchIconClick} className={styles.iconButton} title="Поиск">
						<FontAwesomeIcon icon={faSearch} />
					</button>
				)}

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
				<NavLink to="/settings" className={({ isActive }) => isActive ? `${styles.iconButton} ${styles.active}` : styles.iconButton} title="Настройки">
					<FontAwesomeIcon icon={faGear} />
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
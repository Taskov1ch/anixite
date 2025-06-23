import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MobileBlocker from './components/MobileBlocker/MobileBlocker';
import { useMediaQuery } from './hooks/useMediaQuery';

import LatestPage from './pages/LatestPage/LatestPage';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import BookmarksPage from './pages/BookmarksPage/BookmarksPage';
import NewsPage from './pages/NewsPage/NewsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import SearchPage from './pages/SearchPage/SearchPage';
import UserSearchPage from './pages/UserSearchPage/UserSearchPage';
import AnimePage from './pages/AnimePage/AnimePage';

const DesktopLayout = () => {
	const [pageSections, setPageSections] = useState<React.ReactNode | null>(null);

	return (
		<>
			<Navbar pageSections={pageSections} />
			<Outlet context={{ setPageSections }} />
		</>
	);
};

function App() {
	const isMobile = useMediaQuery('(max-width: 768px)');

	if (isMobile) {
		return <MobileBlocker />;
	}



	return (
		<Router>
			<Routes>
				<Route path="/" element={<DesktopLayout />}>
					<Route index element={<LatestPage />} />
					<Route path="explore" element={<ExplorePage />} />
					<Route path="bookmarks" element={<BookmarksPage />} />
					<Route path="news" element={<NewsPage />} />
					<Route path="profile" element={<ProfilePage />} />
					<Route path="settings" element={<SettingsPage />} />
					<Route path="/search/anime" element={<SearchPage />} />
					<Route path="/search/users" element={<UserSearchPage />} />
					<Route path="/anime/:id" element={<AnimePage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
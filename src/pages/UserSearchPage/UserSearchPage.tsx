import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { IUserProfile } from '../../types/user';
import { searchUsersByQuery } from '../../api/animeService';
import { ApiContext } from '../../context/ApiContext';
import UserCard from '../../components/UserCard/UserCard';
import styles from './UserSearchPage.module.css';

const UserSearchPage = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('q');

	const apiContext = useContext(ApiContext);
	const [userList, setUserList] = useState<IUserProfile[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (!query || !apiContext) {
			setUserList([]);
			setIsLoading(false);
			return;
		}
		setUserList([]);
		setPage(1);
		setHasMore(true);
		setIsLoading(true);

		searchUsersByQuery({ page: 0, apiUrl: apiContext.apiUrl, query })
			.then(initialUsers => {
				if (initialUsers.length === 0) setHasMore(false);
				setUserList(initialUsers);
			})
			.finally(() => setIsLoading(false));
	}, [query, apiContext]);

	const loadMoreResults = useCallback(async () => {
		if (isLoading || !hasMore || !apiContext || !query) return;
		setIsLoading(true);
		const newUsers = await searchUsersByQuery({ page, apiUrl: apiContext.apiUrl, query });
		if (newUsers.length === 0) setHasMore(false);
		else {
			setUserList(prev => [...prev, ...newUsers]);
			setPage(prev => prev + 1);
		}
		setIsLoading(false);
	}, [page, isLoading, hasMore, apiContext, query]);

	const lastUserElementRef = useCallback((node: HTMLDivElement) => {
		if (isLoading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) loadMoreResults();
		});
		if (node) observer.current.observe(node);
	}, [isLoading, hasMore, loadMoreResults]);

	return (
		<main className={styles.pageContainer}>
			<h2 className={styles.title}>Поиск пользователей: <span>"{query}"</span></h2>
			{!isLoading && userList.length === 0 && !hasMore && <p>Пользователи не найдены.</p>}
			<div className={styles.list}>
				{userList.map((user, index) => (
					<div key={`${user.id}-${index}`} ref={userList.length === index + 4 ? lastUserElementRef : null}>
						<UserCard user={user} />
					</div>
				))}
				{isLoading && Array.from({ length: 10 }).map((_, i) => <div key={`shimmer-${i}`} className={styles.shimmerItem}></div>)}
			</div>
		</main>
	);
};

export default UserSearchPage;
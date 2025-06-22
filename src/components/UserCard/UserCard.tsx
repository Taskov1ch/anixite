import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import type { IUserProfile } from '../../types/user';
import { ApiContext } from '../../context/ApiContext';
import { fetchUserChannelCover } from '../../api/animeService';
import styles from './UserCard.module.css';

interface UserCardProps {
	user: IUserProfile;
}

const UserCard = ({ user }: UserCardProps) => {
	const apiContext = useContext(ApiContext);
	const [coverUrl, setCoverUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!apiContext) return;

		fetchUserChannelCover(user.id, apiContext.apiUrl).then(url => {
			if (url) {
				setCoverUrl(url);
			}
		});
	}, [user.id, apiContext]);

	const cardStyle = coverUrl ? {
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${coverUrl})`
	} : {};

	return (
		<div className={`${styles.card} ${coverUrl ? styles.hasCover : ''}`} style={cardStyle}>
			<img src={user.avatar} alt={user.login} className={styles.avatar} />
			<div className={styles.userInfo}>
				<div className={styles.loginContainer}>
					<span className={styles.login}>{user.login}</span>

					{user.badge_url && (
						<img src={user.badge_url} alt={user.badge_name || 'badge'} className={styles.badge} title={user.badge_name || ''} />
					)}

					{user.is_verified && (
						<FontAwesomeIcon icon={faCheckCircle} className={styles.verifiedIcon} title="Верифицированный пользователь" />
					)}
				</div>
			</div>
		</div>
	);
};

export default UserCard;
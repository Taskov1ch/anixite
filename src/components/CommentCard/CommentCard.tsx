import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPencilAlt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import type { IComment } from '../../types/anime';
import { formatTimestamp } from '../../utils/formatDate';
import Spoiler from '../Spoiler/Spoiler';
import styles from './CommentCard.module.css';

interface CommentCardProps {
  comment: IComment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className={styles.card}>
      <img src={comment.profile.avatar} alt={comment.profile.login} className={styles.avatar} />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <span className={styles.login}>{comment.profile.login}</span>
            {comment.profile.badge_url && (
              <img src={comment.profile.badge_url} alt={comment.profile.badge_name || ''} className={styles.badge} />
            )}
            {comment.profile.is_verified && (
              <FontAwesomeIcon icon={faCheckCircle} className={styles.verifiedIcon} />
            )}
          </div>
          <div className={styles.metaInfo}>
            {comment.is_edited && (
              <FontAwesomeIcon icon={faPencilAlt} className={styles.editedIcon} title="Отредактировано" />
            )}
            <span className={styles.timestamp}>{formatTimestamp(comment.timestamp)}</span>
          </div>
        </div>
        <div className={styles.message}>
          {comment.is_spoiler ? (
            <Spoiler>{comment.message}</Spoiler>
          ) : (
            <p>{comment.message}</p>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.likes}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{comment.likes_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
import { useState } from 'react';
import styles from './Spoiler.module.css';

interface SpoilerProps {
	children: React.ReactNode;
}

const Spoiler = ({ children }: SpoilerProps) => {
	const [isOpen, setIsOpen] = useState(false);

	if (isOpen) {
		return <div className={styles.spoilerContent}>{children}</div>;
	}

	return (
		<button onClick={() => setIsOpen(true)} className={styles.spoilerButton}>
			Показать спойлер
		</button>
	);
};

export default Spoiler;
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import AnimeSection from './AnimeSection';
import styles from './LatestPage.module.css';
import navStyles from '../../components/Navbar/Navbar.module.css';
import { SECTIONS } from '../../config/sections';

interface OutletContextType {
	setPageSections: (sections: React.ReactNode | null) => void;
}

const LatestPage = () => {
	const { setPageSections } = useOutletContext<OutletContextType>();
	const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].key);

	useEffect(() => {
		const sectionsUI = (
			<>
				{SECTIONS.map((section) => (
					<button
						key={section.key}
						className={`${navStyles.textButton} ${activeSection === section.key ? navStyles.active : ''}`}
						onClick={() => setActiveSection(section.key)}
					>
						{section.title}
					</button>
				))}
			</>
		);

		setPageSections(sectionsUI);

		return () => {
			setPageSections(null);
		};
	}, [activeSection, setPageSections]);

	return (
		<main className={styles.pageContainer}>
			<AnimeSection key={activeSection} sectionKey={activeSection} />
		</main>
	);
};

export default LatestPage;
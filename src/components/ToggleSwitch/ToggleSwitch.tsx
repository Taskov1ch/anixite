import React from 'react';
import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
	isChecked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch = ({ isChecked, onChange }: ToggleSwitchProps) => {
	return (
		<label className={styles.switch}>
			<input type="checkbox" checked={isChecked} onChange={onChange} />
			<span className={styles.slider}></span>
		</label>
	);
};

export default ToggleSwitch;
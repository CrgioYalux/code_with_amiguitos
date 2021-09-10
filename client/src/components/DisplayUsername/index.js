import './DisplayUsername.css';
import { useState } from 'react';

export const DisplayUsername = ({ username }) => {
	const [showOnlyFirstLetter, setShowOnlyFirstLetter] = useState(true);
	const handleMouseEnter = (event) => {
		setShowOnlyFirstLetter(false);
	};
	const handleMouseLeave = (event) => {
		setShowOnlyFirstLetter(true);
	};
	const animate = (delayMultiplier) =>
		`appear 1.2s ${0.06 * delayMultiplier}s forwards`;

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={`username_container ${
				!showOnlyFirstLetter ? 'username_container-hovered' : null
			}`}
		>
			{showOnlyFirstLetter || username.letter === 1 ? (
				<div className="letter first-letter">{username[0]}</div>
			) : (
				[...username].map((letter, index) => (
					<div
						className="letter letter-hidden"
						style={{ animation: animate(index) }}
						key={`${letter}-${index}`}
					>
						{letter}
					</div>
				))
			)}
		</div>
	);
};

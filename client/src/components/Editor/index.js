import './Editor.css';
import { js_beautify, css_beautify, html_beautify } from 'js-beautify';
import { useEffect, useRef } from 'react';

export const Editor = ({ forEditing, value, setValue, onValueChange }) => {
	const formatContentRef = useRef((content = value) => {
		switch (forEditing) {
			case 'code':
				setValue(js_beautify(content));
				break;
			case 'html':
				setValue(html_beautify(content));
				break;
			case 'style':
				setValue(css_beautify(content));
				break;
			default:
				break;
		}
	});

	useEffect(() => {
		formatContentRef.current && formatContentRef.current();
	}, []);

	const handleChange = (e) => {
		setValue(e.target.value);
		onValueChange.sendData({ type: forEditing, data: e.target.value });
	};

	return (
		<div className="editor-container">
			<button
				className="button-format"
				onClick={() => {
					formatContentRef.current(value);
				}}
			>
				format
			</button>
			<textarea
				className="editor"
				value={value}
				onChange={handleChange}
				style={{ color: `var(--editor-${forEditing})` }}
			/>
		</div>
	);
};

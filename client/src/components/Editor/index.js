import './Editor.css';
import { js_beautify, css_beautify, html_beautify } from 'js-beautify';

export const Editor = ({ forEditing, value, setValue, onValueChange }) => {
	const formatContent = () => {
		switch (forEditing) {
			case 'code':
				setValue(js_beautify(value));
				break;
			case 'html':
				setValue(html_beautify(value));
				break;
			case 'style':
				setValue(css_beautify(value));
				break;
			default:
				break;
		}
	};

	const handleChange = (e) => {
		setValue(e.target.value);
		onValueChange.sendData({ type: forEditing, data: e.target.value });
	};

	return (
		<div className="editor-container">
			<button className="button-format" onClick={formatContent}>
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

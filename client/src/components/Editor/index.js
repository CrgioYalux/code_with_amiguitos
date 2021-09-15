import './Editor.css';

export const Editor = ({ handleChange, value, forEditing }) => {
	return (
		<textarea
			className="editor"
			value={value}
			style={{ color: `var(--editor-${forEditing})` }}
			onChange={handleChange}
		/>
	);
};

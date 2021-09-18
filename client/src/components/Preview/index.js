import './Preview.css';
import { useEffect, useRef } from 'react';

const createPreviewStructure = ({ code, html, style }) => {
	return `<html><body>${html}<script>${code}</script><style>${style}</style></body></html>`;
};

export const Preview = ({ code, html, style }) => {
	const render = useRef(null);

	useEffect(() => {
		const source = createPreviewStructure({ code, html, style });
		render.current.srcdoc = source;
	}, [code, html, style]);

	return (
		<>
			<iframe
				ref={render}
				title="preview"
				id="preview-root"
				className="preview-root"
			></iframe>
		</>
	);
};

import './Room.css';
import { useEffect, useState } from 'react';
import { useSocket } from '../../providers/SocketProvider';
import { useClient } from '../../providers/ClientProvider';
import { RoomInfo } from '../RoomInfo';
import { Editor } from '../Editor';
import { Preview } from '../Preview';
import { defaultCode, defaultHTML, defaultStyle } from './defaultEditorsValues';

export const Room = () => {
	const [code, setCode] = useState(defaultCode);
	const [html, setHTML] = useState(defaultHTML);
	const [style, setStyle] = useState(defaultStyle);
	const { socket, id } = useSocket();
	const { username } = useClient();

	useEffect(() => {
		if (socket === null) return;
		socket.on('receive-code-data', (data) => {
			const parsedData = JSON.parse(data);
			if (parsedData.from.id !== id) {
				setCode(parsedData.data);
			}
		});
		return () => socket.off('receive-code-data');
	});

	useEffect(() => {
		if (socket === null) return;
		socket.on('receive-style-data', (data) => {
			const parsedData = JSON.parse(data);
			if (parsedData.from.id !== id) {
				setStyle(parsedData.data);
			}
		});
		return () => socket.off('receive-style-data');
	});

	useEffect(() => {
		if (socket === null) return;
		socket.on('receive-html-data', (data) => {
			const parsedData = JSON.parse(data);
			if (parsedData.from.id !== id) {
				setHTML(parsedData.data);
			}
		});
		return () => socket.off('receive-html-data');
	});

	useEffect(() => {
		if (socket === null) return;
		socket.on('get-uptodate-editor', () => {
			if (code.length !== 0 || html.length !== 0 || style.length !== 0) {
				socket.emit(
					'send-uptodate-editor',
					JSON.stringify({ code, html, style, from: { username, id } }),
				);
			}
		});
		return () => socket.off('get-uptodate-editor');
	});

	const sendData = ({ type, data }) => {
		const event = `send-${type}-data`;
		socket.emit(event, JSON.stringify({ data, from: { username, id } }));
	};

	return (
		<>
			<div className="room_container">
				<RoomInfo />
				<div className="editors_container">
					<Editor
						value={code}
						setValue={setCode}
						forEditing="code"
						onValueChange={{ sendData }}
					/>
					<Editor
						value={html}
						setValue={setHTML}
						forEditing="html"
						onValueChange={{ sendData }}
					/>
					<Editor
						value={style}
						setValue={setStyle}
						forEditing="style"
						onValueChange={{ sendData }}
					/>
					<Preview code={code} html={html} style={style} />
				</div>
			</div>
		</>
	);
};

import './Room.css';
import { useEffect, useState } from 'react';
import { useSocket } from '../../providers/SocketProvider';
import { useClient } from '../../providers/ClientProvider';
import { RoomInfo } from '../RoomInfo';
import { Editor } from '../Editor';

export const Room = () => {
	const [code, setCode] = useState('');
	const [html, setHTML] = useState('');
	const [style, setStyle] = useState('');
	const { socket } = useSocket();
	const { username } = useClient();

	useEffect(() => {
		if (socket === null) return;
		socket.on('receive-data', (data) => {
			const parsedData = JSON.parse(data);
			if (parsedData.from !== username) {
				setCode(parsedData.code);
			}
		});
		return () => socket.off('receive-data');
	});

	useEffect(() => {
		if (socket === null) return;
		socket.on('get-uptodate-editor', () => {
			if (code.length !== 0) {
				socket.emit(
					'send-uptodate-editor',
					JSON.stringify({ code, from: username }),
				);
			}
		});
		return () => socket.off('get-uptodate-editor');
	});

	const handleChange = (e) => {
		setCode(e.target.value);
		socket.emit(
			'send-data',
			JSON.stringify({ code: e.target.value, from: username }),
		);
	};

	return (
		<>
			<div className="room_container">
				<RoomInfo />
				<div className="editors_container">
					<Editor value={code} forEditing="code" handleChange={handleChange} />
					<Editor
						value={html}
						forEditing="html"
						handleChange={(e) => {
							setHTML(e.target.value);
							console.log(`HTML: ${e.target.value}`);
						}}
					/>
					<Editor
						value={style}
						forEditing="style"
						handleChange={(e) => {
							setStyle(e.target.value);
							console.log(`STYLE: ${e.target.value}`);
						}}
					/>
				</div>
			</div>
		</>
	);
};

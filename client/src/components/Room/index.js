import './Room.css';
import { useEffect, useState } from 'react';
import { useSocket } from '../../providers/SocketProvider';
import { useClient } from '../../providers/ClientProvider';
import { RoomInfo } from '../RoomInfo';

export const Room = () => {
	const [code, setCode] = useState('');
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
				<textarea value={code} onChange={handleChange} />
			</div>
		</>
	);
};

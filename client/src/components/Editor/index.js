import './Editor.css';
import { useEffect, useState } from 'react';
import { useSocket } from '../../providers/SocketProvider';
import { useClient } from '../../providers/ClientProvider';
import { RoomInfo } from '../RoomInfo';

export const Editor = () => {
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

	const handleChange = (e) => {
		setCode(e.target.value);
		socket.emit(
			'send-data',
			JSON.stringify({ code: e.target.value, from: username }),
		);
	};

	return (
		<>
			<div className="editor_container">
				<RoomInfo />
				<textarea value={code} onChange={handleChange} />
			</div>
		</>
	);
};

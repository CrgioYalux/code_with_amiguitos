import { useContext, createContext, useState, useEffect } from 'react';
import { useClient } from './ClientProvider';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, path }) => {
	const { username, roomID } = useClient();
	const [connectedClients, setConnectedClients] = useState([]);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io('/', {
			transports: ['websocket', 'polling', 'flashsocket'],
			path,
			query: {
				connectedToRoom: roomID,
				username: username,
			},
		});
		setSocket(newSocket);
		return () => newSocket.close();
	}, [path, username, roomID]);

	useEffect(() => {
		if (socket === null) return;
		socket.on('send-connected-clients', (data) => {
			const { clients } = JSON.parse(data);
			setConnectedClients(clients);
		});
		return () => socket.off('send-connected-clients');
	});

	const value = {
		socket,
		connectedClients,
	};

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};

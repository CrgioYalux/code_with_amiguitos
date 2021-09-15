import { useContext, createContext, useState, useEffect } from 'react';
import { useClient } from './ClientProvider';
import {
	LOGIN_FAILED_CANNOT_CONNECT,
	LOGIN_FAILED_ROOM_FULL,
	LOGIN_OK,
} from '../components/Login/states';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, path, onLoginTry }) => {
	const { username, roomID } = useClient();
	const [connectedClients, setConnectedClients] = useState([]);
	const [roomSpacesLeft, setRoomSpacesLeft] = useState();
	const [socket, setSocket] = useState(null);
	const [socketID, setSocketID] = useState(null);

	useEffect(() => {
		const login = JSON.stringify({ username, roomID });
		const newSocket = io('/', {
			transports: ['websocket', 'polling', 'flashsocket'],
			path,
			query: {
				login,
			},
		});
		setSocket(newSocket);
		return () => newSocket.close();
	}, [path, username, roomID]);

	useEffect(() => {
		if (socket === null) return;
		socket.on('connect', () => {
			setSocketID(socket.id);
		});
		return () => socket.off('connect');
	});

	useEffect(() => {
		if (socket === null) return;
		socket.on('connect_error', () => {
			onLoginTry.setLoginState(LOGIN_FAILED_CANNOT_CONNECT);
		});
		return () => socket.off('connect_error');
	});

	useEffect(() => {
		if (socket === null) return;
		socket.on('send-connected-clients', (data) => {
			const { clients } = JSON.parse(data);
			setConnectedClients(clients);
		});
		return () => socket.off('send-connected-clients');
	});

	useEffect(() => {
		if (socket === null) return;
		socket.on('room-state', (data) => {
			const { space } = JSON.parse(data);
			if (space) {
				onLoginTry.setLoginState(LOGIN_OK);
				setRoomSpacesLeft(space - 1);
			} else {
				onLoginTry.setLoginState(LOGIN_FAILED_ROOM_FULL);
			}
		});
		return () => socket.off('room-state');
	});

	const value = {
		socket,
		id: socketID,
		connectedClients,
		roomSpacesLeft,
	};

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};

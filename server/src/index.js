const { log } = console;
const cors = require('cors');
const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const {
	manageNewConnectionToRoom,
	deleteClientFromRoom,
	sendConnectedClients,
	RoomState,
} = require('./utils/room');
const { sendUpToDateEditor } = require('./utils/editor');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

const server = http.createServer(app);

const io = new Server(server, {
	path: '/socket/',
	serveClient: false,
});

const rooms = new Map();

io.on('connection', (socket) => {
	const { username, roomID } = JSON.parse(socket.handshake.query.login);
	const client = {
		username,
		socket,
	};

	const newConnectionToRoom = manageNewConnectionToRoom({
		capacity: 4,
		client,
		rooms,
		roomID,
		socket,
	});
	if (newConnectionToRoom) {
		sendConnectedClients({ io, rooms, roomID });
		sendUpToDateEditor({ socket, rooms, roomID });
		log(`Someone connected:\n${RoomState({ rooms, roomID })}.`);
	}

	socket.on('send-code-data', (data) => {
		socket.broadcast.to(roomID).emit('receive-code-data', data);
	});

	socket.on('send-html-data', (data) => {
		socket.broadcast.to(roomID).emit('receive-html-data', data);
	});

	socket.on('send-style-data', (data) => {
		socket.broadcast.to(roomID).emit('receive-style-data', data);
	});

	socket.on('disconnect', () => {
		deleteClientFromRoom({ client, rooms, roomID });
		sendConnectedClients({ io, rooms, roomID });
		log(`Someone disconnected:\n${RoomState({ rooms, roomID })}.`);
	});
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
	log(`Server listening on port ${PORT}`);
});

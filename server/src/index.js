const { log } = console;
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 4000;
const clients = new Set();

const express = require('express');
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

const server = require('http').createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
	path: '/socket/',
	serveClient: false,
});

io.on('connection', (socket) => {
	let numClients = clients.size;

	const { username, connectedToRoom } = socket.handshake.query;

	const client = {
		username,
		connectedToRoom,
		socket,
	};

	clients.add(client);

	if (numClients !== clients.size) {
		socket.join(client.connectedToRoom);
		sendConnectedClients({ io, client, clients });
		log(`Someone connected. Users online: ${clients.size}`);
	}

	socket.on('send-data', (data) => {
		socket.broadcast.to(client.connectedToRoom).emit('receive-data', data);
	});

	socket.on('disconnect', () => {
		deleteClient({ client, clients });
		sendConnectedClients({ io, client, clients });
		log(`Someone disconnected. Users online: ${clients.size}`);
	});
});

const sendConnectedClients = ({ io, client, clients }) => {
	const roomClients = getRoomClients({ client, clients });
	io.to(client.connectedToRoom).emit(
		'send-connected-clients',
		JSON.stringify({ clients: roomClients }),
	);
};

const getRoomClients = ({ client, clients }) => {
	const roomClients = [];
	for (let c of clients) {
		if (c.connectedToRoom === client.connectedToRoom) {
			roomClients.push({ username: c.username });
		}
	}
	return roomClients;
};

const deleteClient = ({ client, clients }) => {
	for (let c of clients) {
		if (c.socket === client.socket) {
			clients.delete(c);
		}
	}
};

server.listen(PORT, () => {
	log(`Server listening on port ${PORT}`);
});

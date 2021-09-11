const { log } = console;
const cors = require('cors');
const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const { deleteClient, getRoomClients } = require('./utils/client');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

const server = http.createServer(app);

const io = new Server(server, {
	path: '/socket/',
	serveClient: false,
});

const clients = new Set();

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
	const roomClients = getRoomClients({
		roomID: client.connectedToRoom,
		clients,
	});
	const onlyClientsUsernames = roomClients.map((c) => {
		return { username: c.username };
	});
	io.to(client.connectedToRoom).emit(
		'send-connected-clients',
		JSON.stringify({ clients: onlyClientsUsernames }),
	);
};

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
	log(`Server listening on port ${PORT}`);
});

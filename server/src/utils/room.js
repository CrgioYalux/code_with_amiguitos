const RoomState = ({ rooms, roomID }) => {
	const numClients = getRoomNumOfClients({ rooms, roomID });
	return `(${numClients}) client(s) connected to room '${roomID}'`;
};

const sendConnectedClients = ({ io, rooms, roomID }) => {
	const roomClients = rooms.get(roomID);
	const onlyClientsUsernames = [...roomClients].map((c) => {
		return { username: c.username };
	});
	io.to(roomID).emit(
		'send-connected-clients',
		JSON.stringify({ clients: onlyClientsUsernames }),
	);
};

const deleteClientFromRoom = ({ roomID, rooms, client }) => {
	const clients = rooms.get(roomID);
	clients.delete(client);
	rooms.set(roomID, clients);
};

const manageNewConnectionToRoom = ({
	rooms,
	roomID,
	client,
	capacity,
	socket,
}) => {
	const roomSpacesLeftBeforeOps =
		capacity - getRoomNumOfClients({ roomID, rooms });

	socket.emit('room-state', JSON.stringify({ space: roomSpacesLeftBeforeOps }));

	if (roomSpacesLeftBeforeOps !== 0) {
		if (roomSpacesLeftBeforeOps === capacity) {
			const clients = new Set();
			clients.add(client);
			rooms.set(roomID, clients);
		} else {
			rooms.get(roomID).add(client);
		}
		socket.join(roomID);
		return true;
	}
	return false;
};

const getRoomNumOfClients = ({ roomID, rooms }) => {
	const clients = rooms.get(roomID);
	if (!clients) return 0;
	return rooms.get(roomID).size;
};

module.exports = {
	RoomState,
	sendConnectedClients,
	deleteClientFromRoom,
	manageNewConnectionToRoom,
};

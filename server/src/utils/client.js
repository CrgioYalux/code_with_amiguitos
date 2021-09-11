const getRoomClients = ({ roomID, clients }) => {
	const roomClients = [];
	for (let client of clients) {
		if (client.connectedToRoom === roomID) {
			roomClients.push(client);
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

module.exports = {
	getRoomClients,
	deleteClient,
};

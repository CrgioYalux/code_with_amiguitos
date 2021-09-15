const { getRoomNumOfClients } = require('./room');

const sendUpToDateEditor = ({ socket, rooms, roomID }) => {
	const numClients = getRoomNumOfClients({ roomID, rooms });
	if (numClients === 1) {
		return;
	}
	const [firstEnterClient] = [...rooms.get(roomID)];
	firstEnterClient.socket.emit('get-uptodate-editor');
	firstEnterClient.socket.on('send-uptodate-editor', (data) => {
		socket.emit('receive-data', data);
	});
};

module.exports = {
	sendUpToDateEditor,
};

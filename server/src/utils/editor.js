const { getRoomNumOfClients } = require('./room');

const sendUpToDateEditor = ({ socket, rooms, roomID }) => {
	const numClients = getRoomNumOfClients({ roomID, rooms });
	if (numClients === 1) {
		return;
	}
	const [firstEnterClient] = [...rooms.get(roomID)];
	firstEnterClient.socket.emit('get-uptodate-editor');
	firstEnterClient.socket.on('send-uptodate-editor', (data) => {
		const { code, html, style, from } = JSON.parse(data);
		if (code) {
			socket.emit('receive-code-data', JSON.stringify({ data: code, from }));
		}
		if (html) {
			socket.emit('receive-html-data', JSON.stringify({ data: html, from }));
		}
		if (style) {
			socket.emit('receive-style-data', JSON.stringify({ data: style, from }));
		}
	});
};

module.exports = {
	sendUpToDateEditor,
};

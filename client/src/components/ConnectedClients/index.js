import './ConnectedClients.css';
import { useSocket } from '../../providers/SocketProvider';
import { DisplayUsername } from '../DisplayUsername';
export const ConnectedClients = () => {
	const { connectedClients } = useSocket();
	return (
		<div className="connected_clients_container">
			{connectedClients.map((client) => (
				<DisplayUsername key={client.username} username={client.username} />
			))}
		</div>
	);
};

import './ConnectedClients.css';
// import { useSocket } from '../../providers/SocketProvider';
const colors = ['blue', 'green', 'yellow', 'indigo'];
export const ConnectedClients = () => {
	// const { connectedClients } = useSocket();
	const connectedClients = [
		{ username: 'Pabloe' },
		{ username: 'Crgio' },
		{ username: 'Carl' },
		{ username: 'Marcs' },
	];
	return (
		<div className="connected_clients_container">
			{connectedClients.map((client, index) => (
				<p
					key={client.username}
					className="client"
					onMouseEnter={(e) => {
						e.target.innerText = client.username;
					}}
					onMouseLeave={(e) => {
						e.target.innerText = client.username[0];
					}}
					style={{
						right: `${index * 10}px`,
						borderColor: `var(--${colors[index]}-800)`,
						color: `var(--${colors[index]}-600)`,
					}}
				>
					{client.username[0]}
				</p>
			))}
		</div>
	);
};

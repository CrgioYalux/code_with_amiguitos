import './RoomInfo.css';
import { useRef } from 'react';
import { useClient } from '../../providers/ClientProvider';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { ConnectedClients } from '../ConnectedClients';

export const RoomInfo = () => {
	const { roomID } = useClient();
	const roomIDRef = useRef(null);

	const handleClick = () => {
		copyToClipboard(roomID);
		roomIDRef.current.classList.add('copy_id_animation');
		setTimeout(() => {
			roomIDRef.current.classList.remove('copy_id_animation');
		}, 400);
	};

	return (
		<div className="room_info_container">
			<div className="room_info_id_container">
				<p>Room ID</p>
				<div onClick={handleClick} className="room_info_id">
					<p>{roomID}</p>
					<i className="clipboard-icon far fa-copy"></i>
					<span ref={roomIDRef} className=""></span>
				</div>
			</div>
			<ConnectedClients />
		</div>
	);
};

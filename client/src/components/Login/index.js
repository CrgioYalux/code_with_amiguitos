import './Login.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	LOGIN_FAILED_CANNOT_CONNECT,
	LOGIN_FAILED_ROOM_FULL,
	LOGIN_LOADING,
} from './states';

export const Login = ({ onSubmit, state }) => {
	const [roomID, setRoomID] = useState('');
	const [username, setUsername] = useState('');

	const handleChangeRoomID = (event) => {
		setRoomID(event.target.value.trim());
	};

	const handleChangeUsername = (event) => {
		setUsername(event.target.value.trim());
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		formIsReady &&
			onSubmit.setLoginData({
				roomID,
				username,
			});
		onSubmit.setLoginState(LOGIN_LOADING);
	};

	const createNewID = (event) => {
		setRoomID(uuidv4());
		if (!validUsername) event.target.form.elements.username.focus();
	};

	const statusLength = `${10 - username.length}/10`;
	const validUsername = username && username.length <= 10;
	const formIsReady = validUsername && roomID;

	return (
		<div className="login_container">
			<form onSubmit={handleSubmit} className="form_container">
				<div className="form_field">
					<label htmlFor="username" className="form_label">
						Username:
					</label>
					<input
						name="username"
						id="username"
						value={username}
						onChange={handleChangeUsername}
						className="form_input"
						type="text"
						placeholder="Enter your username"
						autoFocus
						required
					/>
					<div
						className={`input_length ${
							validUsername ? 'input_length-valid' : 'input_length-invalid'
						}`}
					>
						{statusLength}
					</div>
				</div>
				<div className="form_field">
					<label htmlFor="roomID" className="form_label">
						Room ID:
					</label>
					<input
						name="roomID"
						id="roomID"
						value={roomID}
						onChange={handleChangeRoomID}
						className="form_input"
						type="text"
						placeholder="Enter the room's ID"
						required
					/>
				</div>
				<div className="buttons_container">
					<input
						type="submit"
						className={`button button_submit ${
							formIsReady ? 'button-enabled' : 'button-disabled'
						}`}
						value="Join room"
					/>
					<button
						type="button"
						className="button button_create"
						onClick={createNewID}
					>
						Random ID
					</button>
				</div>
			</form>
			{state === LOGIN_FAILED_ROOM_FULL && (
				<p className="login_status_msg">
					Couldn't enter the room because it's full.
				</p>
			)}
			{state === LOGIN_FAILED_CANNOT_CONNECT && (
				<p className="login_status_msg">Couldn't connect to the server.</p>
			)}
		</div>
	);
};

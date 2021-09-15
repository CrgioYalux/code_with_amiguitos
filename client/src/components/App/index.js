import './App.css';
import { useState } from 'react';
import { SocketProvider } from '../../providers/SocketProvider';
import { ClientProvider } from '../../providers/ClientProvider';
import { Room } from '../Room';
import { Login } from '../Login';
import {
	LOGIN_FAILED_CANNOT_CONNECT,
	LOGIN_FAILED_ROOM_FULL,
	LOGIN_OK,
	LOGIN_UNSET,
} from '../Login/states';

const path = '/socket/';

const App = () => {
	const [loginData, setLoginData] = useState(null);
	const [loginState, setLoginState] = useState(LOGIN_UNSET);
	const loginUnsuccessful =
		!loginData ||
		loginState === LOGIN_FAILED_CANNOT_CONNECT ||
		loginState === LOGIN_FAILED_ROOM_FULL;
	if (loginUnsuccessful) {
		return (
			<Login onSubmit={{ setLoginData, setLoginState }} state={loginState} />
		);
	}
	return (
		<ClientProvider login={loginData}>
			<SocketProvider path={path} onLoginTry={{ setLoginState }}>
				{loginState === LOGIN_OK && <Room />}
			</SocketProvider>
		</ClientProvider>
	);
};

export default App;

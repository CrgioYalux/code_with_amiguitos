import './App.css';
import { useState, useEffect } from 'react';
import { SocketProvider } from '../../providers/SocketProvider';
import { ClientProvider } from '../../providers/ClientProvider';
import { Editor } from '../Editor';
import { Login } from '../Login';
import { LOGIN_FAILED, LOGIN_LOADING, LOGIN_OK } from '../Login/states';

const path = '/socket/';

const App = () => {
	const [loginData, setLoginData] = useState(null);
	const [loginState, setLoginState] = useState(LOGIN_LOADING);

	useEffect(() => {
		console.log(loginData);
	}, [loginData]);

	if (!loginData || loginState === LOGIN_FAILED)
		return (
			<Login onSubmit={{ setLoginData, setLoginState }} state={loginState} />
		);
	return (
		<ClientProvider login={loginData}>
			<SocketProvider path={path} onLoginTry={{ setLoginState }}>
				{loginState === LOGIN_OK ? <Editor /> : null}
			</SocketProvider>
		</ClientProvider>
	);
};

export default App;

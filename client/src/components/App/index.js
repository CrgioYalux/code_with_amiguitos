import './App.css';
import { useState } from 'react';
import { SocketProvider } from '../../providers/SocketProvider';
import { ClientProvider } from '../../providers/ClientProvider';
import { Editor } from '../Editor';
import { Login } from '../Login';

const path = '/socket/';

const App = () => {
	const [loginData, setLoginData] = useState(null);
	if (!loginData) return <Login onSubmit={{ setLoginData }} />;
	return (
		<ClientProvider login={loginData}>
			<SocketProvider path={path}>
				<Editor />
			</SocketProvider>
		</ClientProvider>
	);
};

export default App;

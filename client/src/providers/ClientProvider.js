import { createContext, useContext } from 'react';

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientProvider = ({ children, login }) => {
	const value = {
		username: login.username,
		roomID: login.roomID,
	};

	return (
		<ClientContext.Provider value={value}>{children}</ClientContext.Provider>
	);
};

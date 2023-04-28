/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import LoguinExpress from './components/Login/login-express';
import Tasks from './components/TasksComponent/Tasks';
import { UserContext } from './contexts/autentification';
import { useTokenVerification } from './hooks/AuthHook';

const localToken = localStorage.getItem('token');

export default function App() {
	const { userId, setUserId } = useContext(UserContext);

	function successVerification(userData: string) {
		const { userID, newToken } = JSON.parse(userData);
		localStorage.token = newToken;
		setUserId(userID);
	}

	const { verifyToken } = useTokenVerification(successVerification, () =>
		localStorage.removeItem('token')
	);

	useEffect(() => {
		if (localToken !== null) verifyToken(localToken);
	}, []);

	return userId === undefined ? <LoguinExpress /> : <Tasks />;
}

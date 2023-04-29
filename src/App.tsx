/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import LoguinExpress from './components/Login/login-express';
import Tasks from './components/TasksComponent/Tasks';
import { UserContext } from './contexts/autentification';
import { useTokenVerification } from './hooks/AuthHook';

const localToken = localStorage.getItem('token');

export default function App() {
	const { userId, setUserId } = useContext(UserContext);
	const [content, setContent] = useState(<div />);

	function successVerification(userData: string) {
		const { userID, newToken } = JSON.parse(userData);
		localStorage.token = newToken;
		setUserId(userID);
		setContent(<Tasks />);
	}

	const { verifyToken } = useTokenVerification(successVerification, () => {
		localStorage.removeItem('token');
		setContent(<LoguinExpress />);
	});

	useEffect(() => {
		console.log(userId);
		if (localToken !== null) verifyToken(localToken);
		else if (userId === -1) setContent(<LoguinExpress />);
		else setContent(<Tasks />);
	}, [userId]);

	return content;
}

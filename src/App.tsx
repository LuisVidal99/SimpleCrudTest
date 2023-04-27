/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import AuthForm from './components/Login/AuthForm';
import Tasks from './components/TasksComponent/Tasks';
import { UserContext } from './contexts/autentification';
import { useTokenVerification } from './hooks/AuthHook';

export default function App() {
	const { userId, setUserId } = useContext(UserContext);

	console.log(import.meta.env.MODE);

	function successVerification(newToken: string) {
		localStorage.token = newToken;
		setUserId(newToken);
	}

	const { verifyToken, verifing } = useTokenVerification(successVerification);

	useEffect(() => {
		const localToken = localStorage.getItem('token');
		if (localToken !== null) verifyToken(localToken);
	}, []);

	let content = userId === null ? <AuthForm /> : <Tasks />;

	switch (verifing) {
		case 'success':
			content = <Tasks />;
			break;
		case 'error':
			localStorage.removeItem('token');
			break;
		case 'loading':
			content = <h1>Verifing....</h1>;
			break;
		default:
			break;
	}

	return <div className="App">{content}</div>;
}

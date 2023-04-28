import {
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useContext,
	useState,
} from 'react';
import { TokenResponse } from '../../api/LoguinApi';
import { UserContext } from '../../contexts/autentification';
import { useAuth } from '../../hooks/AuthHook';
import { handleInputWriting } from '../_utils';
import Form from './Form';

interface IFormProps {
	userExist: Dispatch<SetStateAction<boolean>>;
}

// TODO hay q hacer la validacion de los compos del formulario
// TODO hoy q utilizar los cookies para la autovalidacion

//! Login Form
function Login({ userExist }: IFormProps) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { setUserId } = useContext(UserContext);

	const user = {
		username,
		password,
	};

	// authtenticate login user
	function authSuccess({ token }: TokenResponse) {
		localStorage.setItem('token', token);
		setUserId(token);
	}

	const { authUser } = useAuth(authSuccess);

	const inputs = [
		{
			label: 'Email',
			set: (e: SyntheticEvent) => handleInputWriting(e, setUsername),
		},
		{
			label: 'Password',
			set: (e: SyntheticEvent) => handleInputWriting(e, setPassword),
		},
	];

	const botttonText = {
		message: "Don't you have an account?",
		link: 'Sign up',
		action: () => userExist(false),
	};

	return (
		<Form
			name="Sign in"
			input={inputs}
			submit={{
				text: 'Sign in',
				action: (event: SyntheticEvent) => {
					event.preventDefault();
					authUser(user);
				},
			}}
			bottonLabel={botttonText}
		/>
	);
}

/*! Register
function Signup({ auth, userExist }: IFormProps) {
	
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repeatedPass, setRepeatedPass] = useState('');

	const inputs = [
		{
			label: 'Email',
			set: (e: SyntheticEvent) => handleInputWriting(e, setUsername),
		},
		{
			label: 'Password',
			set: (e: SyntheticEvent) => handleInputWriting(e, setPassword),
		},
		{
			label: 'Repeat Password',
			set: (e: SyntheticEvent) => handleInputWriting(e, setRepeatedPass),
		},
	];

	const botttonText = {
		message: 'Do you have an account?',
		link: 'Sign in',
		action: () => userExist(true),
	};

	const handleSubmit = () => {};

	return (
		<Form
			name="Sign up"
			input={inputs}
			submit={{ text: 'Sign up', action: handleSubmit }}
			bottonLabel={botttonText}
		/>
	); 
} */

export default function AuthForm() {
	const [userExist, setUserExist] = useState(true);

	return userExist ? (
		<Login userExist={setUserExist} />
	) : (
		// <Signup auth={auth} userExist={setUserExist} />
		<p>hola</p>
	);
}

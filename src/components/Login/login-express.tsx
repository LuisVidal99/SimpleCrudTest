import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox } from '@material-tailwind/react';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';
import { TokenResponse } from './Services/login.service';
import { UserContext } from '../../contexts/autentification';
import { useAuth } from '../../hooks/AuthHook';
import TextInput, { InputTypes } from './form-inputs/text-input';

const validationSchema = object().shape({
	username: string().required('username required'),
	password: string()
		.min(4, 'too small, it have tobe bigger than 4 characters')
		.required('password required'),
});
type LoginInfo = InferType<typeof validationSchema>;

export default function LoguinExpress() {
	/**
	 * * States
	 */
	const [remember, setRemember] = useState(false);
	const { setUserId } = useContext(UserContext);

	/**
	 * * form
	 */
	// ? handle form
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginInfo>({
		resolver: yupResolver(validationSchema),
	});

	// ? handle request
	function authSuccess({ token, pk }: TokenResponse) {
		if (remember) localStorage.setItem('token', token);
		sessionStorage.setItem('token', token);
		setUserId(pk);
	}
	const { authUser } = useAuth(authSuccess);

	const handleSubmitForm = (data: LoginInfo) => authUser(data);

	/**
	 * * styles
	 */
	const styles = {
		input: classNames(
			'border border-blue-gray-200 rounded-lg p-2 mt-2 text-lg w-full'
		),
		label: classNames('text-gray-700 select-none'),
		feedback: classNames('text-red-500 text-sm pl-2'),
	};

	/**
	 * * Render
	 */
	return (
		<div className="fixed w-full h-full  bg-blue-300 flex justify-center">
			<form
				className="action-form bg-white rounded-xl self-center px-4 pb-3 w-96"
				onSubmit={handleSubmit(handleSubmitForm)}
			>
				<div className="w-full">
					<div className="bg-gradient-to-tl from-blue-600 to-blue-400 shadow-lg shadow-blue-500/40 rounded-xl -mb-3 p-1 -translate-y-7">
						<h1 className="text-center font-semibold font p-2 select-none text-white">
							Wellcome!!
						</h1>
					</div>
				</div>
				<div className="">
					<TextInput
						type={InputTypes.text}
						register={register}
						name="username"
						placeholder="Username..."
						className="p-2"
						label="Username:"
						style={styles}
						feedback={errors.username?.message}
					/>
					<TextInput
						type={InputTypes.password}
						register={register}
						name="password"
						placeholder="Password..."
						className="p-2"
						label="Password:"
						style={styles}
						feedback={errors.password?.message}
					/>
					<Checkbox
						label="Remember Me"
						onClick={() => setRemember(!remember)}
					/>
				</div>
				<div>
					<Button variant="gradient" fullWidth type="submit" className="mt-3">
						login
					</Button>
				</div>
			</form>
		</div>
	);
}

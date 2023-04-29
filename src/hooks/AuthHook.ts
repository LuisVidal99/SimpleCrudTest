import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
	authLogin,
	refreshUser,
	TokenResponse,
	verifyUser,
} from '../components/Login/Services/login.service';

export function useAuth(
	success?: (data: TokenResponse) => void,
	error?: (error: AxiosError) => void
) {
	const {
		mutate: authUser,
		isSuccess: authSuccess,
		isLoading: authLoading,
		isError: authError,
		data: userData,
	} = useMutation(authLogin, { onSuccess: success, onError: error });

	type AuthHook = {
		authUser: typeof authUser;
		userData: TokenResponse;
		authLoading: boolean;
		authSuccess: boolean;
		authError: boolean;
	};

	return {
		authUser,
		userData,
		authLoading,
		authSuccess,
		authError,
	} as AuthHook;
}

export function useTokenVerification(
	success?: (data: string) => void,
	failure?: () => void
) {
	const verification = async (token: string) => {
		await verifyUser(token);
		const { token: newToken, pk: userID } = await refreshUser(token);
		return JSON.stringify({ newToken, userID });
	};

	const { mutate: verifyToken, status: verifing } = useMutation(verification, {
		onSuccess: success,
		onError: failure,
	});

	return {
		verifyToken,
		verifing,
	};
}

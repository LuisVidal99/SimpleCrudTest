import ApiTasks from './ApiConfig';

export type User = {
	username: string;
	password: string;
};

export type TokenResponse = {
	pk: number;
	token: string;
};

export async function authLogin({
	username,
	password,
}: User): Promise<TokenResponse> {
	const { data } = await ApiTasks.post('/api-token-auth/', {
		username,
		password,
	});
	return data;
}

export async function verifyUser(token: string) {
	await ApiTasks.post('/api-token-verify/', { token });
}

export async function refreshUser(token: string): Promise<TokenResponse> {
	const { data } = await ApiTasks.post('/api-token-verify/', { token });
	return data;
}

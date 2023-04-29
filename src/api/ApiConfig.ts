import axios from 'axios';

const BASE_URL = 'https://luisvidal87.pythonanywhere.com';

const ApiTasks = axios.create({
	baseURL: BASE_URL,
});

export const ApiTasksPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

export default ApiTasks;

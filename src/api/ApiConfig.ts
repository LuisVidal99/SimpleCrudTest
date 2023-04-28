import axios from 'axios';

const ApiTasks = axios.create({
	baseURL: 'https://luisvidal87.pythonanywhere.com',
});

export default ApiTasks;

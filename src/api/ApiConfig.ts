import axios from 'axios';

const ApiTasks = axios.create({
	baseURL: "http://luisvidal87.pythonanywhere.com/"
});

export default ApiTasks;

import jwt from 'jwt-decode';
import ApiTasks from '../../../api/ApiConfig';

export type Task = {
	id: number;
	task: string;
	insert_by: number;
	user_name: string;
	created_at: string;
	updated_at: string;
};

type GetTasksResponse = {
	count: number;
	next: string;
	previous: string;
	results: Task[];
};

export async function getTasks(): Promise<GetTasksResponse> {
	const { data } = await ApiTasks.get('/tasks/');
	return data;
}

export async function postTask(task: { task: string; insert_by: number }) {
	const dataForm = new FormData();
	const tokenData = jwt(localStorage.token) as { user_id: string };

	console.log(tokenData);

	dataForm.append('insert_by', tokenData.user_id);
	dataForm.append('task', task.task);

	const { data } = await ApiTasks.post('/tasks/', dataForm, {
		headers: {
			Authorization: `Bearer ${localStorage.token}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	return data;
}

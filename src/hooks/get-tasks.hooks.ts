import { useMutation } from '@tanstack/react-query';
import { getTasks } from '../components/TasksComponent/Services/task.service';

export default function useGetTasks() {
	const { mutate: GetTasks, status: fetchingTasks } = useMutation(getTasks);
	return { GetTasks, fetchingTasks };
}

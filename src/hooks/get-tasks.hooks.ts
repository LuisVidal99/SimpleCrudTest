import { useMutation } from '@tanstack/react-query';
import { getTasks } from '../components/TasksComponent/Services/TaskApi';

export default function useGetTasks() {
	const { mutate: GetTasks, status: fetchingTasks } = useMutation(getTasks);
	return { GetTasks, fetchingTasks };
}

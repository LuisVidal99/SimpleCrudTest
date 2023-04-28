import { useMutation } from '@tanstack/react-query';
import { getTasks } from '../api/TaskApi';

export function useGetTsasks() {
	const { mutate: gGtTasks } = useMutation(getTasks);
}

export function useGetTasks() {
	const { mutate: GetTasks, status: fetchingTasks } = useMutation(getTasks);
	return { GetTasks, fetchingTasks };
}

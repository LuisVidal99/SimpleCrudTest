import { useMutation } from '@tanstack/react-query';
import { postTask } from '../components/TasksComponent/Services/task.service';

export default function usePostTask({
	onError,
	onSuccess,
}: {
	onError: () => void;
	onSuccess: () => void;
}) {
	const { mutate: post } = useMutation(postTask, { onError, onSuccess });
	return post;
}

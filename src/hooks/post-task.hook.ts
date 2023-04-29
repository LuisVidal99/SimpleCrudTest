import { useMutation } from '@tanstack/react-query';
import { postTask } from '../components/TasksComponent/Services/task.service';

export default function usePostTask() {
	const { mutate: post } = useMutation(postTask, {
		onSuccess: (data) => console.log(data),
	});
	return post;
}

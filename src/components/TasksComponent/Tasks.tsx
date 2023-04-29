import AddTask from './AddTasks/AddTask';
import TasksProvider from './Context/tasks.context';
import TasksList from './TasksList';

export default function Tasks() {
	return (
		<TasksProvider>
			<AddTask />
			<TasksList />
		</TasksProvider>
	);
}

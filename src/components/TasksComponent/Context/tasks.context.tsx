import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useMemo,
	useState,
} from 'react';
import { Task } from '../Services/task.service';

type ContextDefault = {
	tasks: Task[];
	setTasks: Dispatch<SetStateAction<Task[]>>;
};

const defaultContext = {
	tasks: [],
	setTasks: () => {},
} as ContextDefault;

export const TasksContext = createContext(defaultContext);

export default function TasksProvider({ children }: { children: ReactNode }) {
	const [tasks, setTasks] = useState(defaultContext.tasks);
	const value = useMemo(() => {
		return { tasks, setTasks };
	}, [tasks]);

	return (
		<TasksContext.Provider value={value}>{children}</TasksContext.Provider>
	);
}

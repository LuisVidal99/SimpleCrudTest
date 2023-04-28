import { useContext } from 'react';
import AddTaskContextProvider, {
	AddTaskContext,
} from './context/AddTasksContext';
import AddTaskInput from './Input';
import TaskMenu from './Menu/Menu';

export default function AddTask() {
	const [menuDisplay] = useContext(AddTaskContext).MenuDisplay;

	return (
		<AddTaskContextProvider>
			<div className="grid justify-items-center">
				<div
					className={`flex flex-col w-1/10 my-10 transition-width duration-[5.5s] ${
						menuDisplay && 'border rounded-md w-4/5'
					}`}
				>
					<AddTaskInput />
					<TaskMenu />
				</div>
			</div>
		</AddTaskContextProvider>
	);
}

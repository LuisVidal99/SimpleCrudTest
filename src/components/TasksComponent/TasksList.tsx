import { AgGridReact } from 'ag-grid-react';

import { useQuery } from '@tanstack/react-query';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useContext, useMemo } from 'react';
import { TasksContext } from './Context/tasks.context';
import { getTasks } from './Services/task.service';

function TasksList() {
	const columns = useMemo(
		() => [
			{ field: 'id', headerName: 'Task #' },
			{ field: 'task', headerName: 'Task' },
			{ field: 'user_name', headerName: 'User' },
			{ field: 'created_at', headerName: 'Created' },
			{ field: 'updated_at', headerName: 'Last Update' },
		],
		[]
	);

	const { tasks, setTasks } = useContext(TasksContext);

	const Tasks = useQuery(['getTasks'], getTasks, {
		onSuccess(data) {
			setTasks(data.results);
		},
	});

	if (Tasks.isSuccess)
		return (
			<div className="ag-theme-alpine my-1 p-10 h-[600px] w-full">
				<AgGridReact
					defaultColDef={{
						flex: 1,
						minWidth: 100,
					}}
					rowData={tasks}
					columnDefs={columns}
				/>
			</div>
		);
	return <div />;
}

export default TasksList;

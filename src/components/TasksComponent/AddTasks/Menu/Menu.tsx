import classNames from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import {
	calendarIcon,
	discIcon,
	loaderIcon,
	maximizeIcon,
	unlockIcon,
} from '../../../../assets/Icons';
import { UserContext } from '../../../../contexts/autentification';
import usePostTask from '../../../../hooks/post-task.hook';
import { AddTaskContext } from '../context/AddTasksContext';
import TaskMenuButton from './ButtonTaskList';

function TaskMenu() {
	const todayButtonRef = useRef<HTMLButtonElement>(null);
	const publicButtonRef = useRef<HTMLButtonElement>(null);
	const normalButtonRef = useRef<HTMLButtonElement>(null);
	const estimationButtonRef = useRef<HTMLButtonElement>(null);
	const buttonOkRef = useRef<HTMLButtonElement>(null);

	/**
	 * * states
	 */
	const { userId } = useContext(UserContext);
	const [Text, SetText] = useContext(AddTaskContext).InputText;
	const [showMenu, SetMenu] = useContext(AddTaskContext).MenuDisplay;

	/**
	 * * requests
	 */
	const post = usePostTask();

	/**
	 * * Logic
	 */
	// ? ButtonAllower
	useEffect(() => {
		if (Text === '') SetMenu(false);
		else SetMenu(true);

		const Buttons = [
			todayButtonRef,
			publicButtonRef,
			normalButtonRef,
			estimationButtonRef,
		];

		const buttonOk =
			buttonOkRef.current === null ? new HTMLElement() : buttonOkRef.current;

		const buttonState = (buttons: typeof Buttons, state: boolean) => {
			buttons.map((button) =>
				state
					? button.current?.classList.add('disabled-button')
					: button.current?.classList.remove('disabled-button')
			);
		};

		if (Text === '') {
			buttonOk.innerHTML = 'Ok';
			buttonState(Buttons, true);
		} else {
			buttonOk.innerHTML = 'Add';
			buttonState(Buttons, false);
		}
	}, [SetMenu, Text]);

	const handleCancel = () => {
		SetText('');
		SetMenu(false);
	};

	// TODO refrescar el query "getTasks"
	const handleOK = () => {
		post({ task: Text, insert_by: userId });
	};

	/**
	 * * Render
	 */
	return (
		<div
			className={classNames('flex justify-between border-t p-1 shadow-lg', {
				hidden: !showMenu,
			})}
		>
			<div className="flex">
				<TaskMenuButton className="mr-8 ">
					{maximizeIcon}
					<span className="hidden xl:flex">Open</span>
				</TaskMenuButton>
				<TaskMenuButton Ref={todayButtonRef}>
					{calendarIcon}
					<span className="hidden xl:flex">Today</span>
				</TaskMenuButton>
				<TaskMenuButton Ref={publicButtonRef}>
					{unlockIcon}
					<span className="hidden xl:flex">Public</span>
				</TaskMenuButton>
				<TaskMenuButton Ref={normalButtonRef}>
					{discIcon}
					<span className="hidden xl:flex">Normal</span>
				</TaskMenuButton>
				<TaskMenuButton Ref={estimationButtonRef}>
					{loaderIcon}
					<span className="hidden xl:flex">Estimation</span>
				</TaskMenuButton>
			</div>
			<div className="flex">
				<TaskMenuButton onClick={handleCancel} className="xl:flex hidden">
					Cancel
				</TaskMenuButton>
				<TaskMenuButton
					className="text-white !bg-[#0d54ce] !px-4"
					onClick={handleOK}
					Ref={buttonOkRef}
				>
					Ok
				</TaskMenuButton>
			</div>
		</div>
	);
}
//! END COMPONENT

export default TaskMenu;

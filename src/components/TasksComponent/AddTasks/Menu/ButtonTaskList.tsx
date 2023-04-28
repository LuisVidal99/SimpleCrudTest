import { MouseEventHandler, ReactNode, RefObject } from 'react';

type ButtonTaskListProps = {
	children?: ReactNode;
	className?: string;
	id?: string;
	onClick?: MouseEventHandler;
	Ref?: RefObject<HTMLButtonElement>;
};

function TaskMenuButton({
	children,
	className,
	id,
	onClick,
	Ref: reference,
}: ButtonTaskListProps) {
	const style =
		'cursor-pointer flex items-center py-0.5 px-4 border rounded-md m-0.5 h-8 text-sm font-mono bg-[#EAF0F5]';

	return (
		<button
			type="button"
			className={`${style} ${className}`}
			id={id}
			onClick={onClick}
			ref={reference}
		>
			{children}
		</button>
	);
}

export default TaskMenuButton;

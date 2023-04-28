import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useMemo,
	useState,
} from 'react';

export type State<T> = [T, Dispatch<SetStateAction<T>>];

export type Default = {
	MenuDisplay: State<boolean>;
	InputText: State<string>;
};

const defaultContext = {
	MenuDisplay: [true, () => {}] as State<boolean>,
	InputText: ['', () => {}] as State<string>,
};

export const AddTaskContext = createContext(defaultContext);

export default function AddTaskContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const menuDisplayState: State<boolean> = useState(false);
	const inputTextState: State<string> = useState('');
	const context = useMemo(
		() => ({
			MenuDisplay: menuDisplayState,
			InputText: inputTextState,
		}),
		[menuDisplayState, inputTextState]
	);

	return (
		<AddTaskContext.Provider value={context}>
			{children}
		</AddTaskContext.Provider>
	);
}

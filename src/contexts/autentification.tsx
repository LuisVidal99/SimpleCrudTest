import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useMemo,
	useState,
} from 'react';

type ContextDefault = {
	userId: number;
	setUserId: Dispatch<SetStateAction<number>>;
};

const defaultContext = {
	userId: 0,
	setUserId: () => {},
} as ContextDefault;

export const UserContext = createContext(defaultContext);

export default function UserProvider({ children }: { children: ReactNode }) {
	const [userId, setUserId] = useState<number>();
	const user = useMemo(() => ({ userId, setUserId }), [userId]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

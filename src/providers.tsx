import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import UserProvider from './contexts/autentification';

const queryClient = new QueryClient();

export default function Provider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>{children}</UserProvider>
		</QueryClientProvider>
	);
}

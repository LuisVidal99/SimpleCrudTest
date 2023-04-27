/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

export type State = {
	value: any;
	set: Dispatch<SetStateAction<any>>;
};

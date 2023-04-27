/* eslint-disable import/prefer-default-export */
import { SyntheticEvent, Dispatch, SetStateAction } from 'react';

export function handleInputWriting(
	e: SyntheticEvent,
	set: Dispatch<SetStateAction<string>>
) {
	const { value } = e.target as HTMLInputElement;
	set(value);
}

import { SyntheticEvent, useContext, useEffect, useRef } from 'react';

import { minorSquereIcon, plusSquareIcon } from '../../../assets/Icons';
import { handleInputWriting } from '../../_utils';
import { AddTaskContext } from './context/AddTasksContext';

export default function AddTaskInput() {
	const inputRef = useRef<HTMLInputElement>(null);
	const spanRef = useRef<HTMLElement>(null);

	const [menuDisplay, setMenuDisplay] = useContext(AddTaskContext).MenuDisplay;
	const [inputText, setTask] = useContext(AddTaskContext).InputText;

	const handleAddClick = () => {
		setMenuDisplay(!menuDisplay);
		setTask('');
	};

	//* Input Focus Watcher
	const handleFocusInput = () => {
		setMenuDisplay(true);

		const watcher = (e: globalThis.MouseEvent) => {
			const clickOut = e.target !== inputRef.current;
			const inputEmpty = inputRef.current?.value === '';

			if (clickOut && inputEmpty) {
				setMenuDisplay(false);
				window.removeEventListener('click', watcher);
			}
		};

		window.addEventListener('click', watcher);
	};

	//* agregar el tratamiento del texto
	const handleSpan = (inputTextArray: string[]) => {
		const urlPattern =
			/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

		const RegularGmailPattern =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		inputTextArray.forEach((item) => {
			const newElement = document.createElement('a');

			newElement.innerText = item;
			newElement.style.marginRight = '4px';
			newElement.style.color = '#374359';
			newElement.style.pointerEvents = 'none';

			const IsLink = (href: string): void => {
				newElement.style.pointerEvents = 'auto';
				newElement.href = href;
			};

			// type check
			switch (item[0]) {
				case '@':
					newElement.style.color = '#11ab78';
					IsLink('#');
					break;
				case '#':
					newElement.style.color = '#7130e6';
					IsLink('#');
					break;
				default:
					if (RegularGmailPattern.test(item)) {
						newElement.style.color = '#F7A43A';
						IsLink('#');
					} else if (urlPattern.test(item)) {
						newElement.style.color = '#1588FF';
						IsLink('#');
					}
					break;
			}

			spanRef.current?.appendChild(newElement);
		});
	};

	// FIXME Este pedazo de code no es un effecto sino mas bien deberia tratarse como un onChange evento en el input y evitar hacer las referencias a objetos del dom mediante javascript vanilla  y usar los hooks de referencias

	//* Text input change color
	useEffect(() => {
		const textColorSpan = spanRef.current;
		const inputTextElement = inputRef?.current;
		const inputTextArray: string[] = inputText.split(' ');

		if (textColorSpan != null) {
			textColorSpan.innerHTML = '';

			handleSpan(inputTextArray);

			if (textColorSpan.innerHTML !== '' && inputTextElement != null) {
				inputTextElement.style.caretColor = 'black';
				inputTextElement.style.cursor = 'text';
			}
		}
	}, [inputText]);

	return (
		<div className="flex p-2 w-full h-15">
			<div className="flex p-2 w-full h-15 justify-between">
				<button
					type="button"
					className="cursor-pointer"
					onClick={handleAddClick}
				>
					{menuDisplay ? minorSquereIcon : plusSquareIcon}
				</button>
				<input
					type="text"
					onChange={(e: SyntheticEvent) => handleInputWriting(e, setTask)}
					onFocus={handleFocusInput}
					placeholder="Type to add new task"
					className="font-serif w-full outline-none text-transparent flex selection:bg-blue-300"
					ref={inputRef}
					value={inputText}
				/>
				<span
					className="absolute h-6 w-full flex items-center pointer-events-none ml-[29.8px] font-serif"
					ref={spanRef}
				/>
			</div>
			<div>
				<img src="/img/team-3.jpg" alt="" />
			</div>
		</div>
	);
}

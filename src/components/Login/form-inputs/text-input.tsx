/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import IInput from './input';

export enum InputTypes {
	email = 'email',
	text = 'text',
	password = 'password',
	phone = 'tel',
}

interface ITextInput extends IInput {
	type: InputTypes;
	decoration?: string;
	style?: {
		label?: string;
		input?: string;
		feedback?: string;
		decoration?: string;
	};
}

export default function TextInput({
	name,
	label,
	style,
	register,
	placeholder,
	feedback,
	className,
	type,
	decoration,
}: ITextInput) {
	//* Logic
	const reg = register !== undefined ? register : () => {};

	//* Styles
	const labelStyle = classNames('label', style?.label);
	const decorationStyle = classNames('decorationText', style?.decoration);
	const inputStyle = classNames('input', style?.input);
	const feedbackStyle = classNames('feedback', style?.feedback);

	//* Component
	return (
		<div className={classNames(className)}>
			<label htmlFor={name} className={labelStyle}>
				{label}
			</label>
			<div className="flex">
				{decoration !== undefined && (
					<span className={decorationStyle}>{decoration}</span>
				)}
				<input
					type={type}
					{...reg(name)}
					placeholder={placeholder}
					className={inputStyle}
				/>
			</div>
			{feedback !== undefined && (
				<div className={feedbackStyle}>{feedback}</div>
			)}
		</div>
	);
}

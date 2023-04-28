/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import IInput from './input';

export default function CheckboxInput({
	name,
	register,
	className,
	style,
	feedback,
	label,
}: IInput) {
	//* Logic
	const reg = register !== undefined ? register : () => {};

	//* Styles
	const labelStyle = classNames('labelCheckbox', style?.label);
	const feedbackStye = classNames('feedbackCheckbox', style?.feedback);
	const inputStyle = classNames('inputCheckbox', style?.input);

	//* Component
	return (
		<div className={classNames(className)}>
			<label htmlFor={name} className="flex items-baseline">
				<input type="checkbox" className={inputStyle} {...reg(name)} />
				<div className={labelStyle}>{label}</div>
			</label>
			{feedback !== undefined && <div className={feedbackStye}>{feedback}</div>}
		</div>
	);
}

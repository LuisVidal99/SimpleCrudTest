import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Input,
	Typography,
} from '@material-tailwind/react';
import { SyntheticEvent } from 'react';

type InputObj = {
	label: string;
	set: (e: SyntheticEvent<Element, Event>) => void;
};

type FormProps = {
	input: InputObj[];
	name: string;
	bottonLabel?: {
		message: string;
		link: string;
		action: () => void;
	};
	submit?: {
		text: string;
		action: (event: SyntheticEvent) => void;
	};
};

export default function Form({ input, submit, name, bottonLabel }: FormProps) {
	return (
		<div className="flex w-screen h-screen items-center justify-center">
			<Card className="w-96">
				<CardHeader
					variant="gradient"
					color="blue"
					className="mb-4 grid h-28 place-items-center"
				>
					<Typography variant="h3" color="white">
						{name}
					</Typography>
				</CardHeader>
				<CardBody className="flex flex-col gap-4">
					{input.map(({ label, set }) => {
						return (
							<Input
								label={label}
								size="lg"
								onChange={set}
								key={`${name}-${label}`}
							/>
						);
					})}
					<div className="-ml-2.5">
						<Checkbox label="Remember Me" />
					</div>
				</CardBody>
				<CardFooter className="pt-0">
					<Button variant="gradient" fullWidth onClick={submit?.action}>
						{submit?.text}
					</Button>
					<Typography variant="small" className="mt-6 flex justify-center">
						{bottonLabel?.message}
						<Typography
							as="a"
							href="#signup"
							variant="small"
							color="blue"
							className="ml-1 font-bold"
							onClick={bottonLabel?.action}
						>
							{bottonLabel?.link}
						</Typography>
					</Typography>
				</CardFooter>
			</Card>
		</div>
	);
}

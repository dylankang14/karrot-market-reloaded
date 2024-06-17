import { InputHTMLAttributes } from "react";

interface InputProps {
	name: string;
	errors?: string[];
}

export default function Input({ name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className="flex flex-col gap-2">
			<input
				name={name}
				className="bg-transparent border-none ring-2 ring-neutral-300 rounded-md w-full focus:ring-orange-500 focus:ring-4 *:placeholder:text-neutral-300 font-medium transition"
				{...rest}
			/>
			{errors.map((error, index) => (
				<span key={index} className="text-red-500 font-medium">
					{error}
				</span>
			))}
		</div>
	);
}

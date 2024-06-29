import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface InputProps {
	name: string;
	errors?: string[];
}

const _Input = (
	{ name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>,
	ref: ForwardedRef<HTMLInputElement>
) => {
	return (
		<div className="flex flex-col gap-2">
			<input
				name={name}
				ref={ref}
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
};

export default forwardRef(_Input);

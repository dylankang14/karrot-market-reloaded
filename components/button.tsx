"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
	text: string;
}

export default function Button({ text, ...rest }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
	const { pending } = useFormStatus();
	return (
		<button
			disabled={pending}
			className="btn-primary h-10 flex items-center justify-center gap-3 disabled:bg-neutral-500 disabled:text-neutral-300 disabled:cursor-not-allowed"
			{...rest}
		>
			{pending ? "Loading..." : text}
		</button>
	);
}

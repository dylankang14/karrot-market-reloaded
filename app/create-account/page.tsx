"use client";

import SMSLogin from "@/components/sms-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";

export default function CreateAccount() {
	const [state, action] = useFormState(createAccount, null);
	return (
		<main className="flex min-h-screen flex-col p-6 gap-5">
			<div className="flex flex-col gap-3 font-medium">
				<h1 className="text-5xl">안녕하세요!</h1>
				<h2 className="text-2xl">Fill in the form below to join!</h2>
			</div>
			<form action={action} className="w-full flex flex-col gap-3">
				<Input
					name="username"
					type="text"
					placeholder="Username"
					required
					errors={state?.fieldErrors.username}
					minLength={3}
					maxLength={10}
				/>
				<Input name="email" type="email" placeholder="Email" required errors={state?.fieldErrors.email} />
				<Input
					name="password"
					type="password"
					placeholder="Password"
					required
					minLength={4}
					errors={state?.fieldErrors.password}
				/>
				<Input
					name="confirmPassword"
					type="password"
					placeholder="Confirm Password"
					required
					minLength={4}
					errors={state?.fieldErrors.confirmPassword}
				/>
				<Button text="Create Account" />
			</form>
			<SMSLogin />
		</main>
	);
}

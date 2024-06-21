"use client";

import SMSLogin from "@/components/sms-login";
import { useFormState } from "react-dom";
import Input from "@/components/input";
import Button from "@/components/button";
import { login } from "./actions";

export default function Login() {
	const [state, action] = useFormState(login, null);
	return (
		<main className="flex min-h-screen flex-col p-6 gap-5">
			<div className="flex flex-col gap-3 font-medium">
				<h1 className="text-5xl">Log in</h1>
				<h2 className="text-2xl">Login use email and password.</h2>
			</div>
			<form action={action} className="w-full flex flex-col gap-3">
				<Input name="email" type="email" placeholder="Email" required errors={state?.fieldErrors.email} />
				<Input name="password" type="password" placeholder="Password" required errors={state?.fieldErrors.password} />
				<Button text="Login" />
			</form>
			<SMSLogin />
		</main>
	);
}

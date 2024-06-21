"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";
import { error } from "console";

const InitialState = {
	token: false,
	error: undefined,
	phone: "",
};

export default function Home() {
	const [state, action] = useFormState(smsLogin, InitialState);

	return (
		<main className="flex min-h-screen flex-col p-6 gap-5">
			<div className="flex flex-col gap-3 font-medium">
				<h1 className="text-5xl">Verify phone</h1>
				<h2 className="text-2xl">Continue with SMS.</h2>
			</div>
			<form action={action} className="w-full flex flex-col gap-3">
				{state?.token ? (
					<Input
						key={1}
						name="token"
						type="number"
						min={100000}
						max={999999}
						placeholder="Verify sms number"
						required
						errors={state.error?.formErrors}
					/>
				) : (
					<Input
						key={0}
						name="phone"
						type="text"
						placeholder="Phone number"
						required
						errors={state.error?.formErrors}
					/>
				)}
				<Button text={state.token ? "Verify Token" : "Send verification SMS"} />
			</form>
		</main>
	);
}

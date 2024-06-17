"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("potato");
const checkPassword = ({ password, confirmPassword }: { password: string; confirmPassword: string }) =>
	password === confirmPassword;

const formSchema = z
	.object({
		username: z
			.string({
				invalid_type_error: "Username must be string.",
				required_error: "Username required.",
			})
			.min(3, "Username is too short.")
			.max(10, "Username is too long.")
			.trim()
			.refine(checkUsername, "Not allowed 'potato' in username."),
		email: z
			.string({
				invalid_type_error: "email must be string.",
				required_error: "email required.",
			})
			.email()
			.toLowerCase(),
		password: z
			.string({
				invalid_type_error: "password must be string.",
				required_error: "password required.",
			})
			.min(PASSWORD_MIN_LENGTH, "Password must be 4 more characters.")
			.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
		confirmPassword: z
			.string({
				invalid_type_error: "confirmPassword must be string.",
				required_error: "confirmPassword required.",
			})
			.min(PASSWORD_MIN_LENGTH, "Password must be 4 more characters.")
			.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
	})
	.refine(checkPassword, {
		message: "Password and Confirm password must be the same.",
		path: ["confirmPassword"],
	});

export const createAccount = (prevState: any, formData: FormData) => {
	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword"),
	};
	const result = formSchema.safeParse(data);
	if (!result.success) {
		return result.error.flatten();
	} else {
		console.log(result.data);
	}
};

"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email().toLowerCase(),
	password: z
		.string({
			required_error: "Password is required.",
		})
		.min(PASSWORD_MIN_LENGTH)
		.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});
export const login = async (prevState: any, formData: FormData) => {
	const data = Object.fromEntries(formData.entries());
	const result = loginSchema.safeParse(data);
	if (!result.success) {
		return result.error.flatten();
	} else {
		console.log(result.data);
	}
};

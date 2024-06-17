"use server";

import { error } from "console";
import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";

interface ActionState {
	token: boolean;
}

const phoneSchema = z
	.string()
	.trim()
	.refine((phone) => validator.isMobilePhone(phone, "ko-KR"), "Wrong phone number.");
const tokenSchema = z.coerce.number().min(100000).max(999999);

export const smsLogin = async (prevState: ActionState, formData: FormData) => {
	const phone = formData.get("phone");
	const token = formData.get("token");
	if (!prevState.token) {
		const result = phoneSchema.safeParse(phone);
		if (!result.success) {
			console.log("1", result.error.flatten());
			return {
				token: false,
				error: result.error.flatten(),
			};
		} else {
			return {
				token: true,
			};
		}
	} else {
		const result = tokenSchema.safeParse(token);
		if (!result.success) {
			return {
				token: true,
			};
		} else {
			redirect("/");
		}
	}
};

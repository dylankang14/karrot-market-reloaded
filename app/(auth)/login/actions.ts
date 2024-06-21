"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession, loginSession } from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
		select: {
			id: true,
		},
	});
	return Boolean(user);
};
const loginSchema = z.object({
	email: z.string().email().toLowerCase().refine(checkEmailExists, "Account email not exists."),
	password: z
		.string({
			required_error: "Password is required.",
		})
		.min(PASSWORD_MIN_LENGTH),

	// .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});
export const login = async (prevState: any, formData: FormData) => {
	const data = Object.fromEntries(formData.entries());
	const result = await loginSchema.spa(data);
	if (!result.success) {
		return result.error.flatten();
	} else {
		const user = await db.user.findUnique({
			where: {
				email: result.data.email,
			},
			select: {
				id: true,
				password: true,
			},
		});
		const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
		if (ok) {
			await loginSession(user!);
			redirect("/profile");
		} else {
			return {
				fieldErrors: {
					password: ["Wrong password."],
					email: [],
				},
			};
		}
	}
};

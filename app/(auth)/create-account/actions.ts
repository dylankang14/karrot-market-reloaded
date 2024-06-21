"use server";

import bcrypt from "bcrypt";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession, loginSession } from "@/lib/session";

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
			.min(PASSWORD_MIN_LENGTH, "Password must be 4 more characters."),
		// .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
		confirmPassword: z
			.string({
				invalid_type_error: "confirmPassword must be string.",
				required_error: "confirmPassword required.",
			})
			.min(PASSWORD_MIN_LENGTH, "Password must be 4 more characters."),
		// .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
	})
	.superRefine(async ({ username }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				username,
			},
			select: {
				id: true,
			},
		});
		if (user) {
			ctx.addIssue({
				code: "custom",
				message: "This username is already taken",
				path: ["username"],
				fatal: true,
			});
			return z.NEVER;
		}
	})
	.superRefine(async ({ email }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				email,
			},
			select: {
				id: true,
			},
		});
		if (user) {
			ctx.addIssue({
				code: "custom",
				message: "This email is already taken",
				path: ["email"],
				fatal: true,
			});
			return z.NEVER;
		}
	})
	.refine(checkPassword, {
		message: "Password and Confirm password must be the same.",
		path: ["confirmPassword"],
	});

export const createAccount = async (prevState: any, formData: FormData) => {
	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword"),
	};
	const result = await formSchema.spa(data);
	if (!result.success) {
		return result.error.flatten();
	} else {
		const hashedPassword = await bcrypt.hash(result.data.password, 12);
		const user = await db.user.create({
			data: {
				username: result.data.username,
				email: result.data.email,
				password: hashedPassword,
			},
			select: {
				id: true,
			},
		});
		loginSession(user);
		redirect("/profile");
	}
};

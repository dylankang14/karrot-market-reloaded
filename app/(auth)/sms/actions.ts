"use server";

import db from "@/lib/db";
import { error } from "console";
import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";
import crypto from "crypto";
import { loginSession } from "@/lib/session";
import twilio from "twilio";

interface ActionState {
	token: boolean;
	phone?: string;
}

async function existToken(token: number) {
	const exist = await db.sMSToken.findUnique({
		where: {
			token: token.toString(),
		},
		select: {
			id: true,
		},
	});

	return Boolean(exist);
}

const phoneSchema = z
	.string()
	.trim()
	.refine((phone) => validator.isMobilePhone(phone, "ko-KR"), "Wrong phone number.");
const tokenSchema = z.coerce.number().min(100000).max(999999).refine(existToken, "Wrong token number.");

async function getToken() {
	const token = crypto.randomInt(100000, 999999).toString();
	const exists = await db.sMSToken.findUnique({
		where: {
			token,
		},
		select: {
			token: true,
		},
	});
	if (exists) {
		return getToken();
	} else {
		return token;
	}
}

export const smsLogin = async (prevState: ActionState, formData: FormData) => {
	const phone = formData.get("phone");
	const token = formData.get("token");
	if (!prevState.token) {
		const result = phoneSchema.safeParse(phone);
		if (!result.success) {
			return {
				token: false,
				error: result.error.flatten(),
			};
		} else {
			await db.sMSToken.deleteMany({
				where: {
					user: {
						phone: result.data,
					},
				},
			});
			const token = await getToken();
			await db.sMSToken.create({
				data: {
					token,
					user: {
						connectOrCreate: {
							where: {
								phone: result.data,
							},
							create: {
								username: crypto.randomBytes(10).toString("hex"),
								phone: result.data,
							},
						},
					},
				},
			});
			// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
			// client.messages.create({
			// 	body: `Your Karrot verification code is ${token}`,
			// 	from: process.env.TWILIO_PHONE_NUMBER,
			// 	to: process.env.MY_PHONE!,
			// });

			return {
				token: true,
				phone: result.data,
			};
		}
	} else {
		const result = await tokenSchema.spa(token);

		if (!result.success) {
			return {
				token: true,
				error: result.error.flatten(),
				phone: prevState.phone,
			};
		} else {
			const token = await db.sMSToken.findUnique({
				where: {
					token: result.data.toString(),
				},
				select: {
					id: true,
					user: {
						select: {
							phone: true,
						},
					},
					userId: true,
				},
			});
			if (prevState.phone === token?.user.phone) {
				await loginSession({ id: token?.userId! });
				await db.sMSToken.delete({
					where: {
						id: token?.id,
					},
				});
				redirect("/profile");
			} else {
				return {
					token: true,
					error: { formErrors: ["Wrong code your phone number."] },
					phone: prevState.phone,
				};
			}
		}
	}
};

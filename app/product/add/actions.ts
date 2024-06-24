"use server";

import { z } from "zod";
import fs from "fs/promises";
import { error } from "console";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const uploadProductSchema = z.object({
	photo: z.string({
		required_error: "Photo is required.",
	}),
	title: z.string({
		required_error: "Title is required.",
	}),
	price: z.coerce.number({
		required_error: "Price is required.",
	}),
	description: z.string({
		required_error: "Description is required.",
	}),
});
export async function uploadProduct(_: any, formData: FormData) {
	const data = Object.fromEntries(formData.entries());
	if (data.photo instanceof File) {
		const photoData = await data.photo.arrayBuffer();
		await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
		data.photo = `/${data.photo.name}`;
	}
	const results = uploadProductSchema.safeParse(data);
	if (!results.success) {
		return results.error.flatten();
	} else {
		const session = await getSession();
		const product = await db.product.create({
			data: {
				photo: results.data.photo,
				title: results.data.title,
				price: results.data.price,
				description: results.data.description,
				user: {
					connect: {
						id: session.id,
					},
				},
			},
			select: {
				id: true,
			},
		});
		redirect(`/product/${product.id}`);
	}
}

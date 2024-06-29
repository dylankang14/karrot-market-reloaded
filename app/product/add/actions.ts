"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { uploadProductSchema } from "./schema";

export async function uploadProduct(formData: FormData) {
	const data = Object.fromEntries(formData.entries());
	// if (data.photo instanceof File) {
	// 	const photoData = await data.photo.arrayBuffer();
	// 	await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
	// 	data.photo = `/${data.photo.name}`;
	// }
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

export async function getUploadUrl() {
	const response = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
			},
		}
	);
	const data = await response.json();
	return data;
}

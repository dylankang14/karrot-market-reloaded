import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import db from "./db";
import { notFound } from "next/navigation";

interface SessionContent {
	id?: number;
}

interface UserContent {
	id: number;
}

export async function getSession() {
	return getIronSession<SessionContent>(cookies(), {
		cookieName: "delicious-carrot",
		password: process.env.COOKIE_PASSWORD!,
	});
}

export async function loginSession(user: UserContent) {
	const session = await getSession();
	session.id = user.id;
	await session.save();
}

export const getIsOwner = async (userId: number) => {
	const user = await getSession();
	return user.id === userId;
};

export const getProduct = async (id: number) => {
	console.log("hit product!");

	const product = await db.product.findUnique({
		where: {
			id,
		},
		include: {
			user: {
				select: {
					username: true,
					avatar: true,
				},
			},
		},
	});
	if (product === null) {
		return notFound();
	} else {
		return product;
	}
};

export const getProductTitle = async (id: number) => {
	console.log("hit title!");
	const product = await db.product.findUnique({
		where: {
			id,
		},
		select: {
			title: true,
		},
	});
	if (product === null) {
		return notFound();
	} else {
		return product;
	}
};

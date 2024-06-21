import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

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

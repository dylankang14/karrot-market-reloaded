import db from "@/lib/db";
import { getSession, loginSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

const getToken = async (code: string) => {
	const accessTokenParams = new URLSearchParams({
		client_id: process.env.GITHUB_CLIENT_ID!,
		client_secret: process.env.GITHUB_CLIENT_SECRET!,
		code,
	}).toString();
	const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
	const { error, access_token } = await (
		await fetch(accessTokenURL, {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
		})
	).json();
	if (error) {
		return new Response(null, {
			status: 400,
		});
	}
	return access_token;
};

const getUser = async (access_token: string) => {
	const { login, id, avatar_url } = await (
		await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: "no-cache",
		})
	).json();
	return { login, id, avatar_url };
};

const getGithubEmail = async (access_token: string) => {
	const emails = await (
		await fetch("https://api.github.com/user/emails", {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: "no-cache",
		})
	).json();

	const filteredEmail = emails.filter((email: any) => email.primary)[0];

	return filteredEmail;
};

const isExistUsername = async (username: string) => {
	const user = await db.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
		},
	});
	return Boolean(user);
};

const isExistEmail = async (email: string) => {
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

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get("code");
	if (!code) {
		return notFound();
	}

	const access_token = await getToken(code);
	const { login, id, avatar_url } = await getUser(access_token);
	const { email } = await getGithubEmail(access_token);
	const user = await db.user.findUnique({
		where: {
			github_id: id + "",
		},
		select: {
			id: true,
		},
	});
	if (user) {
		await loginSession(user);
	} else {
		const isExistName = await isExistUsername(login);
		const isExistMail = await isExistEmail(email);
		if (isExistMail) {
			const updatedUser = await db.user.update({
				where: {
					email,
				},
				data: {
					github_id: id + "",
					avatar: avatar_url,
				},
				select: {
					id: true,
				},
			});
			await loginSession(updatedUser);
		} else {
			const newUser = await db.user.create({
				data: {
					username: isExistName ? login + "-gh" : login,
					github_id: id + "",
					avatar: avatar_url,
					email,
				},
				select: {
					id: true,
				},
			});
			await loginSession(newUser);
		}
	}

	return redirect("/profile");
}

export function GET() {
	const GITHUB_URL = "https://github.com/login/oauth/authorize";
	const params = {
		client_id: process.env.GITHUB_CLIENT_ID!,
		scope: "read:user, user:email",
		allow_signup: "true",
	};
	const formattedParams = new URLSearchParams(params).toString();
	const completeGithubURL = `${GITHUB_URL}?${formattedParams}`;
	return Response.redirect(completeGithubURL);
}

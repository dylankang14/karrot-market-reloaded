import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-6">
			<div className="flex flex-col items-center my-auto gap-3 font-medium">
				<div className="text-9xl">🥕</div>
				<div className="text-5xl">당근</div>
				<div className="text-2xl">당근 마켓에 오신것을 환영합니다.</div>
			</div>
			<div className="flex flex-col gap-3 w-full items-center">
				<Link href="/create-account" className="w-full p-3 bg-orange-500 text-white text-center font-medium rounded-md">
					시작하기
				</Link>
				<div className="flex items-center gap-2">
					<span>이미 계정이 있나요?</span>
					<Link href="/login" className="hover:underline">
						로그인
					</Link>
				</div>
			</div>
		</main>
	);
}

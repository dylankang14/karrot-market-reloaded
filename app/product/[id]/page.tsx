import { getIsOwner, getProduct, getProductTitle, getSession } from "@/lib/session";
import { priceFormatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
	tags: ["product-title", "common-detail"],
});
const getCachedProductDetail = nextCache(getProduct, ["product-detail"], { tags: ["product-detail", "common-detail"] });

export async function generateMetadata({ params }: { params: { id: string } }) {
	const product = await getCachedProductTitle(Number(params.id));
	return {
		title: product?.title,
	};
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
	const id = Number(params.id);
	if (isNaN(id)) {
		return notFound();
	}
	const product = await getCachedProductDetail(id);
	if (product === null) {
		return notFound();
	}
	const isOwner = await getIsOwner(product.userId);

	const revalidate = async () => {
		"use server";
		revalidateTag("common-detail");
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="relative aspect-square">
				<Image className="object-cover" fill src={`${product.photo}/public`} alt={product.title} />
			</div>
			<div className="flex items-center gap-3 px-4">
				<div className="size-10 relative bg-neutral-600 rounded-full p-1 overflow-hidden">
					{product.user.avatar === null ? (
						<UserIcon />
					) : (
						<Image fill src={product.user.avatar} alt={product.user.username} />
					)}
				</div>
				<div>
					<h3 className="text-xl font-semibold">{product.user.username}</h3>
				</div>
			</div>
			<div className="p-4 border-t border-neutral-700 flex flex-col gap-3">
				<h1 className="text-2xl font-semibold">{product.title}</h1>
				<p>{product.description}</p>
			</div>
			<div className="fixed bottom-0 left-0 right-0 w-full max-w-screen-sm bg-neutral-800 py-3 px-5 flex justify-between items-center">
				<span className="text-xl font-semibold">{priceFormatToWon(product.price)}원</span>
				<form action={revalidate}>
					<button>Revalidate</button>
				</form>
				{isOwner ? (
					<Link href={``} className="btn-warning w-auto px-5 py-2.5 font-semibold">
						삭제
					</Link>
				) : (
					<Link href={``} className="btn-primary w-auto px-5 py-2.5 font-semibold">
						채팅하기
					</Link>
				)}
			</div>
		</div>
	);
}

import ModalClose from "@/components/modal-close";
import { getIsOwner, getProduct } from "@/lib/session";
import { priceFormatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Modal({ params }: { params: { id: string } }) {
	const id = Number(params.id);
	if (isNaN(id)) {
		return notFound();
	}
	const product = await getProduct(id);
	const isOwner = await getIsOwner(product.userId);
	return (
		<div className="absolute w-full h-full z-10 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/60">
			<ModalClose />
			<div className="max-w-screen-sm w-full mx-5">
				<div className="aspect-square flex flex-col gap-2 justify-center items-center rounded-md border border-neutral-500 bg-neutral-900">
					<div className="w-full aspect-square relative rounded-t-md overflow-hidden">
						<Image src={`${product?.photo}/public`} alt={product?.title} fill className="object-cover" />
					</div>
					<div className="p-4 flex flex-col gap-4 justify-start w-full">
						<div className="flex gap-4 items-center">
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
						<h2 className="text-xl font-semibold">{product.title}</h2>
						<p>{product.description}</p>
						<div className="flex justify-between items-end">
							<div className="text-lg font-semibold">{priceFormatToWon(product.price)} 원</div>
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
				</div>
			</div>
		</div>
	);
}

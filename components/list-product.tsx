import { dateFormatDayAgo, priceFormatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
	id: number;
	title: string;
	price: number;
	photo: string;
	created_at: Date;
}

export default function ListProduct({ id, title, price, photo, created_at }: ListProductProps) {
	return (
		<Link href={`/product/${id}`} className="text-white flex gap-3">
			<div className="relative size-28 rounded-md overflow-hidden">
				<Image src={`${photo}/avatar`} fill alt={title} className="object-cover" />
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-lg font-semibold">{title}</div>
				<div className="text-sm text-neutral-400">{dateFormatDayAgo(created_at.toString())}</div>
				<div className="text-lg font-semibold">{priceFormatToWon(price)} 원</div>
			</div>
		</Link>
	);
}

import ProductsList from "@/components/products-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export type InitialProducts = Prisma.PromiseReturnType<typeof getProducts>;

async function getProducts() {
	const products = await db.product.findMany({
		select: {
			id: true,
			title: true,
			price: true,
			photo: true,
			created_at: true,
		},
		take: 1,
		orderBy: {
			created_at: "desc",
		},
	});
	return products;
}

export default async function Home() {
	const products = await getProducts();
	return (
		<div className="flex flex-col">
			<ProductsList initialProducts={products} />
			<Link
				href="/product/add"
				className="btn-primary size-14 rounded-full flex justify-center items-center fixed bottom-20 right-4"
			>
				<PlusIcon className="size-10" />
			</Link>
		</div>
	);
}

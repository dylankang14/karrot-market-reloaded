import ProductsList from "@/components/products-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import Link from "next/link";

export type InitialProducts = Prisma.PromiseReturnType<typeof getProducts>;

async function getProducts() {
	console.log("hit!!!");

	const products = await db.product.findMany({
		select: {
			id: true,
			title: true,
			price: true,
			photo: true,
			created_at: true,
		},
		// take: 1,
		orderBy: {
			created_at: "desc",
		},
	});
	return products;
}

export const metadata = {
	title: "Home",
};

const getCachedProducts = nextCache(getProducts, ["home-products"]);

export default async function Home() {
	const initialProducts = await getProducts();
	const revalidate = async () => {
		"use server";
		revalidatePath("/home");
	};
	return (
		<div className="flex flex-col">
			<ProductsList initialProducts={initialProducts} />
			<form action={revalidate}>
				<button>Revalidate</button>
			</form>
			<Link
				href="/product/add"
				className="btn-primary size-14 rounded-full flex justify-center items-center fixed bottom-20 right-4"
			>
				<PlusIcon className="size-10" />
			</Link>
		</div>
	);
}

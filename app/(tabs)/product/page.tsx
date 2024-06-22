import ProductsList from "@/components/products-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

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
		</div>
	);
}

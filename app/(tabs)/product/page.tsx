import ListProduct from "@/components/list-product";
import db from "@/lib/db";
import { resolve } from "path";

async function getProducts() {
	const products = await db.product.findMany({
		select: {
			id: true,
			title: true,
			price: true,
			photo: true,
			created_at: true,
		},
	});
	return products;
}

export default async function Home() {
	const products = await getProducts();
	return (
		<div className="p-5 flex flex-col gap-3">
			<h1>Home~!</h1>
			{products.map((product) => (
				<ListProduct key={product.id} {...product} />
			))}
		</div>
	);
}

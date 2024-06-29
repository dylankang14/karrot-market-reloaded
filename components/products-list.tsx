"use client";

import { InitialProducts } from "@/app/(tabs)/home/page";
import { useEffect, useRef, useState } from "react";
import ListProduct from "./list-product";
import { getNextProducts } from "@/app/(tabs)/home/actions";
import { revalidatePath } from "next/cache";

interface ProductsListProps {
	initialProducts: InitialProducts;
}

export default function ProductsList({ initialProducts }: ProductsListProps) {
	const [products, setProducts] = useState(initialProducts);
	const [isLoading, setIsLoading] = useState(false);
	const [isLastPage, setIsLastPage] = useState(false);
	const [page, setPage] = useState(0);
	const trigger = useRef<HTMLSpanElement>(null);

	// useEffect(() => {
	// 	const observer = new IntersectionObserver(
	// 		async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
	// 			const element = entries[0];
	// 			if (element.isIntersecting && trigger.current) {
	// 				observer.unobserve(trigger.current);
	// 				setIsLoading(true);
	// 				const nextProducts = await getNextProducts(page + 1);
	// 				if (nextProducts.length !== 0) {
	// 					setProducts((prev) => [...prev, ...nextProducts]);
	// 					setPage((prev) => prev + 1);
	// 				} else {
	// 					setIsLastPage(true);
	// 				}
	// 				setIsLoading(false);
	// 			}
	// 		},
	// 		{
	// 			threshold: 1.0,
	// 		}
	// 	);
	// 	if (trigger.current) {
	// 		observer.observe(trigger.current);
	// 	}
	// 	return () => {
	// 		observer.disconnect();
	// 	};
	// }, [page]);

	return (
		<div className="p-5 flex flex-col gap-3">
			{products.map((product) => (
				<ListProduct key={product.id} {...product} />
			))}
			{isLastPage ? (
				"No more products"
			) : (
				<span ref={trigger} className="btn-primary w-auto mx-auto px-8 py-2.5">
					{isLoading ? "Loading..." : "Load more"}
				</span>
			)}
		</div>
	);
}

"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function ModalClose() {
	const router = useRouter();
	const onClick = () => {
		router.back();
	};
	return (
		<button onClick={onClick} className="absolute top-5 right-5">
			<XMarkIcon className="size-10" />
		</button>
	);
}

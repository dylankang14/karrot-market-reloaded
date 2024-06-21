import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
	return (
		<div className="flex flex-col gap-5 p-6">
			<div className="aspect-square border-4 border-dashed border-neutral-700 flex justify-center items-center rounded-md">
				<PhotoIcon className="size-28 rounded-md text-neutral-700" />
			</div>
			<div className="flex gap-3 items-center">
				<div className="size-16 bg-neutral-700 rounded-full" />
				<div className="*:h-5 *:bg-neutral-700 *:rounded-md flex flex-col gap-2">
					<div className="w-40" />
					<div className="w-20" />
				</div>
			</div>
			<div className="h-5 w-80 rounded-md bg-neutral-700" />
		</div>
	);
}

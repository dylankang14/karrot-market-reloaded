import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
	return (
		<div className="absolute w-full h-full z-10 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black/60">
			<div className="max-w-screen-sm bg-neutral-700 w-full mx-5 aspect-square">
				<div className="aspect-square flex flex-col justify-center items-center rounded-md">
					<PhotoIcon className="size-28 rounded-md" />
					<p>Loading....</p>
				</div>
			</div>
		</div>
	);
}

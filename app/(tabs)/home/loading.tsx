export default function Loading() {
	return (
		<div className="flex flex-col gap-4 mt-4">
			{[...Array(14)].map((_, index) => {
				return (
					<div key={index} className="flex items-center gap-3 animate-pulse mx-auto py-2">
						<div className="size-28 rounded-md bg-neutral-600" />
						<div className="flex flex-col gap-3 *:h-5 *:bg-neutral-600 *:rounded-md">
							<div className="w-60" />
							<div className="w-40" />
							<div className="w-20" />
						</div>
					</div>
				);
			})}
		</div>
	);
}

"use client";

import Link from "next/link";
import {
	NewspaperIcon as OutlineNewspaperIcon,
	HomeIcon as OutlineHomeIcon,
	ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
	VideoCameraIcon as OutlineLiveIcon,
	UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import {
	NewspaperIcon as SolidNewspaperIcon,
	HomeIcon as SolidHomeIcon,
	ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
	VideoCameraIcon as SolidLiveIcon,
	UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

export default function TabBar() {
	const pathname = usePathname();
	return (
		<div className="fixed max-w-screen-sm mx-auto bottom-0 left-0 right-0 w-full border-t border-neutral-600 grid grid-cols-5 *:text-white *:flex *:justify-center *:flex-col *:items-center *:p-2">
			<Link href="/product">
				{pathname === "/product" ? <SolidHomeIcon className="size-7" /> : <OutlineHomeIcon className="size-7" />}홈
			</Link>
			<Link href="/life">
				{pathname === "/life" ? <SolidNewspaperIcon className="size-7" /> : <OutlineNewspaperIcon className="size-7" />}
				동네생활
			</Link>
			<Link href="/chat">
				{pathname === "/chat" ? <SolidChatIcon className="size-7" /> : <OutlineChatIcon className="size-7" />}채팅
			</Link>
			<Link href="/live">
				{pathname === "/live" ? <SolidLiveIcon className="size-7" /> : <OutlineLiveIcon className="size-7" />}쇼핑
			</Link>
			<Link href="/profile">
				{pathname === "/profile" ? <SolidUserIcon className="size-7" /> : <OutlineUserIcon className="size-7" />}
				나의당근
			</Link>
		</div>
	);
}

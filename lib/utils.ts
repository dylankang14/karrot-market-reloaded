export const dateFormatDayAgo = (date: string) => {
	const time = new Date(date).getTime();
	const now = new Date().getTime();
	const msInDay = 1000 * 60 * 60 * 24;
	const diff = Math.round((time - now) / msInDay);
	const formatter = new Intl.RelativeTimeFormat("ko");
	return formatter.format(diff, "days");
};

export const priceFormatToWon = (price: number) => {
	return price.toLocaleString("ko-KR");
};

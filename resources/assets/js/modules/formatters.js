export const percentFormatter = new Intl.NumberFormat('en-US', {
	style: 'percent',
	maximumFractionDigits: 2
});

export function percent(num) {
	return percentFormatter.format(num);
}

export const percentFormatter = new Intl.NumberFormat('en-US', {
	style: 'percent',
	maximumFractionDigits: 2
});

export const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});

export const decimalFormatter = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 3
});

export function percent(num) {
	return percentFormatter.format(num);
}

export function currency(num) {
	return currencyFormatter.format(num);
}

export function decimal(num) {
	return decimalFormatter.format(num);
}

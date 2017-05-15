export function getCheckedItemCount(report) {
	if ('type' in report && report.type === 'item')
		return report.checked ? 1 : 0;

	let count = 0;

	let prop = ('type' in report && report.type === 'section')
		? 'items'
		: 'pages';

	if (prop in report) {
		for (let item of report[prop]) {
			count += getCheckedItemCount(item);
		}
	}

	return count;
}

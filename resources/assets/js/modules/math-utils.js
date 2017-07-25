export function sum(values) {
	return values.reduce((acc, value) => {
		return acc + value;
	}, 0);
}

export function mean(values, population = true) {
	if (!values)
		return null;
	if (values.length === 0)
		return 0;

	let denominator = population ? values.length : values.length - 1;
	return sum(values) / denominator;
}

export function average(values, population = true) {
	return mean(values, population);
}

export function variance(values, population = true) {
	let mean = average(values);
	let deviations = values.map(value => Math.pow(value - mean, 2));
	return average(deviations, population);
}

export function standardDeviation(values, population = true) {
	return Math.sqrt(variance(values, population));
}

export function numberOfStandardDeviations(value, values, population = true) {
	let mean = average(values, population);
	let stdDev = standardDeviation(values, population);
	return ((value - mean) / stdDev);
}

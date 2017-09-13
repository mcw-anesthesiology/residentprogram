/* @flow */

export function sum(values: Array<number>): number {
	return values.reduce((acc, value) => {
		return acc + value;
	}, 0);
}

export function mean(values: Array<number>, population: boolean = true): number {
	if (!values)
		return 0;
	if (values.length === 0)
		return 0;

	let denominator = population ? values.length : values.length - 1;
	return sum(values) / denominator;
}

export function average(values: Array<number>, population: boolean = true): number {
	return mean(values, population);
}

export function variance(values: Array<number>, population: boolean = true): number {
	let mean = average(values);
	let deviations = values.map(value => Math.pow(value - mean, 2));
	return average(deviations, population);
}

export function standardDeviation(values: Array<number>, population: boolean = true): number {
	return Math.sqrt(variance(values, population));
}

export function numberOfStandardDeviations(
	value: number,
	values: Array<number>,
	population: boolean = true
): number {
	let mean = average(values, population);
	let stdDev = standardDeviation(values, population);
	return ((value - mean) / stdDev);
}

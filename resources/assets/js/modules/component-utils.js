/* @flow */

import * as localforage from 'localforage';

export function syncWithLocalforage(
	component: Object,
	propertyName: string,
	namespace: string,
	checker: ?Object => boolean = () => true
): Promise<void> {
	const key = `${namespace}--${propertyName}`;

	component.$watch(propertyName, prop => {
		localforage.setItem(key, prop).catch(err => {
			console.log(err);
		});
	});

	return localforage.getItem(key).then(prop => {
		if (prop && checker(prop))
			component[propertyName] = prop;
	}).catch(err => {
		console.log(err);
	});
}

import * as localforage from 'localforage';

import { logError } from '@/modules/errors.js';

export default function SyncWithLocalforage({propertyName, namespace, checker}) {
	if (!propertyName || !namespace) {
		logError('Need to specify propertyName and namespace for SyncWithLocalforage');
		return;
	}

	if (!checker)
		checker = () => true;

	const key = `${namespace}--${propertyName}`;

	return {
		mounted() {
			return localforage.getItem(key).then(prop => {
				if(prop && checker(prop))
				this[propertyName] = prop;
			}).catch(logError);
		},

		watch: {
			[propertyName]: prop => {
				localforage.setItem(key, prop).catch(logError);
			}
		}
	};
}

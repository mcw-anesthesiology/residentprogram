import * as localforage from 'localforage';

export default function SyncWithLocalforage({propertyName, namespace, checker}) {
	if (!propertyName || !namespace) {
		console.error('Need to specify propertyName and namespace for SyncWithLocalforage');
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
			}).catch(err => {
				console.log(err);
			});
		},

		watch: {
			[propertyName]: prop => {
				localforage.setItem(key, prop).catch(err => {
					console.log(err);
				});
			}
		}
	};
}

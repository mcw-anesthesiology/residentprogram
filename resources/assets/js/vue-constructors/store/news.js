import ky from '@/modules/ky.js';
import { logError } from '@/modules/errors.js';

export default {
	namespaced: true,
	state: {
		unseenNewsItems: []
	},
	mutations: {
		set(state, unseenNewsItems) {
			state.unseenNewsItems = unseenNewsItems;
		}
	},
	actions: {
		fetchUnseen(context) {
			if (context.state.unseenNewsItems.length === 0) {
				ky.get('/news-items/unseen').json().then(unseenNewsItems => {
					context.commit('set', unseenNewsItems);
				}).catch(err => {
					logError(err);
				});
			}
		}
	}
};

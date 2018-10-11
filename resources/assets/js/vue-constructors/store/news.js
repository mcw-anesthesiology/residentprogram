import ky from '@/modules/ky.js';

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
		fetchUnseen({ state, commit }) {
			if (state.unseenNewsItems.length === 0) {
				ky.get('/news-items/unseen').json().then(unseenNewsItems => {
					commit('set', unseenNewsItems);
				}).catch(err => {
					commit('error', err, { root: true });
				});
			}
		}
	}
};

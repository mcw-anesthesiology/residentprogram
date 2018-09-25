import { fetchForms, groupForms } from '@/modules/utils.js';

export default {
	namespaced: true,
	state: {
		forms: []
	},
	getters: {
		groupedForms({ forms }) {
			return groupForms(forms);
		}
	},
	mutations: {
		set(state, forms) {
			state.forms = forms;
		}
	},
	actions: {
		fetch({ state, commit }) {
			if (state.forms.length === 0) {
				fetchForms().then(forms => {
					commit('set', forms);
				}).catch(err => {
					commit('error', err, { root: true });
				});
			}
		}
	}
};

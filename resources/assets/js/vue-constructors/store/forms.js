import { fetchForms, groupForms } from '@/modules/utils.js';

export default {
	namespaced: true,
	state: {
		forms: []
	},
	getters: {
		activeForms({ forms }) {
			return forms.filter(f => f.status === 'active');
		},
		groupedForms({ forms }) {
			return groupForms(forms);
		},
		activeGroupedForms({ forms }) {
			return groupForms(forms.filter(f => f.status === 'active'));
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

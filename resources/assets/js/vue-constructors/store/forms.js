import { logError } from '@/modules/errors.js';
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
		fetch(context) {
			if (context.state.forms.length === 0) {
				fetchForms().then(forms => {
					context.commit('set', forms);
				}).catch(err => {
					logError(err);
				});
			}
		}
	}
};

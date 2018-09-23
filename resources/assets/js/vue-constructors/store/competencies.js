import { logError } from '@/modules/errors.js';
import { fetchCompetencies } from '@/modules/utils.js';

export default {
	namespaced: true,
	state: {
		competencies: []
	},
	mutations: {
		set(state, competencies) {
			state.competencies = competencies;
		}
	},
	actions: {
		fetch(context) {
			if (context.state.competencies.length === 0) {
				fetchCompetencies().then(competencies => {
					context.commit('set', competencies);
				}).catch(err => {
					logError(err);
				});
			}
		}
	}
};

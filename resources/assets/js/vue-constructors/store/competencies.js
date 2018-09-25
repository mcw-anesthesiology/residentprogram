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
		fetch({ state, commit }) {
			if (state.competencies.length === 0) {
				fetchCompetencies().then(competencies => {
					commit('set', competencies);
				}).catch(err => {
					commit('error', err, { root: true });
				});
			}
		}
	}
};

import ky from '@/modules/ky.js';

export default {
	namespaced: true,
	modules: {
		subject: createRouteModule('/api/dashboard/subject'),
		evaluator: createRouteModule('/api/dashboard/evaluator')
	}
};

function createRouteModule(route) {
	return {
		namespaced: true,
		state: {
			evaluations: new Map(),
		},
		getters: {
			list(state) {
				return Array.from(state.evaluations.values());
			}
		},
		mutations: {
			add(state, evaluations) {
				const map = new Map(state.evaluations);
				for (const evaluation of evaluations) {
					map.set(evaluation.id, evaluation);
				}
				state.evaluations = map;
			},
		},
		actions: {
			fetch({ commit }) {
				ky.get(route).json().then(evals => {
					commit('add', evals);
				}).catch(err => {
					commit('error', err, { root: true });
				});
			}
		}
	};
}

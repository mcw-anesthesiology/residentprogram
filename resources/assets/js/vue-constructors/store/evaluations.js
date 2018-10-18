import ky from '@/modules/ky.js';

import { queryParams } from '@/modules/utils.js';

export default {
	namespaced: true,
	...createRouteModule('/api/evaluations'),
	modules: {
		subject: createRouteModule('/api/dashboard/subject'),
		evaluator: createRouteModule('/api/dashboard/evaluator'),
		external: createRouteModule('/api/external-evaluations')
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
			},
			listBetween(state, { list }) {
				return ({ startDate, endDate }) => {
					return list.filter(e =>
						(!endDate || e.evaluation_date_start <= endDate)
						&& (!startDate || e.evaluation_date_end >= startDate)
					);
				};
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
			fetch({ commit }, { startDate, endDate }) {
				const query = queryParams({ startDate, endDate });

				ky.get(`${route}?${query}`).json().then(evals => {
					commit('add', evals);
				}).catch(err => {
					commit('error', err, { root: true });
				});
			},
			fetchOne({ commit }, { id }) {
				ky.get(`${route}/${id}`).json().then(evaluation => {
					commit('add', [evaluation]);
				}).catch(err => {
					commit('error', err, { root: true });
				});
			}
		}
	};
}

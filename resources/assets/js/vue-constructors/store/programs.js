import ky from '@/modules/ky.js';


const API_ROUTE = '/programs';

const QUERY = $.param({
	withMany: {
		administrators: ['users.id', 'full_name']
	}
});

export default {
	namespaced: true,
	state: {
		programs: [],
		evaluationsMap: new Map()
	},
	getters: {
		withEvaluations({ programs, evaluationsMap }) {
			return programs.map(p => ({
				...p,
				evaluations: evaluationsMap.get(p.id) || []
			}));
		},
		evaluations({ evaluationsMap }, id) {
			return evaluationsMap.get(id);
		}
	},
	mutations: {
		set(state, pas) {
			state.programs = pas;
		},
		add(state, pa) {
			state.programs.push(pa);
		},
		addEvaluations(state, { id, evaluations }) {
			state.evaluationMap.set(id, evaluations);
		},
		remove(state, id) {
			state.programs = state.programs.filter(pa => Number(pa.id) !== Number(id));
		}
	},
	actions: {
		fetch({ commit }) {
			return ky.get(`${API_ROUTE}?${QUERY}`).json().then(pas => {
				commit('set', pas);
			});
		},
		async fetchEvaluations({ commit }, id) {
			const evaluations = await ky.get(`${API_ROUTE}/${id}/evaluations`).json();
			commit('addEvaluations', { id, evaluations });
		},
		create({ dispatch }, program) {
			return ky.post(API_ROUTE, { json: program }).then(() => {
				dispatch('fetch');
			});
		},
		update({ dispatch }, { id, ...program }) {
			return ky.patch(`${API_ROUTE}/${id}`, { json: program }).then(() => {
				dispatch('fetch');
			});
		},
		delete({ commit }, id) {
			return ky.delete(`${API_ROUTE}/${id}`).then(() => {
				commit('remove', id);
			});
		},
		addAdministrator({ dispatch }, { id, userId }) {
			return ky.post(`${API_ROUTE}/${id}/administrators/${userId}`).then(() => {
				dispatch('fetch');
			});
		},
		removeAdministrator({ dispatch }, { id, userId }) {
			return ky.delete(`${API_ROUTE}/${id}/administrators/${userId}`).then(() => {
				dispatch('fetch');
			});
		}
	}
};

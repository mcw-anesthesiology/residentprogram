import { fetchConfig, jsonOrThrow, okOrThrow } from '@/modules/utils.js';

const API_ROUTE = '/programs';

const QUERY = $.param({
	with: {
		administrators: true
	}
});

export default {
	namespaced: true,
	state: {
		programs: []
	},
	mutations: {
		set(state, pas) {
			state.programs = pas;
		},
		add(state, pa) {
			state.programs.push(pa);
		},
		remove(state, id) {
			state.programs = state.programs.filter(pa => Number(pa.id) !== Number(id));
		}
	},
	actions: {
		fetch({ commit }) {
			return fetch(`${API_ROUTE}?${QUERY}`, {
				...fetchConfig()
			}).then(jsonOrThrow).then(pas => {
				commit('set', pas);
			});
		},
		create({ dispatch }, pa) {
			return fetch(API_ROUTE, {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify(pa)
			}).then(okOrThrow).then(() => {
				// TODO: Don't refetch everyone
				dispatch('fetch');
			});
		},
		update({ dispatch }, { id, ...pa }) {
			return fetch(`${API_ROUTE}/${id}`, {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					_method: 'PATCH',
					...pa
				})
			}).then(okOrThrow).then(() => {
				// TODO: Don't refetch everyone
				dispatch('fetch');
			});
		},
		delete({ commit }, id) {
			return fetch(`${API_ROUTE}/${id}`, {
				...fetchConfig(),
				method: 'POST', // DELETE
				body: JSON.stringify({
					_method: 'DELETE'
				})
			}).then(okOrThrow).then(() => {
				commit('remove', id);
			});
		}
	}
};

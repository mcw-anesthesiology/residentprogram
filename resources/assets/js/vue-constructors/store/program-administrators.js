import { fetchConfig, jsonOrThrow, okOrThrow } from '@/modules/utils.js';

const API_ROUTE = '/program-administrators';

export default {
	namespaced: true,
	state: {
		programAdministrators: [],
		query: ''
	},
	mutations: {
		query(state, query) {
			state.query = $.param(query);
		},
		set(state, pas) {
			state.programAdministrators = pas;
		},
		add(state, pa) {
			state.programAdministrators.push(pa);
		},
		remove(state, id) {
			state.programAdministrators = state.programAdministrators.filter(pa => Number(pa.id) !== Number(id));
		}
	},
	actions: {
		fetch({ state, commit }) {
			return fetch(`${API_ROUTE}?${state.query}`, {
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

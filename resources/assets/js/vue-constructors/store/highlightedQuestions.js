import ky from '@/modules/ky.js';

export default {
	namespaced: true,
	state: {
		highlightedQuestions: []
	},
	mutations: {
		set(state, highlightedQuestions) {
			state.highlightedQuestions = highlightedQuestions;
		}
	},
	actions: {
		fetch({ state, commit }) {
			if (state.highlightedQuestions.length === 0) {
				ky.get('/highlighted-questions').json().then(highlightedQuestions => {
					commit('set', highlightedQuestions);
				}).catch(err => {
					commit('error', err, { root: true });
				});
			}
		}
	}
};

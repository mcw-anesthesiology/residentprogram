import ky from '@/modules/ky.js';

import { logError } from '@/modules/errors.js';

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
		fetch(context) {
			if (context.state.highlightedQuestions.length === 0) {
				ky.get('/highlighted-questions').json().then(highlightedQuestions => {
					context.commit('set', highlightedQuestions);
				}).catch(err => {
					logError(err);
				});
			}
		}
	}
};

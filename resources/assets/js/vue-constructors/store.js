import { Store } from 'vuex';

import competencies from './store/competencies.js';
import evaluations from './store/evaluations.js';
import forms from './store/forms.js';
import highlightedQuestions from './store/highlightedQuestions.js';
import milestones from './store/milestones.js';
import news from './store/news.js';
import programs from './store/programs.js';
import users from './store/users.js';

import { logError } from '@/modules/errors.js';

const store = new Store({
	modules: {
		competencies,
		evaluations,
		forms,
		highlightedQuestions,
		milestones,
		news,
		programs,
		users
	},
	state: {
		alerts: []
	},
	mutations: {
		error(state, text) {

			logError(text);
			state.alerts.push({
				type: 'error',
				text
			});
		},
		addAlert(state, alert) {
			state.alerts.push(alert);
		},
		removeAlert(state, alert) {
			state.alerts = state.alerts.filter(a => a !== alert);
		}
	}
});

export default store;


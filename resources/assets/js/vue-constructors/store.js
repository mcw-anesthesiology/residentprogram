/** @format */

import { Store } from 'vuex';

import ky from '@/modules/ky.js';
import { logError } from '@/modules/errors.js';

import competencies from './store/competencies.js';
import evaluations from './store/evaluations.js';
import forms from './store/forms.js';
import highlightedQuestions from './store/highlightedQuestions.js';
import mentorships from './store/mentorships.js';
import milestones from './store/milestones.js';
import news from './store/news.js';
import programs from './store/programs.js';
import users from './store/users.js';


const store = new Store({
	modules: {
		competencies,
		evaluations,
		forms,
		highlightedQuestions,
		mentorships,
		milestones,
		news,
		programs,
		users
	},
	state: {
		user: null,
		alerts: []
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
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
	},
	actions: {
		fetchUser({ commit }) {
			ky.get('/me').json().then(user => {
				commit('setUser', user);
			}).catch(err => {
				commit('error', err);
			});
		}
	}
});

store.dispatch('fetchUser');

export default store;


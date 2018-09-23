import { Store } from 'vuex';

import competencies from './store/competencies.js';
import forms from './store/forms.js';
import highlightedQuestions from './store/highlightedQuestions.js';
import milestones from './store/milestones.js';
import programs from './store/programs.js';
import users from './store/users.js';

const store = new Store({
	modules: {
		competencies,
		forms,
		highlightedQuestions,
		milestones,
		programs,
		users
	}
});

export default store;


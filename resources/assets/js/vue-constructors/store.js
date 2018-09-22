import { Store } from 'vuex';

import forms from './store/forms.js';
import programs from './store/programs.js';
import users from './store/users.js';

const store = new Store({
	modules: {
		forms,
		programs,
		users
	}
});

export default store;


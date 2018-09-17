import { Store } from 'vuex';

import users from './store/users.js';
import programs from './store/programs.js';

const store = new Store({
	modules: {
		users,
		programs
	}
});

export default store;


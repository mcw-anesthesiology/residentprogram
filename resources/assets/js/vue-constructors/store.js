import { Store } from 'vuex';

import users from './store/users.js';
import programAdministrators from './store/program-administrators.js';

const store = new Store({
	modules: {
		users,
		programAdministrators
	}
});

export default store;


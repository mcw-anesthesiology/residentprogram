import { Store } from 'vuex';

import { logError } from '@/modules/errors.js';
import { fetchUsers, groupUsers } from '@/modules/utils.js';

const store = new Store({
	state: {
		users: []
	},
	getters: {
		groupedUsers({ users }) {
			return groupUsers(users);
		}
	},
	mutations: {
		setUsers(state, users) {
			console.log(users);
			state.users = users;
		}
	},
	actions: {
		fetchUsers(context) {
			if (context.state.users.length === 0) {
				fetchUsers().then(users => {
					context.commit('setUsers', users);
				}).catch(err => {
					logError(err);
				});
			}
		}
	}
});

export default store;


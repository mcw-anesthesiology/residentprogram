import { logError } from '@/modules/errors.js';
import { fetchUsers, groupUsers } from '@/modules/utils.js';

export default {
	namespaced: true,
	state: {
		users: []
	},
	getters: {
		groupedUsers({ users }) {
			return groupUsers(users);
		}
	},
	mutations: {
		set(state, users) {
			state.users = users;
		}
	},
	actions: {
		fetch(context) {
			if (context.state.users.length === 0) {
				fetchUsers().then(users => {
					context.commit('set', users);
				}).catch(err => {
					logError(err);
				});
			}
		}
	}
};

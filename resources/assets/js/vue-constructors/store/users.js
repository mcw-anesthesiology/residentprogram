import { fetchUsers, groupUsers } from '@/modules/utils.js';

import { logWarning } from '@/modules/errors.js';

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
		},
		add(state, user) {
			state.users.push(user);
			state.users.sort((a, b) => {
				try {
					if (a.full_name < b.full_name)
						return -1;
					if (a.full_name > b.full_name)
						return 1;
				} catch (err) {
					logWarning('There was a problem sorting users', { a, b });
				}

				return 0;
			})
		}
	},
	actions: {
		fetch({ state, commit }) {
			if (state.users.length === 0) {
				fetchUsers().then(users => {
					commit('set', users);
				}).catch(err => {
					commit('error', err, { root: true });
				});
			}
		}
	}
};

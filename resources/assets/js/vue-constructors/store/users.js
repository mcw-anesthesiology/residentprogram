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

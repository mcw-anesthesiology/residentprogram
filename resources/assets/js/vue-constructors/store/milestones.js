import { fetchMilestones, groupMilestones } from '@/modules/utils.js';

export default {
	namespaced: true,
	state: {
		milestones: []
	},
	getters: {
		groupedMilestones({ milestones }) {
			return groupMilestones(milestones);
		}
	},
	mutations: {
		set(state, milestones) {
			state.milestones = milestones;
		}
	},
	actions: {
		fetch({ state, commit }) {
			if (state.milestones.length === 0) {
				fetchMilestones().then(milestones => {
					commit('set', milestones);
				}).catch(err => {
					commit('error', err, { root: true });
				});
			}
		}
	}
};

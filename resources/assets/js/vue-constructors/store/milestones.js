import { logError } from '@/modules/errors.js';
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
		fetch(context) {
			if (context.state.milestones.length === 0) {
				fetchMilestones().then(milestones => {
					context.commit('set', milestones);
				}).catch(err => {
					logError(err);
				});
			}
		}
	}
};

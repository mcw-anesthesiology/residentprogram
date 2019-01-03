import Vue, { apolloProvider } from '@/vue-constructors/vue.js';

import BootstrapModal from '@/vue-components/BootstrapModal.vue';
import AlertList from '@/vue-components/AlertList.vue';

import { handleError } from '@/modules/errors.js';
import { fetchConfig, okOrThrow } from '@/modules/utils.js';

export function createEvaluationPage(el, propsData) {
	return new Vue({
		el,
		apolloProvider,
		props: {
			user: {
				type: Object,
				required: true
			},
			evaluation: {
				type: Object,
				required: true
			}
		},
		propsData,
		data() {
			return {
				decline: {
					reason: null,
					alerts: []
				},
				show: {
					modals: {
						decline: false
					}
				}
			};
		},
		computed: {
			canDecline() {
				return (
					this.evaluation.status === 'pending'
					&& this.user.id === this.evaluation.evaluator_id
				);
			}
		},
		methods: {
			declineEvaluation() {
				if (!this.decline.reason) {
					this.decline.alerts.push({
						text: 'Please enter your reason for declining the request'
					});
					return;
				}

				fetch(`/evaluations/${this.evaluation.id}/decline`, {
					...fetchConfig(),
					method: 'POST', // PATCH
					body: JSON.stringify({
						_method: 'PATCH',
						reason: this.decline.reason
					})
				}).then(okOrThrow).then(() => {
					window.location.reload();
				}).catch(err => {
					handleError(
						err,
						this.decline,
						'There was a problem declining the request'
					);
				});
			}
		},
		components: {
			BootstrapModal,
			AlertList,
			BeyondMilestones: () => import('#/BeyondMilestones/BeyondMilestones.vue')
		}
	});
}

import Vue, { apolloProvider } from '@/vue-constructors/vue.js';
import gql from 'graphql-tag';

import BootstrapModal from '@/vue-components/BootstrapModal.vue';
import AlertList from '@/vue-components/AlertList.vue';
import ConfirmationButton from '#/ConfirmationButton.vue';

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
				saveForm: false,
				decline: {
					reason: null,
					alerts: []
				},
				comment: {
					value: this.evaluation ? this.evaluation.comment : '',
					alerts: []
				},
				show: {
					modals: {
						decline: false
					},
					confidentialComment: false
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
			handleSubmit(event) {
				if (this.saveForm)
					return;

				//Checks the evaluation to make sure every question is answered before submitting the form
				let firstInput = null;
				let alertText = '';

				$('#evaluation input:radio').each(function(){
					const name = $(this).attr('name');
					if (
						$(this).attr('required') === 'required'
						&& $(`input:radio[name="${name}"]:checked`).length === 0
					) {
						if (!firstInput) {
							firstInput = this;
						}
						alertText = 'Please complete each required question';
						event.preventDefault();
					}
				});

				$('#evaluation textarea').each(function(){
					if ($(this).attr('required') === 'required' && this.value === '') {
						if (!firstInput) {
							firstInput = this;
						}
						alertText = 'Please complete each required question';
						event.preventDefault();
					}
				});

				if (firstInput) {
					$(firstInput).focus();
				}

				if (alertText) {
					alert(alertText);
				}

				if (
					this.$refs.beyondMilestones
					&& !this.$refs.beyondMilestones.checkComplete()
				) {
					event.preventDefault();
				}
			},
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
			},
			async handleCommentSubmit() {
				try {
					const { data } = await this.$apollo.mutate({
						mutation: gql`
							mutation UpdateEvaluationComment(
								$id: ID!
								$comment: String
							) {
								updateEvaluationComment(
									id: $id
									comment: $comment
								) {
									id
									comment
								}
							}
						`,
						variables: {
							id: this.evaluation.id,
							comment: this.comment.value,
						}
					});

					if (data.updateEvaluationComment.comment === this.comment.value) {
						this.comment.alerts.push({
							type: 'success',
							text: 'Comment updated successfully'
						});
					} else {
						throw new Error('Unsuccessful for some reason');
					}

					this.comment.value = data.updateEvaluationComment.comment;
				} catch (err) {
					handleError(
						err,
						this.comment,
						'There was a problem saving the comment'
					);
				}
			},
			async clearComment() {
				this.comment.value = null;
				await this.handleCommentSubmit();
				this.show.confidentialComment = false;
			}
		},
		components: {
			BootstrapModal,
			AlertList,
			ConfirmationButton,
			BeyondMilestones: () => import('#/BeyondMilestones/BeyondMilestones.vue')
		}
	});
}

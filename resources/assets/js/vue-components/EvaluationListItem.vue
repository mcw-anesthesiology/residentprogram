<template>
	<li class="evaluation-list-item">
		<a :href="`/evaluation/${evaluation.id}`" class="value eval-id">
			{{ evaluation.id }}
		</a>
		<div class="evaluation-main" @click="handleListItemClick">
			<div class="evaluation-header">
				<span class="evaluation-type">
					{{ evaluationTypeDisplay }}
				</span>
				<div class="evaluation-flags">
					<span v-if="evaluationUnseen" class="evaluation-unseen-flag">
						New
					</span>
					<span v-if="evaluationVisibility" class="evaluation-visibility">
						{{ ucfirst(evaluationVisibility) }}
					</span>
					<span class="evaluation-status" :class="evaluationStatusClass">
						{{ evaluationStatus }}
					</span>
				</div>
			</div>

			<div class="evaluation-details display-labels">
				<div class="form-date-group value-group">
					<span v-if="evaluation.form" class="value form">
						{{ evaluation.form.title }}
					</span>
					<span class="value evaluation-date">
						<rich-date-range :dates="evaluation" start="evaluation_date_start" end="evaluation_date_end" />
					</span>
				</div>

				<div class="value-group">
					<span v-if="evaluation.subject && evaluation.subject_id !== user.id" class="value subject">
						{{ evaluation.subject.full_name }}
					</span>
					<span v-if="evaluation.evaluator && evaluation.evaluator_id !== user.id" class="value evaluator">
						{{ evaluation.evaluator.full_name }}
					</span>
				</div>


				<div class="value-group">
					<span class="value request-date">
						<rich-date :date="evaluation.request_date" time />
					</span>

					<span v-if="evaluation.complete_date" class="value complete-date">
						<rich-date :date="evaluation.complete_date" time />
					</span>
				</div>
			</div>
		</div>

		<div class="controls-container">
			<a :href="`/evaluation/${evaluation.id}`" target="_blank"
					class="evaluation-link btn btn-sm btn-primary">
				<span>
					View
					<span class="glyphicon glyphicon-arrow-right"></span>
				</span>
			</a>
			<button type="button" v-if="evaluation.status === 'complete' && evaluation.subject_id === user.id && !evaluation.seen_by_subject_at"
					class="btn btn-sm btn-info" @click="markAsSeen" :disabled="acknowledged">
				<template v-if="acknowledged">
					<span class="glyphicon glyphicon-ok"></span>
				</template>
				<template v-else>
					Mark as seen
				</template>
			</button>

			<confirmation-button v-if="user && user.id === evaluation.requested_by_id && evaluation.status === 'pending'" class="btn btn-sm btn-danger"
					@click="handleCancel" :disabled="canceled">
				<template v-if="canceled">
					<span class="glyphicon glyphicon-ok"></span>
				</template>
				<template v-else>
					Cancel
				</template>
			</confirmation-button>
			<confirmation-button v-else-if="user && user.id === evaluation.evaluator_id && evaluation.status === 'pending'" class="btn btn-sm btn-danger"
					@click="handleDecline" :disabled="declined">
				<template v-if="declined">
					<span class="glyphicon glyphicon-ok"></span>
				</template>
				<template v-else>
					Decline
				</template>
			</confirmation-button>

			<show-hide-button v-if="user && user.type === 'admin'" v-model="showAdminControls" class="btn btn-info btn-sm">
				admin controls
			</show-hide-button>
		</div>

		<admin-controls v-if="user && user.type === 'admin' && showAdminControls" :evaluation="evaluation" />
	</li>
</template>

<script>
import { mapState } from 'vuex';
import ky from '@/modules/ky.js';

import ConfirmationButton from '#/ConfirmationButton.vue';
import AdminControls from './Evaluations/AdminControls.vue';
import RichDate from './RichDate.vue';
import RichDateRange from './RichDateRange.vue';
import ShowHideButton from './ShowHideButton.vue';
import FormReader from './FormReader/FormReader.vue';

import { storeError } from '@/modules/errors.js';
import { renderEvaluationType } from '@/modules/datatable-utils.js';
import { ucfirst } from '@/modules/utils.js';

export default {
	props: {
		evaluation: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			acknowledged: false,
			canceled: false,
			declined: false,
			contents: null,

			showEvaluation: false,
			showAdminControls: false
		};
	},
	computed: {
		...mapState(['user']),
		evaluationTypeDisplay() {
			return renderEvaluationType(this.evaluation);
		},
		evaluationStatus() {
			if (!this.evaluation.status)
				return '';

			return ucfirst(this.evaluation.status);
		},
		evaluationStatusClass() {
			if (this.evaluation.status && this.evaluation.status.includes('canceled'))
				return 'canceled';

			return this.evaluation.status;
		},
		evaluationUnseen() {
			return (
				this.user
				&& (
					this.user.id === this.evaluation.subject_id
					&& !this.evaluation.seen_by_subject_at
				)
				|| (
					this.user.id === this.evaluation.evaluator_id
					&& !this.evaluation.seen_by_evaluator_at
				)
			);
		},
		evaluationVisibility() {
			if (!this.user || this.user.type !== 'admin')
				return;

			try {
				return this.evaluation.visibility || this.evaluation.form.visibility;
			} catch (err) {
				console.warn("EvaluationListItem: Couldn't get visibility", err);
			}
		}
	},
	watch: {
		showEvaluation(show) {
			if (show && !this.contents) {
				this.fetchContents();
			}
		}
	},
	methods: {
		ucfirst,
		async fetchContents() {
			this.contents = await ky.get(`/evaluations/${this.evaluation.id}/contents`).json();
		},
		async markAsSeen(event) {
			event.preventDefault();

			if (this.acknowledged)
				return;

			try {
				const response = await ky.post(`/evaluations/${this.evaluation.id}/acknowledge`);
				this.acknowledged = response.ok;
			} catch (err) {
				storeError(err, this, 'There was a problem acknowledging the evaluation');
			}
		},
		handleListItemClick(event) {
			if (!event.defaultPrevented) {
				window.location = `/evaluation/${this.evaluation.id}`;
			}
		},
		async handleCancel(event) {
			event.preventDefault();

			try {
				const response = await ky.patch(`/evaluations/${this.evaluation.id}/cancel`);
				this.canceled = response.ok;
			} catch (err) {
				storeError(err, this, 'There was a problem cancelling the request');
			}
		},
		async handleDecline(event) {
			event.preventDefault();

			try {
				const response = await ky.patch(`/evaluations/${this.evaluation.id}/decline`);
				this.declined = response.ok;
			} catch (err) {
				storeError(err, this, 'There was a problem declining the request');
			}
		}
	},
	components: {
		ConfirmationButton,
		AdminControls,
		RichDate,
		RichDateRange,
		ShowHideButton,
		FormReader
	}
};
</script>

<style scoped>
.evaluation-list-item {
	display: flex;
	flex-wrap: wrap;
	padding: 1em;
	font-size: 1em;
	background-color: #fff;
}

.evaluation-list-item:nth-child(even) {
	background-color: #fbfbfb;
}

.evaluation-list-item:hover {
	background-color: #eee;
}

.evaluation-main {
	flex: 1 1;
}

.evaluation-main:hover {
	cursor: pointer;
}

.evaluation-header {
	margin-bottom: 0.5em;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.evaluation-flags {
	display: flex;
	flex-wrap: wrap;
}

.evaluation-flags span {
	display: inline-block;
	vertical-align: middle;
	margin: 0 0.25em 0.5em;
	border-bottom: 3px solid;
	border-color: #888;
}

.evaluation-flags .evaluation-unseen-flag {
	border-color: #03a9f4;
}

.evaluation-status.disabled {
	border-color: #f44336;
}

.evaluation-status.canceled {
	border-color: #795548;
}

.evaluation-status.declined {
	border-color: #e57373;
}

.evaluation-status.complete {
	border-color: #8bc34a;
}

.evaluation-status.pending {
	border-color: #ffc107;
}

.evaluation-type {
	font-size: 1.5em;
	color: rgba(0, 0, 0, 0.55);
}

.evaluation-details {
	flex: 1 1;
	display: flex;
	flex-wrap: wrap;
}

.value-group {
	flex: 1 1;
	display: flex;
	flex-direction: column;
	max-width: 100%;
	margin: 1em;
}

.value {
	white-space: normal;
}

@supports (display: grid) {
	.evaluation-list-item {
		display: grid;
		grid-gap: 1em;
		grid-template-areas:
			'id main user-controls'
			'admin-controls admin-controls admin-controls';
		grid-template-columns: 2em 8fr minmax(6em, 1fr);
		overflow: auto;
	}

	.eval-id {
		grid-area: id;
	}

	.evaluation-main {
		grid-area: main;
	}

	.controls-container {
		grid-area: user-controls;
	}

	.evaluation-list-item :global(.admin-controls) {
		grid-area: admin-controls;
	}

	.evaluation-details {
		grid-area: details;
		display: grid;
		grid-gap: 1em;
		grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
		align-items: stretch;
	}

	.value-group {
		margin: 0;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 0.25em;
		align-items: center;
	}

	.controls-container {
		display: grid;
		grid-gap: 0.5em;
		grid-template-columns: repeat(auto-fit, minmax(6em, 1fr));
	}
}

.controls-container .btn,
.evaluation-link {
	display: flex;
	justify-content: center;
	align-items: center;
	white-space: normal;
}

.eval-id {
	display: flex;
	justify-content: center;
	align-items: center;
	color: rgba(0, 0, 0, 0.55);
	font-size: 1.15em;
}

.subject {
	font-size: 1.4em;
}

.form {
	font-size: 1.3em;
}

.evaluation-date {
	font-size: 1.1em;
}

.display-labels .value::before {
	font-weight: bold;
	color: rgba(0, 0, 0, 0.65);
	padding-right: 0.5em;
}

/*
.display-labels .form::before {
	content: 'Form: ';
}
.display-labels .evaluation-date::before {
	content: 'For: ';
}
*/

/*
.display-labels .subject::before {
	content: 'Evaluated: ';
}
*/
.display-labels .evaluator::before {
	content: 'Evaluator: ';
}
.display-labels .request-date::before {
	content: 'Requested: ';
}
.display-labels .complete-date::before {
	content: 'Completed: ';
}

@media (max-width: 600px) {

	.eval-id,
	.controls-container {
		display: none;
	}
}
</style>


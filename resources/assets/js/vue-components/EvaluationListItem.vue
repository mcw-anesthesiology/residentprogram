<template>
	<li class="evaluation-list-item" @click="handleListItemClick">
		<a :href="`/evaluation/${evaluation.id}`" class="value eval-id">
			{{ evaluation.id }}
		</a>
		<div class="evaluation-main">
			<div class="evaluation-header">
				<span class="evaluation-type">
					{{ evaluationTypeDisplay }}
				</span>
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
		</div>
	</li>
</template>

<style scoped>
.evaluation-list-item {
	font-size: 1em;
	background-color: #fff;
}

.evaluation-list-item:nth-child(even) {
	background-color: #fbfbfb;
}

.evaluation-list-item:hover {
	cursor: pointer;
	background-color: #eee;
}

/* TODO: Fallback for grid */

.evaluation-list-item {
	display: flex;
	flex-wrap: wrap;
}

.evaluation-header {
	margin-bottom: 0.5em;
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
}

.value {
	white-space: normal;
}

.evaluation-list-item {
	padding: 1em;
	display: flex;
	flex-wrap: wrap;
}

.evaluation-details {
	display: flex;
	flex-wrap: wrap;
}

.value-group {
	margin: 1em;
}

@supports (display: grid) {
	.evaluation-list-item {
		display: grid;
		grid-gap: 1em;
		grid-template-columns: 2em 8fr minmax(6em, 1fr);
	}

	.evaluation-details {
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

.controls-container .btn {
	white-space: normal;
}

.evaluation-link {
	display: flex;
	justify-content: center;
	align-items: center;
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
</style>

<script>
import { mapState } from 'vuex';
import ky from '@/modules/ky.js';

import RichDate from './RichDate.vue';
import RichDateRange from './RichDateRange.vue';
import ShowHideButton from './ShowHideButton.vue';
import FormReader from './FormReader/FormReader.vue';

import { renderEvaluationType } from '@/modules/datatable-utils.js';

export default {
	props: {
		evaluation: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			showEvaluation: false,
			acknowledged: false,
			contents: null
		};
	},
	computed: {
		...mapState(['user']),
		evaluationTypeDisplay() {
			return renderEvaluationType(this.evaluation);
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
		async fetchContents() {
			this.contents = await ky.get(`/evaluations/${this.evaluation.id}/contents`).json();
		},
		async markAsSeen(event) {
			event.preventDefault();

			if (this.acknowledged)
				return;

			const response = await ky.post(`/evaluations/${this.evaluation.id}/acknowledge`);
			this.acknowledged = response.ok;
		},
		handleListItemClick(event) {
			if (!event.defaultPrevented) {
				window.open(`/evaluation/${this.evaluation.id}`);
			}
		}
	},
	components: {
		RichDate,
		RichDateRange,
		ShowHideButton,
		FormReader
	}
};
</script>

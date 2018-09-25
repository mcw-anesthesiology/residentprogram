<template>
	<li class="evaluation-list-item" @click="handleListItemClick">
		<a :href="`/evaluation/${evaluation.id}`" class="value eval-id">
			{{ evaluation.id }}
		</a>
		<div class="evaluation-details display-labels">
			<div class="form-date-group value-group">
				<span class="value subject">
					{{ evaluation.subject.full_name }}
				</span>
				<span class="value evaluation-date">
					<rich-date-range :dates="evaluation" start="evaluation_date_start" end="evaluation_date_end" />
				</span>
			</div>

			<div class="value-group">
				<span v-if="evaluation.form" class="value form">
					{{ evaluation.form.title }}
				</span>
				<span v-if="evaluation.evaluator" class="value evaluator">
					{{ evaluation.evaluator.full_name }}
				</span>
			</div>


			<div class="value-group">
				<span class="value request-date">
					<rich-date :date="evaluation.request_date" />
				</span>

				<span class="value complete-date">
					<rich-date :date="evaluation.complete_date" />
				</span>
			</div>
		</div>

		<a :href="`/evaluation/${evaluation.id}`" target="_blank"
				class="evaluation-link btn btn-lg btn-info">
			<span>
				View
				<span class="glyphicon glyphicon-arrow-right"></span>
			</span>
		</a>
	</li>
</template>

<style>
.evaluation-list-item {
	border: 1px solid rgba(0, 0, 0, 0.15);
	border-radius: 2px;
	margin: 0.25em 0;
	font-size: 1em;
}

.evaluation-list-item:nth-child(even) {
	background-color: rgba(0, 0, 0, 0.03);
}

.evaluation-list-item:hover {
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0.05);
}

/* TODO: Fallback for grid */

.evaluation-list-item {
	display: flex;
	flex-wrap: wrap;
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
}

@supports (display: grid) {
	.evaluation-list-item {
		padding: 1em;
		display: grid;
		grid-gap: 1em;
		grid-template-columns: 2em 1fr 7em;
	}

	.evaluation-details {
		display: grid;
		grid-gap: 1em;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		align-items: stretch;
	}

	.value-group {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 0.25em;
		align-items: center;
	}
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
	font-size: 1.75em;
}

.form {
	font-size: 1.6em;
}

.evaluation-date {
	font-size: 1.25em;
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
import ky from '@/modules/ky.js';

import RichDate from './RichDate.vue';
import RichDateRange from './RichDateRange.vue';
import ShowHideButton from './ShowHideButton.vue';
import FormReader from './FormReader/FormReader.vue';

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
			contents: null
		};
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

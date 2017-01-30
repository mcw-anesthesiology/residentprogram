<template>
	<li class="list-group-item">
		<div class="row">
			<div class="col-md-1">
				<small>#</small>
				<a :href="`/evaluation/${evaluation.id}`" target="_blank">
					{{ evaluation.id }}
				</a>
			</div>
			<div class="col-md-3">
				<small>Evaluator</small>
				<a :href="`/profile/${evaluation.evaluator.id}`" target="_blank">
					{{ evaluation.evaluator.full_name }}
				</a>
			</div>
			<div class="col-md-3">
				<small>Requested by</small>
				<a :href="`/profile/${evaluation.requestor.id}`" target="_blank">
					{{ evaluation.requestor.full_name }}
				</a>
			</div>
			<div class="col-md-3">
				<small>Form</small>
				<a :href="`/manage/forms/${evaluation.form.id}`" target="_blank">
					{{ evaluation.form.title }}
				</a>
			</div>
			<div class="col-md-2 text-right"
				v-html="renderEvaluationStatus(evaluation.status)">
			</div>
		</div>
		<div class="row">
			<div class="col-md-offset-2 col-md-2">
				<small>Evaluation date</small>
				<span class="evaluation-date-field"
						@mouseenter="hovering.evaluationDate = true"
						@mouseleave="hovering.evaluationDate = false">
					{{ evaluationDate }}
				</span>
			</div>
			<div class="col-md-offset-1 col-md-2">
				<small>Requested</small>
				<span class="evaluation-date-field"
						@mouseenter="hovering.requestDate = true"
						@mouseleave="hovering.requestDate = false">
					{{ requestDate }}
				</span>
			</div>
			<div class="col-md-offset-1 col-md-2">
				<small>Completed</small>
				<span class="evaluation-date-field"
						@mouseenter="hovering.completeDate = true"
						@mouseleave="hovering.completeDate = false">
					{{ completeDate }}
				</span>
			</div>
		</div>
	</li>
</template>

<script>
import moment from 'moment';

import { renderEvaluationStatus } from '../../../modules/datatable-utils.js';
import { renderDateRange } from '../../../modules/date-utils.js';

export default {
	props: {
		evaluation: {
			type: Object,
			required: true
		}
	},
	data(){
		return {
			hovering: {
				evaluationDate: false,
				requestDate: false,
				completeDate: false
			}
		};
	},
	computed: {
		evaluationDate(){
			if(!this.evaluation.evaluation_date_start
					|| !this.evaluation.evaluation_date_end)
				return '';
			
			return renderDateRange(this.evaluation.evaluation_date_start,
				this.evaluation.evaluation_date_end, !this.hovering.evaluationDate);
		},
		requestDate(){
			if(!this.evaluation.request_date)
				return '';
			
			return this.hovering.requestDate
				? moment(this.evaluation.request_date).format('ll LT')
				: moment(this.evaluation.request_date).calendar();
		},
		completeDate(){
			if(!this.evaluation.complete_date)
				return '';
			
			return this.hovering.completeDate
				? moment(this.evaluation.complete_date).format('ll LT')
				: moment(this.evaluation.complete_date).calendar();
		}
	},
	methods: {
		renderEvaluationStatus
	}
};
</script>

<style scoped>
	.list-group-item .row small {
		display: block;
	}

	.list-group-item .row a {
		display: block;
	}

	.evaluation-date-field {
		cursor: help;
	}
	
	.row + .row {
		margin-top: 10px;
	}
	
	small {
		color: rgba(0, 0, 0, 0.5);
	}
</style>

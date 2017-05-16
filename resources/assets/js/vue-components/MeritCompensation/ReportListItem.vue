<template>
	<div class="merit-report-list-item">
		<div class="row">
			<div class="col-sm-2">
				<small>#</small>
				<span>{{ id }}</span>
			</div>
			<div class="col-sm-2">
				<small>Form</small>
				<span>{{ form.name }}</span>
			</div>
			<div class="col-sm-3">
				<small>Period</small>
				<rich-date-range :dates="dates" />
			</div>
			<div class="col-sm-2 checked-items-container">
				<small>Checked items</small>
				{{ checkedItems }}
			</div>
			<div class="col-sm-1">
				<span class="label" :class="statusLabel">
					{{ ucfirst(status) }}
				</span>
			</div>
			<div class="col-sm-2">
				<button type="button" class="btn btn-info btn-sm"
						@click="$emit('click', id)">
					<span class="glyphicon" :class="viewEditGlyph"></span>
					{{ viewEditText }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import RichDateRange from 'vue-components/RichDateRange.vue';

import { ucfirst } from 'modules/utils.js';
import { getEvaluationStatusLabel } from 'modules/datatable-utils.js';
import { getCheckedItemCount } from 'modules/merit-utils.js';

export default {
	props: {
		id: {
			type: Number,
			required: true
		},
		period_start: {
			type: String,
			required: true
		},
		period_end: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		form: {
			type: Object,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},

	computed: {
		dates() {
			return {
				startDate: this.period_start,
				endDate: this.period_end
			};
		},
		viewEditText() {
			return this.status === 'pending'
				? 'Complete'
				: 'View';
		},
		viewEditGlyph() {
			return this.status === 'pending'
				? 'glyphicon-pencil'
				: 'glyphicon-list-alt';
		},
		statusLabel() {
			return getEvaluationStatusLabel(this.status);
		},
		checkedItems() {
			return getCheckedItemCount(this.report);
		}
	},

	methods: {
		ucfirst
	},

	components: {
		RichDateRange
	}
};
</script>

<style scoped>
	.merit-report-list-item {
		border-bottom: 1px solid rgba(0, 0, 0, 0.25);
		padding: 5px 0;
	}

	.merit-report-list-item:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.05);
	}

	small {
		font-size: 0.75em;
		color: rgba(0, 0, 0, 0.55);
		display: block;
	}

	.checked-items-container {
		text-align: right;
	}
</style>

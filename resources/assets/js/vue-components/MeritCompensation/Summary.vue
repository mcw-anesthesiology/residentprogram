<template>
	<div class="panel panel-default">
		<div class="form-summary panel-heading">
			<div class="row">
				<div class="col-sm-4">
					<small>Name</small>
					{{ subjectName }}
				</div>
				<div class="col-sm-4">
					<small>Report period</small>
					<rich-date-range :dates="dates" />
				</div>
				<div class="col-sm-4">
					<small>Checked items</small>
					{{ checkedItems }}
				</div>
			</div>
		</div>

		<div class="panel-body">
			<merit-compensation-score :checklist="checklist"
				:title="title" />

			<merit-compensation-summary-checklist v-bind="checklist"
				:title="title" />
		</div>

		<div class="panel panel-default notes-container">
			<div class="panel-heading">
				Notes
			</div>
			<div class="panel-body">
				<textarea class="form-control"
					:value="notes" readonly>
				</textarea>
			</div>
		</div>

		<div class="panel-footer text-center">
			<button type="button" class="btn btn-default"
					@click="$emit('close')">
				Close
			</button>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

import MeritCompensationSummaryChecklist from './Checklist/Summary/Checklist.vue';
import MeritCompensationScore from './Checklist/Score.vue';

import AcademicYearSelector from 'vue-components/AcademicYearSelector.vue';
import LoadingButton from 'vue-components/LoadingButton.vue';
import RichDateRange from 'vue-components/RichDateRange.vue';

import { isoDateString } from 'modules/date-utils.js';
import { getCheckedItemCount } from 'modules/merit-utils.js';

export default {
	props: {
		id: {
			type: Number,
			required: false
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
			default: 'pending'
		},
		notes: {
			type: String,
			required: false
		},
		title: {
			type: String,
			required: true
		},
		subjectName: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			dates: {
				startDate: this.period_start,
				endDate: this.period_end
			},
			checklist: this.report,

			show: {
				notes: false
			}
		};
	},

	computed: {
		checkedItems() {
			return getCheckedItemCount(this.report);
		},
		lastMonth() {
			return isoDateString(moment().subtract(1, 'month'));
		}
	},

	watch: {
		period_start(period_start) {
			this.dates = Object.assign({}, this.dates, {startDate: period_start});
		},
		period_end(period_end) {
			this.dates = Object.assign({}, this.dates, {endDate: period_end});
		},
		report(report) {
			this.checklist = report;
		},
		notes(notes) {
			this.inputNotes = notes;
		}
	},

	methods: {
		handleClose() {
			this.$emit('close');
		}
	},

	components: {
		MeritCompensationSummaryChecklist,
		MeritCompensationScore,

		AcademicYearSelector,
		LoadingButton,
		RichDateRange
	}
};
</script>

<style scoped>
	small {
		font-size: 0.75em;
		color: rgba(0, 0, 0, 0.55);
		display: block;
	}

	.notes-container {
		margin-top: 2em;
	}
</style>

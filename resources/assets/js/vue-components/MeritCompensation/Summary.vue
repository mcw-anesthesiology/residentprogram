<template>
	<div class="container body-block root-checklist">
		<div class="controls-container">
			<button type="button"
					class="btn btn-default close-report-button"
					@click="$emit('close')">
				<span class="glyphicon glyphicon-chevron-left"></span>
			</button>
			<button type="button"
					class="btn btn-lg btn-info print-report-button"
					@click="handlePrint">
				<span class="glyphicon glyphicon-print"></span>
				Print
			</button>
		</div>
		<h1>{{ title }}</h1>
		<div class="form-summary panel panel-default">
			<div class="panel-body">
				<table class="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Report period</th>
							<th>Checked items</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{{ subjectName }}
							</td>
							<td>
								<rich-date-range :dates="dates" />
							</td>
							<td>
								{{ checkedItems }}
							</td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>

		<merit-compensation-score :checklist="checklist"
			:title="title" />

		<print-view-checklist :report="report">
		</print-view-checklist>

		<div v-if="notes" v-cloak
				class="panel panel-default notes-container">
			<div class="panel-heading">
				Notes
			</div>
			<div class="panel-body">
				<textarea class="form-control"
					:value="notes" readonly>
				</textarea>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

import PrintViewChecklist from './Checklist/PrintView/Checklist.vue';
import MeritCompensationScore from './Checklist/Score.vue';

import AcademicYearSelector from '@/vue-components/AcademicYearSelector.vue';
import LoadingButton from '@/vue-components/LoadingButton.vue';
import RichDateRange from '@/vue-components/RichDateRange.vue';

import { isoDateString } from '@/modules/date-utils.js';
import { getCheckedItemCount } from '@/modules/merit-utils.js';

export default {
	props: {
		id: {
			type: [Number, String],
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
			required: false
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
		handlePrint() {
			window.print();
		},
		handleClose() {
			this.$emit('close');
		}
	},

	components: {
		PrintViewChecklist,
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

	.controls-container {
		margin-bottom: 1em;
	}

	.print-report-button {
		float: right;
	}

	.notes-container {
		margin-top: 2em;
	}

	.root-checklist {
		font-size: 1.25em;
	}

	h1 {
		margin-top: 0.25em;
		margin-bottom: 0.75em;
	}

	@media print {
		.root-checklist {
			font-size: 0.85em;
			margin: 0;
		}

		.controls-container {
			display: none;
		}
	}
</style>

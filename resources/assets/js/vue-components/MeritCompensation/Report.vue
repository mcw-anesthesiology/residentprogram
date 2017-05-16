<template>
	<div>
		<div v-if="readonly" class="form-summary panel panel-default">
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-6">
						<small>Report period</small>
						<rich-date-range :dates="dates" />
					</div>
					<div class="col-sm-6">
						<small>Checked items</small>
						{{ checkedItems }}
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="form-group">
				<label class="containing-label">
					Report period
					<academic-year-selector v-model="dates" />
				</label>
			</div>
		</div>

		<merit-compensation-checklist v-bind="checklist"
			:title="title" :readonly="readonly"
			@input="handleChecklistInput"
			@save="handleSave"
			@close="handleClose"
			@submit="handleSubmit" />
	</div>
</template>

<script>
import MeritCompensationChecklist from './Checklist/Checklist.vue';

import AcademicYearSelector from 'vue-components/AcademicYearSelector.vue';
import RichDateRange from 'vue-components/RichDateRange.vue';

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
		title: {
			type: String,
			require: true
		}
	},
	data() {
		return {
			dates: {
				startDate: this.period_start,
				endDate: this.period_end
			},
			checklist: this.report
		};
	},

	computed: {
		readonly() {
			return ![
				'pending',
				'open for editing'
			].includes(this.status);
		},
		checkedItems() {
			return getCheckedItemCount(this.report);
		}
	},

	methods: {
		handleChecklistInput(checklist) {
			this.checklist = Object.assign({}, this.checklist, checklist);
		},
		handleSave() {
			this.$emit('save', {
				id: this.id,
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist,
				status: this.status
			});
		},
		handleSubmit() {
			this.$emit('submit', {
				id: this.id,
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist,
				status: 'complete'
			});
		},
		handleClose() {
			this.$emit('close');
		}
	},

	components: {
		MeritCompensationChecklist,

		AcademicYearSelector,
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


</style>

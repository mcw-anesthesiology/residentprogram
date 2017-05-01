<template>
	<div>
		<div class="form-group">
			<label class="containing-label">
				Report period
				<academic-year-selector v-model="dates" :readonly="readonly" />
			</label>
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
			return this.status !== 'pending';
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
		
		AcademicYearSelector
	}
};
</script>

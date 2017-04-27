<template>
	<div>
		<academic-year-selector :value="dates"
			@input="handleDatesInput" />
		<merit-compensation-checklist v-bind="checklist"
			@input="handleChecklistInput" @save="handleSave" @submit="handleSubmit" />
	</div>
</template>

<script>
import MeritCompensationChecklist from './Checklist/Checklist.vue';

import AcademicYearSelector from 'vue-components/AcademicYearSelector.vue';

export default {
	props: {
		period_start: {
			type: String,
			required: true
		},
		period_end: {
			type: String,
			required: true
		},
		report: {
			type: String,
			required: true
		},
		status: {
			type: String,
			default: 'pending'
		}
	},
	data() {
		return {
			
		};
	},
	
	computed: {
		dates() {
			return {
				startDate: this.period_start,
				endDate: this.period_end
			};
		}
	},
	
	methods: {
		handleDatesInput(dates) {
			this.$emit('input', {
				period_start: dates.startDate,
				period_end: dates.endDate
			});
		},
		handleChecklistInput(checklist) {
			this.$emit('input', {
				report: Object.assign({}, this.report, checklist)
			});
		},
		handleSubmit() {
			this.$emit('submit');
		}
	},
	
	components: {
		MeritCompensationChecklist,
		
		AcademicYearSelector
	}
};
</script>

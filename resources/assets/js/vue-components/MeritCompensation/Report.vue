<template>
	<div>
		<academic-year-selector v-model="dates" />
		<merit-compensation-checklist v-bind="checklist"
			:title="title"
			@save="handleSave" @submit="handleSubmit" />
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
			checklist: JSON.parse(this.report)
		};
	},
	
	computed: {

	},
	
	methods: {
		handleSave() {
			this.$emit('save', {
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist,
				status: this.status
			});
		},
		handleSubmit() {
			this.$emit('submit', {
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist,
				status: 'complete'
			});
		}
	},
	
	components: {
		MeritCompensationChecklist,
		
		AcademicYearSelector
	}
};
</script>

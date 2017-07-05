<template>
	<div>
		<checklist-section v-for="page of report.pages"
			v-bind="page" />
	</div>
</template>

<script>
import ChecklistSection from './Section.vue';

export default {
	props: {
		report: {
			type: Object,
			required: true
		}
	},

	components: {
		ChecklistSection
	}
};
</script>

<template>
	<div class="print-view-checklist">
		<checklist-section
			v-for="(page, index) of filteredPages"
			:key="index"
			v-bind="page"
		/>
	</div>
</template>

<script>
/** @format */

import ChecklistSection from './Section.vue';

import { itemIsChecked } from '@/modules/merit-utils.js';

export default {
	props: {
		report: {
			type: Object,
			required: true
		}
	},

	computed: {
		filteredPages() {
			return this.report.pages.filter(itemIsChecked);
		}
	},

	components: {
		ChecklistSection
	}
};
</script>

<style scoped></style>

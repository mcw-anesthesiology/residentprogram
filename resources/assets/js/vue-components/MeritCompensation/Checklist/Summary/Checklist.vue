<template>
	<div class="checklist">
		<h1>{{ title }}</h1>

		<div>
			<summary-section v-for="(section, index) of filteredSections" :key="index"
				v-bind="section" :page="true" readonly />
		</div>
	</div>
</template>

<script>
import SummarySection from './Section.vue';

import { itemIsChecked } from '@/modules/merit-utils.js';

export default {
	props: {
		title: {
			type: String,
			required: false
		},
		pages: {
			type: Array,
			required: true
		}
	},

	computed: {
		filteredSections() {
			return this.pages.filter(page => itemIsChecked(page));
		}
	},

	components: {
		SummarySection
	}
};
</script>

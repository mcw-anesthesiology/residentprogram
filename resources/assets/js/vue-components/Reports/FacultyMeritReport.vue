<template>
	<div>
		<div class="container body-block reports-selector">
			<fieldset>
				<legend>
					Merit report type
				</legend>
				<router-link v-for="type of reportTypes" :key="type"
						:to="`/faculty-merit/${type}`"
						class="report-type-option btn btn-default"
						active-class="disabled">
					{{ kebabCaseToWords(type) }}
				</router-link>
			</fieldset>
		</div>

		<router-view></router-view>
	</div>
</template>

<script>
import { kebabCaseToWords } from '@/modules/utils.js';

export default {
	props: {
		reportTypes: {
			type: Array,
			required: true
		}
	},

	methods: {
		kebabCaseToWords
	}
};
</script>

<style scoped>
	.report-type-option {
		margin: 0 1em;
	}

	@media print {
		.reports-selector {
			display: none;
		}
	}
</style>

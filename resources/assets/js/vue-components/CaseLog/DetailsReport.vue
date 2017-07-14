<template>
	<div ref="statsContainer"></div>
</template>

<script>
import {
	generateCaseLogDetailsReport,
	generateCaseLogDetailsReportCharts,
	generateCaseLogLocationReportTable
} from 'modules/case-log-details-schema.js';

export default {
	props: {
		caseLogs: {
			type: Array,
			required: true
		}
	},

	data() {
		return {
			charts: {},
		};
	},

	mounted() {
		this.renderReport();
		$('#case-log-details-report-name').change(this.renderReport);
	},

	methods: {
		renderReport() {
			let name = $('#case-log-details-report-name').val();
			let report = generateCaseLogDetailsReport(this.caseLogs);
			this.charts = generateCaseLogDetailsReportCharts(report, name, this.$refs.statsContainer, this.charts);
			generateCaseLogLocationReportTable(report, name, this.$refs.statsContainer);
		}
	},

	destroyed() {
		$('#case-log-details-report-name').off('change', this.renderReport);
	}
};
</script>

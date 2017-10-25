<template>
	<div>
		<label class="containing-label">
			Report on
			<select class="form-control" v-model="reportName">
				<option :value="null">Please select a report</option>
				<option v-for="subsection of subsections" :key="subsection.name">
					{{ subsection.name }}
				</option>
			</select>
		</label>

		<div ref="statsContainer"></div>
	</div>
</template>

<script>
import {
	generateCaseLogDetailsReport,
	generateCaseLogDetailsReportCharts,
	generateCaseLogLocationReportTable
} from '@/modules/case-log-details-schema.js';

export default {
	props: {
		caseLogs: {
			type: Array,
			required: true
		}
	},

	data() {
		return {
			reportName: null,
			charts: {},
		};
	},

	computed: {
		schema() {
			const schema = this.caseLogs.find(log => log.details_schema);
			if (schema)
				return schema.schema;

			return [];
		},
		subsections() {
			let subsections = [];
			for (let schema of this.schema) {
				for (let subsection of schema.subsections) {
					subsections.push(subsection);
				}
			}

			return subsections;
		}
	},

	mounted() {
		this.renderReport();
	},

	watch: {
		reportName() {
			this.renderReport();
		}
	},

	methods: {
		renderReport() {
			let name = this.reportName;
			let report = generateCaseLogDetailsReport(this.caseLogs);
			this.charts = generateCaseLogDetailsReportCharts(report, name, this.$refs.statsContainer, this.charts);
			generateCaseLogLocationReportTable(report, name, this.$refs.statsContainer);
		}
	}
};
</script>

<template>
	<div class="panel panel-default">

		<div class="panel-heading">
			<span class="panel-title">Case logs summary (version 1 cases)</span>

			<div class="controls">
				<label class="containing-label">
					Summary type
					<select class="form-control" v-model="reportName">
						<option :value="null">Select a summary type</option>
						<option v-for="subsection of subsections" :key="subsection.name">
							{{ subsection.name }}
						</option>
					</select>
				</label>
			</div>
		</div>

		<div class="panel-body">
			<div ref="statsContainer"></div>
		</div>

		<div class="panel-footer">
			<show-hide-button class="btn-info" v-model="show.list">
				cases included in summary
			</show-hide-button>

			<div v-show="show.list" class="table-container">
				<table class="table table-striped">
					<thead>
						<tr>
							<th>#</th>
							<th>Location</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="caseLog of caseLogs" :key="caseLog.id">
							<td>{{ caseLog.id }}</td>
							<td>{{ caseLog.location.name }}</td>
							<td>{{ renderDate(caseLog.case_date, true) }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import { renderDate } from '@/modules/date-utils.js';
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
			show: {
				list: false
			}
		};
	},

	computed: {
		schema() {
			const caseLog = this.caseLogs.find(log => log.details_schema);
			if (caseLog && caseLog.details_schema && caseLog.details_schema.schema)
				return caseLog.details_schema.schema;

			return [];
		},
		subsections() {
			let subsections = [];
			for (let schema of Array.from(this.schema)) {
				for (let subsection of schema.subsections) {
					subsections.push(subsection);
				}
			}

			return subsections;
		},
		report() {
			return generateCaseLogDetailsReport(this.caseLogs);
		}
	},

	watch: {
		reportName() {
			this.renderReport();
		}
	},

	methods: {
		renderDate,
		renderReport() {
			this.charts = generateCaseLogDetailsReportCharts(
				this.report,
				this.reportName,
				this.$refs.statsContainer,
				this.charts
			);
			generateCaseLogLocationReportTable(
				this.report,
				this.reportName,
				this.$refs.statsContainer
			);
		}
	},

	components: {
		ShowHideButton
	}
};
</script>

<style scoped>
	.controls {
		display: flex;
		justify-content: flex-end;
	}

	.controls .containing-label {
		width: auto;
	}

	.panel-footer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.panel-footer .btn {
		margin: 0.5em;
	}

	.panel-footer .table-container {
		flex-grow: 1;
	}
</style>

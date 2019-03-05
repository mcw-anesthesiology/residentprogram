<template>
	<div class="container body-block">
		<div v-if="exportResults && exportResults.length > 0" class="btn-lg-submit-container">
			<show-hide-button v-model="show.results" class="btn btn-primary btn-lg">
				<span slot="left-glyph" class="glyphicon glyphicon-list-alt"></span>
				results
			</show-hide-button>
			<button type="button" class="btn btn-default btn-lg"
					@click="handleDownload">
				<span class="glyphicon glyphicon-download-alt"></span>
				Download
			</button>
		</div>
		<div v-else-if="exportResults" class="alert alert-warning">
			<p>
				Sorry, no reports were found.
			</p>
		</div>
		<p v-else>
			Loading...
		</p>

		<div v-if="show.results && thead && tbody" class="export-table-container">
			<data-table
				:thead="thead"
				:data="tbody"
				:config="tconfig"
				:export-filename="exportFilename"
				bordered
				reloadable
				exportable
				:sortExport="false"
				@reload="fetchExport" />
		</div>
	</div>
</template>

<style scoped>
	.export-table-container :global(td) {
		white-space: pre;
	}
</style>

<script>
import DataTable from '@/vue-components/DataTable.vue';
import AcademicYearSelector from '@/vue-components/AcademicYearSelector.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import { handleError } from '@/modules/errors.js';
import { isoDateString } from '@/modules/date-utils.js';
import { downloadCsv } from '@/modules/report-utils.js';
import { jsonOrThrow, fetchConfig } from '@/modules/utils.js';

export default {
	props: {
		dates: Object,
		formId: [String, Number],
		completeOnly: Boolean
	},
	data() {
		return {
			exportResults: null,
			show: {
				results: false
			}
		};
	},
	computed: {
		thead() {
			if (!this.exportResults || !this.show.results)
				return;

			return this.exportResults.slice(0, 1);
		},
		tbody() {
			if (!this.exportResults || this.exportResults.length === 0 || !this.show.results)
				return;

			return this.exportResults.slice(1);
		},
		tconfig() {
			return {
				ordering: false,
				paging: false,
				scrollX: true,
				scrollY: '600px',
				fixedColumns: {
					leftColumns: 1
				}
			};
		},
		exportFilename() {
			return `National boards ${isoDateString(this.dates.startDate)}--${isoDateString(this.dates.endDate)}`;
		},
		canSubmit() {
			return this.formId;
		}
	},
	watch: {
		dates() {
			this.fetchExport();
		},
		formId() {
			this.fetchExport();
		}
	},
	mounted() {
		this.fetchExport();
	},
	methods: {
		handleDownload() {
			downloadCsv(this.exportResults, 'Merit export results', this.dates);
		},
		fetchExport() {
			this.exportResults = null;

			fetch('/merits/export', {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					formProps: {
						id: this.formId
					},
					...this.dates
				})
			}).then(jsonOrThrow).then(results => {
				this.exportResults = results;
			}).catch(err => {
				handleError(err, this, 'There was a problem exporting the merit reports');
			});
		}
	},

	components: {
		DataTable,
		AcademicYearSelector,
		ShowHideButton
	}
};
</script>

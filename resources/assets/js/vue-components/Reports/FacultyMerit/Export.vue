<template>
	<div class="container body-block">
		<form @submit="handleSubmit">
			<div class="controls-row row">
				<div class="col-sm-6">
					<label class="containing-label">
						Merit form
						<select class="form-control" v-model="formId">
							<option v-for="form of forms" :key="form.id"
									:value="form.id">
								{{ form.name }} - Version {{ form.version }}
							</option>
						</select>
					</label>
				</div>
				<div class="col-sm-6">
					<label class="containing-label">
						Academic year
						<academic-year-selector v-model="dates"
							:min-date="meritsReleaseDate" />
					</label>
				</div>
			</div>

			<div class="btn-lg-submit-container">
				<button type="submit" class="btn btn-primary btn-lg" name="display"
						:disabled="!canSubmit">
					Submit
				</button>
			</div>
			<div v-if="exportResults" class="btn-lg-submit-container">
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
		</form>

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

import { FEATURE_RELEASE_DATES } from '@/modules/constants.js';
import { handleError } from '@/modules/errors.js';
import { isoDateString, isoDateStringObject, lastYear } from '@/modules/date-utils.js';
import { downloadCsv } from '@/modules/report-utils.js';
import { jsonOrThrow, fetchConfig } from '@/modules/utils.js';

export default {
	data() {
		return {
			formId: null,
			dates: isoDateStringObject(lastYear()),

			forms: [],

			exportResults: null,
			show: {
				results: false
			}
		};
	},
	mounted() {
		this.fetchForms();
	},
	computed: {
		meritsReleaseDate() {
			return FEATURE_RELEASE_DATES.FACULTY_MERIT;
		},
		thead() {
			if (!this.exportResults || !this.show.results)
				return;

			return this.exportResults.slice(0, 1);
		},
		tbody() {
			if (!this.exportResults || !this.show.results)
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
	methods: {
		fetchForms() {
			const q = $.param({
				only: [
					'id',
					'name',
					'version',
					'report_slug'
				]
			});

			fetch(`/merit-forms?${q}`, {
				...fetchConfig(),
			}).then(jsonOrThrow).then(forms => {
				this.forms = forms;
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching forms');
			});
		},
		handleSubmit(event) {
			event.preventDefault();

			if (!this.canSubmit)
				return;

			this.fetchExport();
		},
		handleDownload() {
			downloadCsv(this.exportResults, 'Merit export results', this.dates);
		},
		fetchExport() {
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

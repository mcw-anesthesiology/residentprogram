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

			<div class="controls-row row">
				<div class="col-sm-6">
					<label class="containing-label">
						Form
						<select class="form-control" v-model="formId">
							<option v-for="form of meritReportForms" :key="form.id"
								:value="form.id"
							>
							{{ form.name }} - version {{ form.version }}
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
		</div>

		<router-view v-if="formId" :dates="dates" :form-id="formId"></router-view>
	</div>
</template>

<style scoped>
	.controls-row {
		margin: 2em 0;
	}
</style>

<script>
import gql from 'graphql-tag';

import AcademicYearSelector from '@/vue-components/AcademicYearSelector.vue';

import { FEATURE_RELEASE_DATES } from '@/modules/constants.js';
import { kebabCaseToWords } from '@/modules/utils.js';
import { isoDateStringObject, currentYear } from '@/modules/date-utils.js';

export default {
	props: {
		reportTypes: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			dates: isoDateStringObject(currentYear()),
			formId: null,
			meritReportForms: [],
		};
	},
	apollo: {
		meritReportForms: gql`
			query {
				meritReportForms {
					id
					name
					version
					report_slug
				}
			}
		`,
	},

	computed: {
		meritsReleaseDate() {
			return FEATURE_RELEASE_DATES.FACULTY_MERIT;
		}
	},

	methods: {
		kebabCaseToWords
	},

	components: {
		AcademicYearSelector
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

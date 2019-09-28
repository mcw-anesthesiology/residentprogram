<template>
	<div>
		<add-cases />
		<div class="container body-block">
			<h2>Run report</h2>

			<form @submit="handleSubmit">
				<div class="row">
					<validated-form-group class="col-sm-4"
							:errors="errors" prop="userType">
						<label class="containing-label">
							Group by
							<select class="form-control"
									v-model="userType">
								<option v-for="type of userTypes" :value="type">
									{{ ucfirst(type) }}
								</option>
							</select>
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-4"
							:errors="errors" prop="subjectType">
						<label class="containing-label">
							Subject type
							<select class="form-control"
									v-model="subjectType">
								<option v-for="type of userTypes" :value="type">
									{{ ucfirst(type) }}
								</option>
							</select>
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-4"
							:errors="errors" prop="reportType">
						<label class="containing-label">
							Report type
							<select class="form-control" v-model="reportType">
								<option v-for="type of reportTypes" :value="type">
									{{ reportTypeNames.get(type) }}
								</option>
							</select>
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-6"
							:errors="errors"
							prop="reportDates">
						<label class="containing-label">
							Report dates
							<clearable-date
								input-class="form-control appear-not-readonly"
								:options="{mode: 'range', dateFormat: 'F j, Y'}"
								@change="reportDates = arguments[0]" />
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-6"
							:errors="errors" prop="maxPairs">
						<div class="panel panel-default">
							<div class="panel-heading">
								<span class="panel-title">
									Maximum number of pairs per user
								</span>
							</div>
							<div class="panel-body">
								<input type="number"
									:disabled="maxPairs === null"
									class="form-control" min="0"
									v-model="maxPairs" />
								<label class="containing-label">
									Unlimited
									<input type="checkbox" :checked="maxPairs === null"
										@change="handleUnlimitedPairsChange" />
								</label>
							</div>
						</div>
					</validated-form-group>
				</div>
				<div class="row">
					<validated-form-group class="col-sm-4" :errors="errors" prop="minCases">
						<label class="containing-label">
							Minimum cases together
							<input type="number" class="form-control" min="0"
								v-model="minCases" />
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-4" :errors="errors" prop="minHours">
						<label class="containing-label">
							Minimum hours together
							<input type="number" class="form-control" min="0"
								v-model="minHours" />
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-4" :errors="errors" prop="minMinutes">
						<label class="containing-label">
							Minimum minutes together
							<input type="number" class="form-control" min="0" max="59"
								v-model="minMinutes" />
						</label>
					</validated-form-group>
				</div>

				<processing-button type="submit"
						class="btn btn-lg btn-primary center-block"
						:processing="processing"
						:disabled="!valid">
					Run report
				</processing-button>
			</form>
		</div>

		<selected-overlaps v-if="selectedOverlaps && selectedOverlaps.size > 0"
			:overlaps="selectedOverlapObjects"
			:report-dates="reportReportDates"
			:user-type="reportUserType"
			:subject-type="reportSubjectType"
			@clear="deselectAllOverlaps" />

		<div v-if="overlaps" class="container body-block">
			<h2>
				Overlaps grouped by
				{{ reportUserType }}
			</h2>

			<button type="button" class="btn btn-info"
					@click="selectAllOverlaps">
				<span class="glyphicon glyphicon-th-list"></span>
				Select all
			</button>
			<button v-if="selectedOverlaps && selectedOverlaps.size > 0"
					type="button" class="btn btn-default"
					@click="deselectAllOverlaps">
				Clear selection
			</button>

			<div v-for="overlap of overlaps" class="row overlap-item-row" :key="overlap.id">
				<div class="col-xs-1">
					<label title="Select report" class="select-report-label">
						<span class="glyphicon glyphicon-send"></span>
						<input type="checkbox"
							:value="overlap.id"
							:checked="selectedOverlaps.has(overlap.id)"
							@change="handleReportCheck($event, overlap.id)"
						/>
					</label>
				</div>
				<div class="col-xs-11">
					<overlap-list-item
						:overlap="overlap"
						:user-type="reportUserType"
						:subject-type="reportSubjectType"
						:report-dates="reportReportDates" />
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.overlap-item-row ~ .overlap-item-row {
		border-top: 1px solid rgba(0, 0, 0, 0.25);
	}

	.select-report-label {
		padding: 1em;
	}

	.select-report-label .glyphicon {
		margin-right: 0.1em;
	}
</style>

<script>

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import AddCases from './AddCases.vue';
import OverlapListItem from './OverlapListItem.vue';
import SelectedOverlaps from './SelectedOverlaps.vue';

import ClearableDate from '@/vue-components/ClearableDate.vue';
import ProcessingButton from '@/vue-components/ProcessingButton.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';

import { handleError } from '@/modules/errors.js';
import {
	fetchConfig,
	ucfirst,
	jsonOrThrow
} from '@/modules/utils.js';


export default {
	mixins: [
		HasAlerts
	],
	data() {
		return {
			userType: 'faculty',
			subjectType: 'trainee',
			reportType: 'all',
			minCases: 0,
			minHours: 0,
			minMinutes: 30,
			maxPairs: null,
			reportDates: null,
			processing: false,

			reportUserType: null,
			reportSubjectType: null,
			reportReportType: null,
			reportReportDates: null,
			overlaps: null,

			selectedOverlaps: new Set(),

			userTypes: [
				'faculty',
				'resident',
				'fellow',
				'trainee'
			],

			reportTypes: [
				'all',
				'FROEDTERT_EGRESS',
				'CHW_TRAINEE_REPORT',
				'VA_TRAINEE_SUPERVISOR'
			],
			reportTypeNames: new Map([
				['all', 'All'],
				['FROEDTERT_EGRESS', 'Froedtert Egress'],
				['CHW_TRAINEE_REPORT', 'CHW Trainee'],
				['VA_TRAINEE_SUPERVISOR', 'VA Trainee/Supervisor']
			]),

			show: {
				sendReports: false
			}
		};
	},
	computed: {
		overlapsFields() {
			return [
				'user name'
			];
		},
		overlapsFieldAccessors() {
			return {
				'user name': overlap => overlap.user.full_name,
				id: overlap => overlap.user.id
			};
		},
		errors() {
			const errors = new Map();

			if (!this.userTypes.includes(this.userType)) {
				errors.set('userType', 'Invalid selection');
			}

			if (!this.userTypes.includes(this.subjectType)) {
				errors.set('subjectType', 'Invalid selection');
			}

			if (!this.reportTypes.includes(this.reportType)) {
				errors.set('reportType', 'Invalid selection');
			}

			if (!Array.isArray(this.reportDates) || this.reportDates.length !== 2) {
				errors.set('reportDates', 'Please select a date range');
			}

			const numProps = [
				'minCases',
				'minHours',
				'minMinutes'
			];
			for (const prop of numProps) {
				if (Number.isNaN(Number(this[prop]))) {
					errors.set(prop, 'Must be a number');
				}
			}

			if (this.maxPairs !== null && Number.isNaN(Number(this.maxPairs))) {
				errors.set('maxPairs', 'Must be a number or unlimited');
			}


			return errors;
		},
		valid() {
			return this.errors.size === 0;
		},
		selectedOverlapObjects() {
			return this.overlaps.filter(o => this.selectedOverlaps.has(o.id));
		}
	},
	methods: {
		ucfirst,
		handleUnlimitedPairsChange(event) {
			if (event.target.checked) {
				this.maxPairs = null;
			} else {
				this.maxPairs = 3;
			}
		},
		handleReportCheck(event, id) {
			const s = new Set(this.selectedOverlaps);
			if (event.target.checked) {
				s.add(id);
			} else {
				s.delete(id);
			}

			this.selectedOverlaps = s;
		},
		selectAllOverlaps() {
			this.selectedOverlaps = new Set(this.overlaps.map(o => o.id));
		},
		deselectAllOverlaps() {
			this.selectedOverlaps = new Set();
		},
		handleSubmit(event) {
			event.preventDefault();

			if (!this.valid) {
				this.alerts.push({
					type: 'warning',
					text: 'Please fix all input errors'
				});
				return;
			}

			this.processing = true;

			this.overlaps = null;
			this.selectedOverlaps = new Set();
			this.reportUserType = this.userType;
			this.reportSubjectType = this.subjectType;
			this.reportReportType = this.reportType;
			this.reportReportDates = this.reportDates;

			const quoteUnlimitedMaxPairsUnquote = 99999;

			fetch('/reports/case-overlaps/overlaps', {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					userType: this.reportUserType,
					subjectType: this.reportSubjectType,
					reportType: this.reportReportType,
					startDate: this.reportDates[0],
					endDate: this.reportDates[1],
					minCases: this.minCases,
					minHours: this.minHours,
					minMinutes: this.minMinutes,
					maxPairs: this.maxPairs === null
						? quoteUnlimitedMaxPairsUnquote
						: this.maxPairs
				})
			}).then(jsonOrThrow).then(overlaps => {
				this.overlaps = overlaps;
				this.selectedOverlaps = new Set();
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching the report');
			}).finally(() => {
				this.processing = false;
			});
		}
	},
	components: {
		AddCases,
		OverlapListItem,
		SelectedOverlaps,
		ClearableDate,
		ProcessingButton,
		ValidatedFormGroup
	}
};
</script>

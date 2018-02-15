<template>
	<div>
		<div class="container body-block">
			<form @submit="handleSubmit">
				<div class="row">
					<validated-form-group class="col-xs-12 files-container"
							:errors="errors" prop="reportFiles">
						<div class="row">
							<div class="col-sm-6">
								<label class="containing-label control-label">
									Egress report files (CSV, multiple allowed)
									<input ref="egressFileInput"
										type="file" class="form-control"
										accept=".csv"
										name="egressFiles[]"
										multiple
										@change="handleEgressFilesChange" />
									<button type="button" class="btn btn-sm btn-default"
											@click="handleClearEgressFileInput">
										Clear
									</button>
								</label>
							</div>
							<div class="col-sm-6">
								<label class="containing-label control-label">
									CHW trainee report files (CSV, multiple allowed)
									<input ref="chwTraineeFileInput"
										type="file" class="form-control"
										accept=".csv"
										name="chwTraineeFiles[]"
										multiple
										@change="handleChwTraineeFilesChange" />
									<button type="button" class="btn btn-sm btn-default"
											@click="handleClearChwTraineeFileInput">
										Clear
									</button>
								</label>
							</div>
						</div>
					</validated-form-group>
				</div>
				<div class="row">
					<validated-form-group class="col-sm-6"
							:errors="errors" prop="userType">
						<label class="containing-label">
							Group by
							<select class="form-control" name="userType"
									v-model="userType">
								<option v-for="type of userTypes" :value="type">
									{{ ucfirst(type) }}
								</option>
							</select>
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-6"
							:errors="errors" prop="subjectType">
						<label class="containing-label">
							Subject type
							<select class="form-control" name="subjectType"
									v-model="subjectType">
								<option v-for="type of userTypes" :value="type">
									{{ ucfirst(type) }}
								</option>
							</select>
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-12"
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
								name="minCases" v-model="minCases" />
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-4" :errors="errors" prop="minHours">
						<label class="containing-label">
							Minimum hours together
							<input type="number" class="form-control" min="0"
								name="minHours" v-model="minHours" />
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-4" :errors="errors" prop="minMinutes">
						<label class="containing-label">
							Minimum minutes together
							<input type="number" class="form-control" min="0" max="59"
								name="minMinutes" v-model="minMinutes" />
						</label>
					</validated-form-group>
				</div>
				<div class="submit-container text-center">
					<button type="submit" class="btn btn-lg btn-primary"
							:disabled="!valid || processing">
						{{ processing ? 'Processing report...' : 'Run report' }}
					</button>
				</div>
			</form>

			<alert-list v-model="alerts" />
		</div>

		<div v-if="selectedOverlaps && selectedOverlaps.length > 0"
				class="container body-block">

			<div class="panel panel-default">
				<div class="panel-heading">
					<span class="panel-title">
						{{ selectedOverlaps.length }} reports selected
					</span>
				</div>
				<div class="panel-body">
					<ul>
						<li v-for="overlapToSend of selectedOverlaps">
							{{ overlapToSend[reportUserType].full_name }}
						</li>
					</ul>
				</div>
				<div class="panel-footer text-center">
					<button type="button" class="btn btn-default"
							@click="deselectAllOverlaps">
						<span class="glyphicon glyphicon-remove"></span>
						Clear selection
					</button>
				</div>
			</div>

			<div class="panel panel-primary">
				<div class="panel-heading">
					<span class="panel-title">Send reports</span>
				</div>
				<div class="panel-body" v-show="show.sendReports">
					<div class="form">
						<div class="row">
							<validated-form-group class="col-sm-6"
									:errors="sendReportErrors"
									prop="emailSubject">
								<label class="containing-label">
									Email subject
									<input type="text" class="form-control"
										placeholder="Resident pairing report"
										v-model="emailSubject" />
								</label>
							</validated-form-group>
							<validated-form-group class="col-sm-6"
									:errors="sendReportErrors"
									prop="reportDates">
								<label class="containing-label">
									Report dates (optional)
									<clearable-date
										input-class="form-control appear-not-readonly"
										:options="{mode: 'range'}"
										v-model="reportDatesStr"
										@change="handleReportDatesChange" />
								</label>
							</validated-form-group>

							<validated-form-group class="col-sm-12"
									:errors="sendReportErrors"
									prop="customMessage.intro">
								<label for="message-intro" class="control-label">
									Introduction
								</label>
								<vue-editor id="message-intro"
									v-model="customMessage.intro" />
							</validated-form-group>
							<validated-form-group class="col-sm-12"
									:errors="sendReportErrors"
									prop="customMessage.successLead">
								<label for="message-success-lead" class="control-label">
									Report list lead
								</label>
								<vue-editor id="message-success-lead"
									v-model="customMessage.successLead" />
							</validated-form-group>
							<validated-form-group class="col-sm-12"
									:errors="sendReportErrors"
									prop="customMessage.closing">
								<label for="message-closing" class="control-label">
									Closing
								</label>
								<vue-editor id="message-closing"
									v-model="customMessage.closing" />
							</validated-form-group>
						</div>

						<div class="panel panel-default">
							<div class="panel-heading">
								<span class="panel-title">
									Full message example
								</span>
							</div>
							<div class="panel-body message-example-body">
								<p>
									Hello Dr
									<span class="label label-info">
										{{ ucfirst(userType) }}
									</span>!
								</p>
								<div v-html="customMessage.intro"></div>

								<div v-html="customMessage.successLead"></div>

								<table>
									<thead>
										<tr>
											<th>{{ ucfirst(subjectType) }}</th>
											<th></th>
											<th>Cases together</th>
											<th>Time together</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="pairing of examplePairings">
											<td>{{ pairing.name }}</td>
											<td>{{ pairing.type }}</td>
											<td class="cases-cell">
												{{ pairing.numCases }}
											</td>
											<td>{{ pairing.totalTime }}</td>
											<td>
												<a href="#" @click="$event.preventDefault()">
													Evaluate
												</a>
											</td>
										</tr>
									</tbody>
								</table>

								<div v-html="customMessage.closing"></div>

								<p>
									Thank you!
								</p>
							</div>
						</div>
					</div>

					<div class="text-center">
						<button type="button" class="btn btn-lg btn-info"
								:disabled="!sendReportValid"
								@click="sendReports">
							<span class="glyphicon glyphicon-send"></span>
							Send reports
						</button>
					</div>
				</div>
				<div class="panel-footer text-center">
					<show-hide-button class="btn-primary"
							v-model="show.sendReports">
						sender
					</show-hide-button>
				</div>
			</div>

			<download-button class="btn btn-info center-block"
					filename="overlaps-report.csv"
					:data-getter="getSelectedOverlapsArray">
				<span class="glyphicon glyphicon-download-alt"></span>
				Download selected overlaps (CSV)
			</download-button>
		</div>

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

			<component-list :items="overlaps"
					:fields="overlapsFields"
					:fieldAccessors="overlapsFieldAccessors">
				<template slot-scope="item">
					<div class="row">
						<div class="col-xs-1">
							<label title="Select report">
								<input type="checkbox"
									:value="item"
									v-model="selectedOverlaps" />
							</label>
						</div>
						<div class="col-xs-11">
							<overlap-list-item
								:overlap="item"
								:user-type="reportUserType"
								:subject-type="reportSubjectType" />
						</div>
					</div>
				</template>
			</component-list>
		</div>
	</div>
</template>

<style>
	.message-example-body {
		padding: 2em;
	}

	.message-example-body .panel {
		margin: 1em 0;
	}

	.files-container label {
		margin: 1em 0;
	}

	.containing-label small {
		font-weight: normal;
	}

	:global(.ql-editor) {
		white-space: normal !important;
	}

	.message-example-body table {
		margin: 2em 2em 4em;
		table-layout: fixed;
		border-collapse: collapse;
	}

	.message-example-body th {
		text-align: left;
	}

	.message-example-body th,
	.message-example-body td {
		padding: 1em;
	}

	.message-example-body tr {
		border-bottom: 1px solid #333333;
	}
</style>

<script>
import { VueEditor } from 'vue2-editor';

import delve from 'dlv';

import HasAlerts from '@/vue-mixins/HasAlerts.js';


import ComponentList from '@/vue-components/ComponentList.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';
import ClearableDate from '@/vue-components/ClearableDate.vue';
import MarkdownEditor from '@/vue-components/MarkdownEditor.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';
import DownloadButton from '@/vue-components/DownloadButton.vue';

import OverlapListItem from './OverlapListItem.vue';

import { handleError } from '@/modules/errors.js';
import { isoDateString } from '@/modules/date-utils.js';
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
			egressFiles: null,
			chwTraineeFiles: null,
			userType: 'faculty',
			subjectType: 'trainee',
			minCases: 0,
			minHours: 0,
			minMinutes: 30,
			maxPairs: null,
			processing: false,

			emailSubject: '',
			periodDisplay: '',
			reportDatesStr: '',
			reportDates: null,

			customMessage: {
				intro: '',
				successLead: '',
				emptyMessage: '',
				closing: ''
			},

			reportUserType: null,
			reportSubjectType: null,
			overlaps: null,

			selectedOverlaps: [],

			show: {
				sendReports: false
			}
		};
	},

	computed: {
		userTypes() {
			return [
				'faculty',
				'resident',
				'fellow',
				'trainee'
			];
		},
		overlapsFields() {
			return [
				'group_by_name'
			];
		},
		overlapsFieldAccessors() {
			return {
				group_by_name: overlap => overlap[this.reportUserType].full_name,
				id: overlap => overlap[this.reportUserType].id
			};
		},
		errors() {
			const map = new Map();

			if (
				!delve(this, 'egressFiles.length')
				&& !delve(this, 'chwTraineeFiles.length')
			) {
				map.set('reportFiles', 'Please select at least one report CSV file');
			}

			if (!this.userTypes.includes(this.userType)) {
				map.set('userType', 'Invalid selection');
			}

			if (!this.userTypes.includes(this.subjectType)) {
				map.set('subjectType', 'Invalid selection');
			}

			const numProps = [
				'minCases',
				'minHours',
				'minMinutes'
			];
			for (const prop of numProps) {
				if (Number.isNaN(Number(this[prop]))) {
					map.set(prop, 'Must be a number');
				}
			}

			if (this.maxPairs !== null && Number.isNaN(Number(this.maxPairs))) {
				map.set('maxPairs', 'Must be a number or unlimited');
			}

			return map;
		},
		valid() {
			return Array.from(this.errors.keys()).length === 0;
		},
		sendReportErrors() {
			const map = new Map();

			const stringProps = [
				'emailSubject',
				'customMessage.intro',
				'customMessage.successLead'
			];
			for (const prop of stringProps) {
				if (!delve(this, prop)) {
					map.set(prop, 'Please enter a value');
				}
			}

			const PLACEHOLDER = '___';
			const messageProps = [
				'customMessage.intro',
				'customMessage.successLead',
				'customMessage.closing'
			];
			for (const prop of messageProps) {
				const contents = delve(this, prop);
				if (contents && contents.includes(PLACEHOLDER)) {
					map.set(prop, 'Please replace all "___" placeholders');
				}
			}

			return map;
		},
		sendReportValid() {
			return Array.from(this.sendReportErrors.keys()).length === 0;
		},
		examplePairings() {
			return [
				{
					name: 'Jones, Joseph',
					type: 'Resident',
					numCases: 25,
					totalTime: '1 day, 14 hours, 32 minutes'
				},
				{
					name: 'Smith, Deborah',
					type: 'Fellow',
					numCases: 17,
					totalTime: '22 hours, 54 minutes'
				},
				{
					name: 'Lopez, George',
					type: 'Resident',
					numCases: 8,
					totalTime: '5 hours, 19 minutes'
				}
			];
		},
		getSelectedOverlapsArray() {
			if (!this.selectedOverlaps)
				return;

			return () => [
				[
					ucfirst(this.reportUserType),
					ucfirst(this.reportSubjectType),
					'Cases',
					'Total time'
				],
				...this.selectedOverlaps.reduce((rows, overlap) =>
					rows.concat(overlap.pairings.map(pairing =>
						[
							overlap[this.reportUserType].full_name,
							pairing[this.reportSubjectType].full_name,
							pairing.numCases,
							`${pairing.totalTime.days} days, ${pairing.totalTime.h} hours, ${pairing.totalTime.i} minutes`
						]
					))
				, [])
			];
		}
	},

	mounted() {
		this.assignDefaultMessage();
	},

	watch: {
		userType() {
			this.assignDefaultMessage();
		},
		subjectType() {
			this.assignDefaultMessage();
		}
	},

	methods: {
		ucfirst,
		handleEgressFilesChange(event) {
			this.egressFiles = event.target.files;
		},
		handleChwTraineeFilesChange(event) {
			this.chwTraineeFiles = event.target.files;
		},
		handleClearEgressFileInput(event) {
			event.preventDefault();
			this.$refs.egressFileInput.value = null;
			this.egressFiles = null;
		},
		handleClearChwTraineeFileInput(event) {
			event.preventDefault();
			this.$refs.chwTraineeFileInput.value = null;
			this.chwTraineeFiles = null;
		},
		handleUnlimitedPairsChange(event) {
			if (event.target.checked) {
				this.maxPairs = null;
			} else {
				this.maxPairs = 3;
			}
		},
		handleReportDatesChange([dates]) {
			this.reportDates = dates;
		},
		selectAllOverlaps() {
			this.selectedOverlaps = this.overlaps.slice();
		},
		deselectAllOverlaps() {
			this.selectedOverlaps = [];
		},
		assignDefaultMessage() {
			if (
				this.userType === 'faculty'
				&& ['trainee', 'fellow', 'resident'].includes(this.subjectType)
			) {
				this.customMessage.intro = `<p>
					In an attempt to provide more feedback to our trainees and make it simpler
					for you to complete evaluations, we will be providing a periodic report of
					the trainees we believe you worked with the most.
				</p>`;
				this.customMessage.successLead = `<p>
					Based on our records, we've selected the following trainees as top
					candidates for evaluation for ___.
					Please use this as a reference to complete trainee evaluations.
				</p>`;
			} else if (
				['trainee', 'fellow', 'resident'].includes(this.userType)
				&& this.subjectType === 'faculty'
			) {
				this.customMessage.intro = `<p>
					In an attempt to provide you more feedback and make it simpler
					for evaluators to complete evaluations, we will be providing a periodic
					report of the faculty we believe you worked with the most.
				</p>`;
				this.customMessage.successLead = `<p>
					Based on our records, we've selected the following faculty as top
					candidates to provide evaluations for ___.
					Please use this as a reference to request evaluations and to
					complete evaluations of faculty.
				</p>`;
			} else {
				this.customMessage.intro = '';
				this.customMessage.successLead = '';
			}
		},
		handleSubmit(event) {
			event.preventDefault();

			this.processing = true;

			if (!this.valid) {
				this.alerts.push({
					type: 'warning',
					text: 'Please fix all input errors'
				});
				return;
			}

			this.overlaps = null;
			this.selectedOverlaps = [];
			this.reportUserType = this.userType;
			this.reportSubjectType = this.subjectType;

			const body = new FormData(event.target);
			const quoteUnlimitedMaxPairsUnquote = 99999;

			body.set(
				'maxPairs',
				this.maxPairs === null
					? quoteUnlimitedMaxPairsUnquote
					: this.maxPairs
			);

			fetch('/reports/egress-pairings/overlaps', {
				...fetchConfig({contentType: null}),
				method: 'POST',
				body
			}).then(jsonOrThrow).then(overlaps => {
				this.overlaps = overlaps;
				this.selectedOverlaps = [];
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching the report');
			}).finally(() => {
				this.processing = false;
			});
		},
		sendReports() {
			if (
				!this.sendReportValid
				|| !this.selectedOverlaps
				|| this.selectedOverlaps.length === 0
			)
				return;

			fetch('/reports/egress-pairings/send-reports', {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					overlaps: this.selectedOverlaps,
					userType: this.reportUserType,
					subjectType: this.reportSubjectType,
					emailSubject: this.emailSubject,
					periodDisplay: this.periodDisplay,
					reportDates: this.reportDates
						? this.reportDates.map(isoDateString)
						: null,
					...this.customMessage
				})
			}).then(jsonOrThrow).then(response => {
				if (response.successful) {
					this.alerts.push({
						type: 'success',
						text: `${response.successful} reports sent successfully`
					});
				}

				try {
					if (response.errors && Array.isArray(response.errors) && response.errors.length > 0) {
						const lis = response.errors.map(overlap =>
							overlap[this.reportUserType].full_name
						).map(name => `<li>${name}</li>`);
						this.alerts.push({
							type: 'error',
							html: `
								<strong>Error:</strong>
								Failed to send reports to the following users:
								<ul>
									${lis}
								</ul>
							`
						});
					}
				} catch (err) {
					handleError(err, this, 'There was a problem displaying unsuccessful reports');
				}
			}).catch(err => {
				handleError(err, this, 'There was a problem sending the reports');
			});
		}
	},

	components: {
		VueEditor,
		ClearableDate,
		ComponentList,
		ValidatedFormGroup,
		OverlapListItem,
		MarkdownEditor,
		ShowHideButton,
		DownloadButton
	}
};
</script>

<template>
	<div>
		<div class="container body-block">
			<form @submit="handleSubmit">
				<div class="row">
					<validated-form-group class="col-xs-12"
							:errors="errors" prop="egressFile">
						<label class="containing-label">
							Egress report file (CSV)
							<input type="file" class="form-control"
								accept=".csv"
								name="egressFile"
								@change="handleEgressFileChange"/>
						</label>
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
							:disabled="!valid">
						Run report
					</button>
				</div>
			</form>

			<alert-list v-model="alerts" />
		</div>

		<div v-if="overlapsToSend && overlapsToSend.length > 0"
				class="container body-block">

			<div class="panel panel-default">
				<div class="panel-heading">
					<span class="panel-title">
						{{ overlapsToSend.length }} reports selected
					</span>
				</div>
				<div class="panel-body">
					<ul>
						<li v-for="overlapToSend of overlapsToSend">
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

			<div class="form">
				<div class="row">
					<validated-form-group class="col-sm-6" :errors="errors"
							prop="emailSubject">
						<label class="containing-label">
							Email subject
							<input type="text" class="form-control"
								placeholder="Resident pairing report"
								v-model="emailSubject" />
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-6" :errors="errors"
							prop="periodDisplay">
						<label class="containing-label">
							Time period display
							<input type="text" class="form-control"
								placeholder="'the past month', 'July' (displayed after the word 'for')"
								v-model="periodDisplay" />
						</label>
					</validated-form-group>
				</div>
				<div v-if="customizeMessageText">
					<div class="row">
						<validated-form-group class="col-sm-12"
								:errors="customMessageErrors"
								prop="intro">
							<label class="containing-label">
								Introduction
								<markdown-editor :placeholder="messageDefaults.intro"
									v-model="customMessage.intro"
									@html="customMessageHtml.intro = arguments[0]" />
							</label>
						</validated-form-group>
						<validated-form-group class="col-sm-12"
								:errors="customMessageErrors"
								prop="successLead">
							<label class="containing-label">
								Report list lead
								<markdown-editor :placeholder="messageDefaults.successLead"
									v-model="customMessage.successLead"
									@html="customMessageHtml.successLead = arguments[0]" />
							</label>
						</validated-form-group>
						<validated-form-group class="col-sm-12"
								:errors="customMessageErrors"
								prop="closing">
							<label class="containing-label">
								Closing
								<markdown-editor :placeholder="messageDefaults.closing"
									v-model="customMessage.closing"
									@html="customMessageHtml.closing = arguments[0]" />
							</label>
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
							<div v-html="customMessageHtml.intro
								|| `<p>${messageDefaults.intro}</p>`"></div>

							<div v-html="customMessageHtml.successLead
								|| `<p>${messageDefaults.successLead}</p>`"></div>
							<ol>
								<li v-for="pairing of examplePairings">
									<b>{{ pairing.name }}</b>:
									<i>
										{{ pairing.numCases }}
										case{{ pairing.numCases === 1 ? '' : 's' }}
									</i>
									together totalling
									<i>{{ pairing.totalTime }}</i>
								</li>
							</ol>


							<div v-html="customMessageHtml.closing
								|| `<p>${messageDefaults.closing}</p>`"></div>

							<p>
								Thank you!
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="text-center">
				<label>
					Customize message text
					<input type="checkbox" v-model="customizeMessageText" />
				</label>
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

		<div v-if="overlaps" class="container body-block">
			<h2>
				Overlaps grouped by
				{{ reportUserType }}
			</h2>
			<div class="panel panel-default">
				<div class="panel-body">
					<button type="button" class="btn btn-info"
							@click="selectAllOverlaps">
						<span class="glyphicon glyphicon-send"></span>
						Select all
					</button>
				</div>
			</div>
			<component-list :items="overlaps"
					:fields="overlapsFields"
					:fieldAccessors="overlapsFieldAccessors">
				<template slot-scope="item">
					<div class="row">
						<div class="col-xs-1">
							<label title="Send report">
								<input type="checkbox"
									:value="item"
									v-model="overlapsToSend" />
								<span class="glyphicon glyphicon-send"></span>
							</label>
						</div>
						<div class="col-xs-11">
							<overlap-list-item
								:overlap="item"
								:user-type="reportUserType"
								:subject-type="subjectType" />
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

	.containing-label small {
		font-weight: normal;
	}
</style>

<script>
import delve from 'dlv';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ComponentList from '@/vue-components/ComponentList.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';
import MarkdownEditor from '@/vue-components/MarkdownEditor.vue';

import OverlapListItem from './OverlapListItem.vue';

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
			egressFiles: null,
			userType: 'faculty',
			minCases: 0,
			minHours: 0,
			minMinutes: 30,
			maxPairs: null,

			emailSubject: '',
			periodDisplay: '',

			reportUserType: null,
			overlaps: null,

			overlapsToSend: [],

			customizeMessageText: false,
			customMessage: {
				intro: '',
				successLead: '',
				emptyMessage: '',
				closing: ''
			},
			customMessageHtml: {
				intro: null,
				successLead: null,
				emptyMessage: null,
				closing: null
			}
		};
	},

	computed: {
		userTypes() {
			return [
				'faculty',
				'resident'
			];
		},
		subjectType() {
			return this.reportUserType === 'faculty'
				? 'resident'
				: 'faculty';
		},
		overlapsFields() {
			return this.reportUserType === 'faculty'
				? [
					'faculty_name'
				]
				: [
					'resident_name'
				];
		},
		overlapsFieldAccessors() {
			return this.reportUserType === 'faculty'
				? {
					faculty_name: overlap => overlap.faculty.full_name,
					id: overlap => overlap.faculty.id
				}
				: {
					resident_name: overlap => overlap.resident.full_name,
					id: overlap => overlap.resident.id
				};
		},
		errors() {
			const map = new Map();

			if (delve(this, 'egressFiles.length') !== 1) {
				map.set('egressFile', 'Please select an egress report CSV file');
			}

			if (!this.userTypes.includes(this.userType)) {
				map.set('userType', 'Invalid selection');
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
				'periodDisplay'
			];
			for (const prop of stringProps) {
				if (!this[prop]) {
					map.set(prop, 'Please enter a value');
				}
			}

			return map;
		},
		sendReportValid() {
			return Array.from(this.sendReportErrors.keys()).length === 0;
		},
		messageDefaults() {
			const stripWhitespace = s => s.replace(/\s+/g, ' ');
			return this.userType === 'resident'
				? {
					intro: stripWhitespace(`In an attempt to provide you more feedback and make it simpler
						for evaluators to complete evaluations, we will be providing a periodic
						report of the faculty we believe you worked with the most.`),
					successLead: stripWhitespace(`Based on our records, we've selected the following faculty as top
						candidates to provide evaluations for ${this.periodDisplay || '(time period display)'}.
						Please use this as a reference to request evaluations and to complete evaluations of faculty.`),
					emptyMessage: stripWhitespace(`Unfortunately, we weren't able to come up with a list of faculty
						for you this time. We're sorry about that!

						Please request evaluations from faculty members that you worked with.`),
					closing: ''
				}
				: {
					intro: stripWhitespace(`In an attempt to provide more feedback to our residents and make it simpler
						for you to complete evaluations, we will be providing a periodic report of
						the residents we believe you worked with the most.`),
					successLead: stripWhitespace(`Based on our records, we've selected the following residents as top
						candidates for evaluation for ${this.periodDisplay || '(time period display)'}.
						Please use this as a reference to complete trainee evaluations.`),
					emptyMessage: stripWhitespace(`Unfortunately, we weren't able to come up with a list of residents
						for you this time. We're sorry about that!

						Please complete evaluations for the residents that you worked with.`),
					closing: ''
				};
		},
		customMessageErrors() {
			const map = new Map();

			// Nothing to do right now

			return map;
		},
		examplePairings() {
			return [
				{
					name: 'Jones, Joseph',
					numCases: 25,
					totalTime: '1 day, 14 hours, 32 minutes'
				},
				{
					name: 'Smith, Deborah',
					numCases: 17,
					totalTime: '22 hours, 54 minutes'
				},
				{
					name: 'Lopez, George',
					numCases: 8,
					totalTime: '5 hours, 19 minutes'
				}
			];
		}
	},

	watch: {
		customizeMessageText(customizeMessageText) {
			if (!customizeMessageText) {
				this.customMessageHtml = {
					intro: null,
					successLead: null,
					emptyMessage: null,
					closing: null
				};
			}
		}
	},

	methods: {
		ucfirst,
		handleEgressFileChange(event) {
			this.egressFiles = event.target.files;
		},
		handleUnlimitedPairsChange(event) {
			if (event.target.checked) {
				this.maxPairs = null;
			} else {
				this.maxPairs = 3;
			}
		},
		selectAllOverlaps() {
			this.overlapsToSend = this.overlaps.slice();
		},
		deselectAllOverlaps() {
			this.overlapsToSend = [];
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

			this.overlaps = null;
			this.overlapsToSend = [];
			this.reportUserType = this.userType;

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
				this.overlapsToSend = [];
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching the report');
			});
		},
		sendReports() {
			if (
				!this.sendReportValid
				|| !this.overlapsToSend
				|| this.overlapsToSend.length === 0
			)
				return;

			fetch('/reports/egress-pairings/send-reports', {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					overlaps: this.overlapsToSend,
					userType: this.reportUserType,
					subjectType: this.subjectType,
					emailSubject: this.emailSubject,
					periodDisplay: this.periodDisplay,
					...this.customMessageHtml
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
		ComponentList,
		ValidatedFormGroup,
		OverlapListItem,
		MarkdownEditor
	}
};
</script>

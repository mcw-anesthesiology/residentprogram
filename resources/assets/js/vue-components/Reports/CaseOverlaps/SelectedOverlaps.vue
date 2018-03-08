<template>
	<div v-if="overlaps && overlaps.length > 0"
			class="container body-block">

		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="panel-title">
					{{ overlaps.length }} reports selected
				</span>
			</div>
			<div class="panel-body">
				<ul>
					<li v-for="overlap of overlaps">
						{{ overlap.user.full_name }}
					</li>
				</ul>
			</div>
			<div class="panel-footer text-center">
				<button type="button" class="btn btn-default"
						@click="$emit('clear')">
					<span class="glyphicon glyphicon-remove"></span>
					Clear selection
				</button>
			</div>
		</div>

		<div class="panel panel-primary">
			<div class="panel-heading">
				<span class="panel-title">Send reports</span>
			</div>
			<div class="panel-body" v-if="show.sendReports">
				<div class="form">
					<div class="row">
						<validated-form-group class="col-sm-12"
								:errors="sendReportsErrors"
								prop="emailSubject">
							<label class="containing-label">
								Email subject
								<input type="text" class="form-control"
									placeholder="Resident pairing report"
									v-model="emailSubject" />
							</label>
						</validated-form-group>

						<validated-form-group class="col-sm-12"
								:errors="sendReportsErrors"
								prop="customMessage.intro">
							<label for="message-intro" class="control-label">
								Introduction
							</label>
							<vue-editor id="message-intro"
								v-model="customMessage.intro" />
						</validated-form-group>
						<validated-form-group class="col-sm-12"
								:errors="sendReportsErrors"
								prop="customMessage.successLead">
							<label for="message-success-lead" class="control-label">
								Report list lead
							</label>
							<vue-editor id="message-success-lead"
								v-model="customMessage.successLead" />
						</validated-form-group>
						<validated-form-group class="col-sm-12"
								:errors="sendReportsErrors"
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

							<p>
								You can see a detailed version of this
								report using the following link:
								<a href="#" @click="$event.preventDefault()">
									Detailed pairing report
								</a>
							</p>

							<div v-html="customMessage.closing"></div>

							<p>
								Thank you!
							</p>
						</div>
					</div>
				</div>

				<div class="text-center">
					<button type="button" class="btn btn-lg btn-info"
							:disabled="!sendReportsValid"
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

		<alert-list v-model="alerts" />
	</div>
</template>

<script>
import { VueEditor } from 'vue2-editor';

import delve from 'dlv';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import DownloadButton from '@/vue-components/DownloadButton.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';

import { handleError } from '@/modules/errors.js';
import { renderDateRange } from '@/modules/date-utils.js';
import {
	fetchConfig,
	ucfirst,
	jsonOrThrow
} from '@/modules/utils.js';

export default {
	mixins: [HasAlerts],
	props: {
		overlaps: {
			type: Array,
			required: true
		},
		reportDates: {
			type: Array,
			required: true
		},
		userType: {
			type: String,
			required: true
		},
		subjectType: {
			type: String,
			required: true
		}
	},
	data() {
		const customMessage = {
			intro: '',
			successLead: '',
			emptyMessage: '',
			closing: ''
		};

		if (
			this.userType === 'faculty'
			&& ['trainee', 'fellow', 'resident'].includes(this.subjectType)
		) {
			customMessage.intro = `<p>
				In an attempt to provide more feedback to our trainees and make it simpler
				for you to complete evaluations, we will be providing a periodic report of
				the trainees we believe you worked with the most.
			</p>`;
			customMessage.successLead = `<p>
				Based on our records, we've selected the following trainees as top
				candidates for evaluation for ${renderDateRange(...this.reportDates)}.
				Please use this as a reference to complete trainee evaluations.
			</p>`;
		} else if (
			['trainee', 'fellow', 'resident'].includes(this.userType)
			&& this.subjectType === 'faculty'
		) {
			customMessage.intro = `<p>
				In an attempt to provide you more feedback and make it simpler
				for evaluators to complete evaluations, we will be providing a periodic
				report of the faculty we believe you worked with the most.
			</p>`;
			customMessage.successLead = `<p>
				Based on our records, we've selected the following faculty as top
				candidates to provide evaluations for ${renderDateRange(...this.reportDates)}.
				Please use this as a reference to request evaluations and to
				complete evaluations of faculty.
			</p>`;
		}

		return {
			emailSubject: '',
			customMessage,

			show: {
				sendReports: false
			}
		};
	},
	computed: {
		sendReportsErrors() {
			const errors = new Map();

			if (
				!(
					this.reportDates
					&& Array.isArray(this.reportDates)
					&& this.reportDates.length === 2
				)
			) {
				// FIXME: This won't show up anywhere right now
				errors.set('reportDates', 'Report dates invalid');
			}

			const stringProps = [
				'emailSubject',
				'customMessage.intro',
				'customMessage.successLead'
			];
			for (const prop of stringProps) {
				if (!delve(this, prop)) {
					errors.set(prop, 'Please enter a value');
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
					errors.set(prop, 'Please replace all "___" placeholders');
				}
			}

			return errors;
		},
		sendReportsValid() {
			return this.sendReportsErrors.size === 0;
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
			if (!this.overlaps)
				return;

			return () => [
				[
					'User',
					ucfirst(this.subjectType),
					'Cases',
					'Total time'
				],
				...this.overlaps.reduce((rows, overlap) =>
					rows.concat(overlap.pairings.map(pairing =>
						[
							overlap.user.full_name,
							pairing.partner.full_name,
							pairing.numCases,
							`${pairing.totalTime.days} days, ${pairing.totalTime.h} hours, ${pairing.totalTime.i} minutes`
						]
					))
				, [])
			];
		}
	},
	methods: {
		ucfirst,
		sendReports(event) {
			event.preventDefault();

			if (!this.overlaps)
				return;

			if (!this.sendReportsValid) {
				this.alerts.push({
					type: 'warning',
					text: 'Please fix all input errors'
				});
				return;
			}

			this.processing = true;
			fetch('/reports/case-overlaps/send-reports', {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					overlaps: this.overlaps,
					startDate: this.reportDates[0],
					endDate: this.reportDates[1],
					subjectType: this.subjectType,
					emailSubject: this.emailSubject,
					...this.customMessage
				})
			}).then(jsonOrThrow).then(({successes, errors}) => {
				if (successes && successes > 0)
					this.alerts.push({
						type: 'success',
						text: `${successes} reports sent successfully`
					});

				if (errors && errors.length > 0) {

					this.alerts.push({
						type: 'error',
						html: `<p>${errors.length} reports unsuccessful</p>
							<ul>
								${errors.map(overlap =>
									`<li>${overlap.user.full_name}</li>`
								).join(' ')}
							</ul>
						`
					});
				}
			}).catch(err => {
				handleError(err, this, 'There was a problem sending reports');
			}).finally(() => {
				this.processing = false;
			});
		}
	},
	components: {
		VueEditor,
		DownloadButton,
		ShowHideButton,
		ValidatedFormGroup
	}
};
</script>

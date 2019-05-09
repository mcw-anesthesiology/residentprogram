<template>
	<div>
		<div class="close-container">
			<button
				type="button"
				class="btn btn-default close-report-button"
				@click="handleClose"
			>
				<span class="glyphicon glyphicon-chevron-left"></span>
			</button>

			<save-status
				:unsaved="unsaved"
				:saving="saving"
				:save-successful="savingSuccessful"
				:saved-locally="savedLocally"
				@save="handleSave"
			/>
		</div>
		<div class="form-summary panel panel-default">
			<div class="panel-body">
				<div class="row">
					<div v-if="readonly" class="col-sm-6">
						<small>Report period</small>
						<rich-date-range :dates="dates" />
					</div>
					<div v-else class="col-sm-6 form-group">
						<label class="containing-label">
							Report period
							<academic-year-selector
								v-model="dates"
								:min-date="lastMonth"
							/>
						</label>
					</div>

					<div class="col-sm-3">
						<small>Checked items</small>
						{{ checkedItems }}
					</div>
					<div class="col-sm-3">
						<small>Updated at</small>
						<rich-date :date="updated_at" detailed time />
					</div>
				</div>
			</div>
		</div>

		<merit-compensation-checklist
			v-bind="checklist"
			:title="title"
			:readonly="readonly"
			:user="currentUser"
			:unsaved="unsaved"
			:saving="saving"
			:save-successful="savingSuccessful"
			:saved-locally="savedLocally"
			@input="handleChecklistInput"
			@save="handleSave"
			@close="handleClose"
			@submit="handleComplete"
		/>

		<div
			v-if="!show.notes && (notes || userIsAdmin)"
			class="panel panel-default notes-container"
		>
			<div class="panel-heading">
				Notes
			</div>
			<div class="panel-body">
				<textarea class="form-control" :value="notes" readonly>
				</textarea>
			</div>
			<div v-if="userIsAdmin" class="panel-footer text-center">
				<button
					type="button"
					class="btn btn-info"
					@click="show.notes = true"
				>
					Edit notes
				</button>
			</div>
		</div>
		<div v-if="show.notes" class="panel panel-default notes-container">
			<div class="panel-heading">
				Notes
			</div>
			<div class="panel-body">
				<textarea class="form-control" v-model="inputNotes"> </textarea>
			</div>
			<div class="panel-footer text-center">
				<button
					type="button"
					class="btn btn-default"
					@click="show.notes = false"
				>
					Cancel
				</button>
				<loading-button
					loading-class="btn-primary"
					tooltip="Saved!"
					:loading="saving"
					:successful="savingSuccessful"
				>
					<button
						type="button"
						class="btn btn-primary"
						@click="handleSaveNotes"
					>
						Save notes
					</button>
				</loading-button>
			</div>
		</div>
	</div>
</template>

<script>
/** @format */

import moment from 'moment';
import * as localforage from 'localforage';

import MeritCompensationChecklist from './Checklist/Checklist.vue';
import SaveStatus from './Checklist/SaveStatus.vue';

import AcademicYearSelector from '@/vue-components/AcademicYearSelector.vue';
import LoadingButton from '@/vue-components/LoadingButton.vue';
import RichDate from '@/vue-components/RichDate.vue';
import RichDateRange from '@/vue-components/RichDateRange.vue';

import { logError, emitError } from '@/modules/errors.js';
import { isoDateString } from '@/modules/date-utils.js';
import { getCheckedItemCount } from '@/modules/merit-utils.js';
import { isAdmin, getFetchHeaders, okOrThrow } from '@/modules/utils.js';

export default {
	props: {
		id: {
			type: [Number, String],
			required: false
		},
		period_start: {
			type: String,
			required: true
		},
		period_end: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		},
		status: {
			type: String,
			default: 'pending'
		},
		notes: {
			type: String,
			required: false
		},
		title: {
			type: String,
			required: false
		},
		user_id: {
			type: [String, Number],
			required: true
		},
		form_id: {
			type: [String, Number],
			required: true
		},
		updated_at: {
			type: [Date, String],
			required: true
		},
		currentUser: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			dates: {
				startDate: this.period_start,
				endDate: this.period_end
			},
			checklist: this.report,
			inputNotes: this.notes || '',
			savingNotes: '',

			unsaved: false,
			saving: false,
			savingSuccessful: null,
			savedLocally: false,

			show: {
				notes: false
			}
		};
	},

	mounted() {
		window.addEventListener('beforeunload', this.beforeunloadHandler);

		localforage
			.getItem(this.localforageKey)
			.then(value => {
				if (value && value.checklist && value.updatedAt) {
					if (moment(value.updatedAt) > moment(this.updated_at)) {
						this.savedLocally = true;
						this.handleChecklistInput(value.checklist, false);
					}
				}
			})
			.catch(err => {
				logError(err);
			});
	},

	beforeDestroy() {
		window.removeEventListener('beforeunload', this.beforeunloadHandler);
	},

	computed: {
		beforeunloadHandler() {
			return this.handleBeforeunload.bind(this);
		},
		closeConfirmationMessage() {
			let message =
				'WARNING: You have unsaved changes. Are you sure you want to exit?';
			if (this.savedLocally) {
				message +=
					' Your changes have been saved locally to your web browser.';
			}

			return message;
		},
		localforageKey() {
			return `merit-checklist:${this.id}`;
		},
		userIsAdmin() {
			return isAdmin(this.currentUser);
		},
		userIsChecklistSubject() {
			return this.currentUser.id == this.user_id; // eslint-disable-line eqeqeq
		},
		readonly() {
			return !['PENDING', 'OPEN'].includes(this.status);
		},
		checkedItems() {
			return getCheckedItemCount(this.report);
		},
		lastMonth() {
			return isoDateString(moment().subtract(1, 'month'));
		}
	},

	watch: {
		period_start(period_start) {
			this.dates = Object.assign({}, this.dates, {
				startDate: period_start
			});
		},
		period_end(period_end) {
			this.dates = Object.assign({}, this.dates, { endDate: period_end });
		},
		report(report) {
			this.checklist = report;
		},
		notes(notes) {
			this.inputNotes = notes;
		},
		savingSuccessful(successful) {
			if (successful) {
				window.setTimeout(() => {
					this.savingSuccessful = null;
				}, 2000);
			}
		}
	},

	methods: {
		handleBeforeunload(event) {
			if (this.unsaved && !this.savedLocally) {
				event.preventDefault();
				event.returnValue = '';
			}
		},
		handleChecklistInput(checklist, saveLocally = true) {
			if (this.readonly) return;

			this.checklist = Object.assign({}, this.checklist, checklist);
			this.unsaved = true;
			if (saveLocally) {
				localforage
					.setItem(this.localforageKey, {
						checklist,
						updatedAt: new Date()
					})
					.then(() => {
						this.savedLocally = true;
					})
					.catch(logError);
			}

			if (this.userIsChecklistSubject) {
				this.handleSubmit(false);
			}
		},
		handleSaveNotes() {
			if (!this.userIsAdmin) return;

			this.$emit(
				'save',
				{
					id: this.id,
					notes: this.inputNotes
				},
				false
			);
		},
		handleSave() {
			this.handleSubmit(false);
		},
		handleComplete() {
			this.handleSubmit(true).then(() => {
				if (this.savingSuccessful) {
					this.$emit('reload');
					this.handleClose();
				}
			});
		},
		handleSubmit(isComplete) {
			if (this.readonly || !this.currentUser || !this.user_id) return;

			const form_id = Number(this.form_id);
			const user_id = Number(this.user_id);

			if (Number.isNaN(form_id) || Number.isNaN(user_id)) return;

			const changes = {
				_method: 'PATCH',
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist,
				user_id,
				form_id
			};

			if (isComplete) changes.status = 'complete';

			let meritReport = Object.assign(
				{
					id: this.id,
					period_start: this.period_start,
					period_end: this.period_end,
					status: this.status,
					notes: this.notes
				},
				changes
			);

			this.saving = true;

			return fetch(`/merits/${meritReport.id}`, {
				method: 'POST', // PATCH
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(meritReport)
			})
				.then(okOrThrow)
				.then(() => {
					this.unsaved = false;
					this.savingSuccessful = true;
					this.saving = false;
					localforage
						.removeItem(this.localforageKey)
						.then(() => {
							this.savedLocally = false;
						})
						.catch(logError);
				})
				.catch(err => {
					this.savingSuccessful = false;
					this.saving = false;
					emitError(
						err,
						this,
						'There was a problem saving the report'
					);
				});
		},
		confirmClose() {
			return !this.unsaved || window.confirm(this.closeConfirmationMessage);
		},
		handleClose() {
			if (this.confirmClose()) {
				this.$emit('close');
			}
		}
	},

	components: {
		MeritCompensationChecklist,
		SaveStatus,
		AcademicYearSelector,
		LoadingButton,
		RichDate,
		RichDateRange
	}
};
</script>

<style scoped>
small {
	font-size: 0.75em;
	color: rgba(0, 0, 0, 0.55);
	display: block;
}

.close-container {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 1em;
}

.notes-container {
	margin-top: 2em;
}

@media print {
	.close-report-button,
	.form-summary {
		display: none;
	}
}
</style>

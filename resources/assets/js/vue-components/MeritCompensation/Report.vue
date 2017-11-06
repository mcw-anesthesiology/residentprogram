<template>
	<div>
		<div class="close-container">
			<button type="button"
					class="btn btn-default close-report-button"
					@click="handleClose">
				<span class="glyphicon glyphicon-chevron-left"></span>
			</button>
		</div>
		<div v-if="readonly" class="form-summary panel panel-default">
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-6">
						<small>Report period</small>
						<rich-date-range :dates="dates" />
					</div>
					<div class="col-sm-6">
						<small>Checked items</small>
						{{ checkedItems }}
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="form-group">
				<label class="containing-label">
					Report period
					<academic-year-selector v-model="dates" :min-date="lastMonth" />
				</label>
			</div>
		</div>

		<merit-compensation-checklist v-bind="checklist"
			:title="title" :readonly="readonly"
			:user="currentUser"
			@input="handleChecklistInput"
			@save="handleSave"
			@close="handleClose"
			@submit="handleComplete" />

		<div v-if="!show.notes && (notes || userIsAdmin)"
				class="panel panel-default notes-container">
			<div class="panel-heading">
				Notes
			</div>
			<div class="panel-body">
				<textarea class="form-control"
					:value="notes" readonly>
				</textarea>
			</div>
			<div v-if="userIsAdmin" class="panel-footer text-center">
				<button type="button" class="btn btn-info"
						@click="show.notes = true">
					Edit notes
				</button>
			</div>
		</div>
		<div v-if="show.notes" class="panel panel-default notes-container">
			<div class="panel-heading">
				Notes
			</div>
			<div class="panel-body">
				<textarea class="form-control"
					v-model="inputNotes">
				</textarea>
			</div>
			<div class="panel-footer text-center">
				<button type="button" class="btn btn-default"
						@click="show.notes = false">
					Cancel
				</button>
				<loading-button loading-class="btn-primary"
						tooltip="Saved!"
						:loading="saving"
						:successful="savingSuccessful">
					<button type="button" class="btn btn-primary"
							@click="handleSaveNotes">
						Save notes
					</button>
				</loading-button>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

import MeritCompensationChecklist from './Checklist/Checklist.vue';

import AcademicYearSelector from '@/vue-components/AcademicYearSelector.vue';
import LoadingButton from '@/vue-components/LoadingButton.vue';
import RichDateRange from '@/vue-components/RichDateRange.vue';

import { isoDateString } from '@/modules/date-utils.js';
import { getCheckedItemCount } from '@/modules/merit-utils.js';
import { isAdmin, getFetchHeaders, okOrThrow } from '@/modules/utils.js';

export default {
	props: {
		id: {
			type: Number,
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
			required: true
		},
		user_id: {
			type: [ String, Number ],
			required: true
		},
		form_id: {
			type: [ String, Number ],
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

			saving: false,
			savingSuccessful: false,

			show: {
				notes: false
			}
		};
	},

	computed: {
		userIsAdmin() {
			return isAdmin(this.currentUser);
		},
		readonly() {
			return ![
				'pending',
				'open for editing'
			].includes(this.status);
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
			this.dates = Object.assign({}, this.dates, {startDate: period_start});
		},
		period_end(period_end) {
			this.dates = Object.assign({}, this.dates, {endDate: period_end});
		},
		report(report) {
			this.checklist = report;
		},
		notes(notes) {
			this.inputNotes = notes;
		}
	},

	methods: {
		handleChecklistInput(checklist) {
			if (this.readonly)
				return;

			this.checklist = Object.assign({}, this.checklist, checklist);
			if (this.currentUser.id === this.user_id) {
				this.handleSubmit(false);
			}
		},
		handleSaveNotes() {
			if (!this.userIsAdmin)
				return;

			this.$emit('save', {
				id: this.id,
				notes: this.inputNotes
			}, false);
		},
		handleSave() {
			this.handleSubmit(false).then(() => {
				this.$emit('reload');
				this.handleClose(); // FIXME: Probably shouldn't close here
			});
		},
		handleComplete() {
			this.handleSubmit(true).then(() => {
				this.$emit('reload');
				this.handleClose();
			});
		},
		handleSubmit(isComplete) {
			if (this.readonly || !this.currentUser || !this.user_id)
				return;

			const form_id = Number(this.form_id);
			const user_id = Number(this.user_id);

			if (Number.isNaN(form_id) || Number.isNaN(user_id))
				return;

			const changes = {
				_method: 'PATCH',
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist,
				user_id,
				form_id
			};

			if (isComplete)
				changes.status = 'complete';

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
			}).then(okOrThrow).then(() => {
				this.savingSuccessful = true;
				this.saving = false;
			}).catch(err => {
				this.savingSuccessful = false;
				this.saving = false;
				console.error(err);
				this.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem saving the report'
				});
			});
		},
		handleClose() {
			this.$emit('close');
		}
	},

	components: {
		MeritCompensationChecklist,

		AcademicYearSelector,
		LoadingButton,
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

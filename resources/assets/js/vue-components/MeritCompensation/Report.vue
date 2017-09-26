<template>
	<div>
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
			:user="user"
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

import AcademicYearSelector from 'vue-components/AcademicYearSelector.vue';
import LoadingButton from 'vue-components/LoadingButton.vue';
import RichDateRange from 'vue-components/RichDateRange.vue';

import { isoDateString } from 'modules/date-utils.js';
import { getCheckedItemCount } from 'modules/merit-utils.js';
import { isAdmin, getFetchHeaders, okOrThrow } from 'modules/utils.js';

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
		user: {
			type: Object,
			required: true
		},
		formId: {
			type: [ String, Number ],
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
			return isAdmin(this.user);
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
		notes(notes) {
			this.inputNotes = notes;
		}
	},

	methods: {
		handleChecklistInput(checklist) {
			this.checklist = Object.assign({}, this.checklist, checklist);
		},
		handleSaveNotes() {
			if (!isAdmin(this.user))
				return;

			this.$emit('save', {
				id: this.id,
				notes: this.inputNotes
			}, false);
		},
		handleSave() {
			this.handleSubmit(false).then(() => {
				this.handleClose(); // FIXME: Probably shouldn't close here
			});
		},
		handleComplete() {
			this.handleSubmit(true).then(() => {
				this.handleClose();
			});
		},
		handleSubmit(isComplete) {
			if (this.readonly || !this.user)
				return;

			const formId = Number(this.formId);

			if (Number.isNaN(formId))
				return;

			const changes = {
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist
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

			const url = meritReport.id
				? `/merits/${meritReport.id}`
				: '/merits';

			const method = 'POST';
			if (meritReport.id) {
				// method = 'PATCH';
				meritReport._method = 'PATCH';
			}

			meritReport.user_id = this.user.id;
			meritReport.form_id = formId;

			return fetch(url, {
				method,
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(meritReport)
			}).then(okOrThrow).then(() => {
				this.savingSuccessful = true;
				this.saving = false;
				this.$emit('reload');
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

	.notes-container {
		margin-top: 2em;
	}
</style>

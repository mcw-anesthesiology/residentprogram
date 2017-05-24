<template>
	<div class="merit-report-list-item">
		<div class="row">
			<div class="col-sm-1">
				<small>#</small>
				<span>{{ id }}</span>
			</div>
			<div class="col-sm-2">
				<small>Form</small>
				<span>{{ form.name }}</span>
			</div>
			<div class="col-sm-3">
				<small>Period</small>
				<rich-date-range :dates="dates" />
			</div>
			<div class="col-sm-2 checked-items-cell">
				<small>Checked items</small>
				{{ checkedItems }}
			</div>
			<div class="col-sm-2">
				<span class="label" :class="statusLabel">
					{{ ucfirst(status) }}
				</span>
			</div>
			<div class="col-sm-2 controls-cell">
				<button type="button" class="btn btn-info btn-xs"
						@click="$emit('click', id)">
					<span class="glyphicon" :class="viewEditGlyph"></span>
					{{ viewEditText }}
				</button>

				<template v-if="userIsAdmin">
					<confirmation-button v-if="status === 'complete'"
							class="btn btn-xs btn-primary"
							@click="openForEditing">
						<span class="glyphicon glyphicon-edit"></span>
						Open for editing
					</confirmation-button>
					<confirmation-button v-else-if="status === 'open for editing'"
							class="btn btn-xs btn-primary"
							@click="closeEditing">
						<span class="glyphicon glyphicon-check"></span>
						Close editing
					</confirmation-button>

					<confirmation-button v-if="status === 'disabled'"
							class="btn btn-xs btn-success"
							@click="enableReport">
						<span class="glyphicon glyphicon-check"></span>
						Enable report
					</confirmation-button>
					<confirmation-yes-no v-else
							default-class="btn btn-xs btn-danger"
							yes-class="btn btn-xs btn-danger"
							no-class="btn btn-xs btn-default"
							@click="disableReport">
						<span class="glyphicon glyphicon-remove"></span>
						Disable report

						<template slot="yes">
							Yes, disable report
						</template>
						<template slot="no">
							Cancel
						</template>
					</confirmation-yes-no>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';
import ConfirmationYesNo from 'vue-components/ConfirmationYesNo.vue';
import RichDateRange from 'vue-components/RichDateRange.vue';

import { getFetchHeaders, okOrThrow, ucfirst } from 'modules/utils.js';
import { getEvaluationStatusLabel } from 'modules/datatable-utils.js';
import { getCheckedItemCount } from 'modules/merit-utils.js';

export default {
	props: {
		id: {
			type: Number,
			required: true
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
			required: true
		},
		form: {
			type: Object,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},

	computed: {
		userIsAdmin() {
			return this.user && this.user.type === 'admin';
		},
		dates() {
			return {
				startDate: this.period_start,
				endDate: this.period_end
			};
		},
		viewEditText() {
			return ['pending', 'open for editing'].includes(this.status)
				? 'Complete'
				: 'View';
		},
		viewEditGlyph() {
			return ['pending', 'open for editing'].includes(this.status)
				? 'glyphicon-pencil'
				: 'glyphicon-list-alt';
		},
		statusLabel() {
			return getEvaluationStatusLabel(this.status);
		},
		checkedItems() {
			return getCheckedItemCount(this.report);
		}
	},

	methods: {
		ucfirst,
		openForEditing() {
			if (this.user.type !== 'admin' || this.status !== 'complete')
				return;

			this.updateReport({
				status: 'open for editing'
			});
		},
		closeEditing() {
			if (this.user.type !== 'admin' || this.status !== 'open for editing')
				return;

			this.updateReport({
				status: 'complete'
			});
		},
		disableReport() {
			if (this.user.type !== 'admin')
				return;

			this.updateReport({
				status: 'disabled'
			});
		},
		enableReport() {
			if (this.user.type !== 'admin')
				return;

			this.updateReport({
				status: 'open for editing'
			});
		},
		updateReport(changes) {
			fetch(`/merits/${this.id}`, {
				method: 'POST', // PATCH
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign(changes, {
					_method: 'PATCH'
				}))
			}).then(okOrThrow).then(() => {
				this.$emit('change');
			}).catch(err => {
				console.error(err);
				this.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem updating the merit report'
				});
			});
		}
	},

	components: {
		ConfirmationButton,
		ConfirmationYesNo,
		RichDateRange
	}
};
</script>

<style scoped>
	.merit-report-list-item {
		border-bottom: 1px solid rgba(0, 0, 0, 0.25);
		padding: 5px 0;
	}

	.merit-report-list-item:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.05);
	}

	small {
		font-size: 0.75em;
		color: rgba(0, 0, 0, 0.55);
		display: block;
	}

	.checked-items-cell,
	.controls-cell {
		text-align: right;
	}

	.controls-cell button {
		margin: 0.1em;
	}
</style>

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
			<div class="col-sm-2">
				<div>
					<span class="label" :class="statusLabel">
						{{ statusText }}
					</span>
				</div>
				<div>
					<small>Updated at</small>
					<rich-date :date="updated_at" />
				</div>
			</div>
			<div class="col-sm-4 controls-cell">
				<router-link :to="`/checklist/${id}`" class="btn btn-info btn-xs">

					<span class="glyphicon" :class="viewEditGlyph"></span>
					{{ viewEditText }}
				</router-link>

				<router-link :to="`/summary/${id}`" class="btn btn-info btn-xs">
					<span class="glyphicon glyphicon-list-alt"></span>
					View summary
				</router-link>

				<template v-if="userIsAdmin">
					<confirmation-button v-if="status === 'COMPLETE'"
							class="btn btn-xs btn-primary"
							@click="openForEditing">
						<span class="glyphicon glyphicon-edit"></span>
						Open for editing
					</confirmation-button>
					<confirmation-button v-else-if="status === 'OPEN'"
							class="btn btn-xs btn-primary"
							@click="closeEditing">
						<span class="glyphicon glyphicon-check"></span>
						Close editing
					</confirmation-button>

					<confirmation-button v-if="status === 'DISABLED'"
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
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import ConfirmationYesNo from '@/vue-components/ConfirmationYesNo.vue';
import RichDate from '@/vue-components/RichDate.vue';
import RichDateRange from '@/vue-components/RichDateRange.vue';

import { emitError } from '@/modules/errors.js';
import { getStatusLabel, getStatusText } from '@/modules/merit-utils.js';
import { getFetchHeaders, okOrThrow, ucfirst } from '@/modules/utils.js';

export default {
	props: {
		id: {
			type: [Number, String],
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
		},
		updated_at: {
			type: Date,
			required: true
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
			return ['PENDING', 'OPEN'].includes(this.status)
				? 'Continue'
				: 'View';
		},
		viewEditGlyph() {
			return ['PENDING', 'OPEN'].includes(this.status)
				? 'glyphicon-pencil'
				: 'glyphicon-list-alt';
		},
		statusLabel() {
			return `label-${getStatusLabel(this.status)}`;
		},
		statusText() {
			return getStatusText(this.status);
		}
	},

	methods: {
		ucfirst,
		openForEditing() {
			if (this.user.type !== 'admin' || this.status !== 'COMPLETE')
				return;

			this.updateReport({
				status: 'OPEN'
			});
		},
		closeEditing() {
			if (this.user.type !== 'admin' || this.status !== 'OPEN')
				return;

			this.updateReport({
				status: 'COMPLETE'
			});
		},
		disableReport() {
			if (this.user.type !== 'admin')
				return;

			this.updateReport({
				status: 'DISABLED'
			});
		},
		enableReport() {
			if (this.user.type !== 'admin')
				return;

			this.updateReport({
				status: 'OPEN'
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
				emitError(err, this, 'There was a problem updating the merit report');
			});
		}
	},

	components: {
		ConfirmationButton,
		ConfirmationYesNo,
		RichDate,
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

	.controls-cell button,
	.controls-cell a {
		margin: 0.1em;
	}
</style>

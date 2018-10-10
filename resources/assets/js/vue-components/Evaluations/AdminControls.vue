<template>
	<form class="admin-controls form-inline" @submit="handleSubmit">
		<label>
			Status
			<select class="form-control" v-model="status">
				<option></option>
				<option v-for="option of statusOptions" :value="option">
					{{ ucfirst(option) }}
				</option>
			</select>
		</label>
		<label>
			Visibility
			<select class="form-control" v-model="visibility">
				<option></option>
				<option v-for="option of visibilityOptions" :value="option">
					{{ ucfirst(option) }}
				</option>
			</select>
		</label>

		<div v-if="submissionSuccessful" class="success-container">
			Saved successfully!
			<button type="button" class="btn btn-xs btn-default" @click="submissionSuccessful = null">
				Dismiss
			</button>
		</div>

		<confirmation-button type="submit" class="btn btn-primary">
			Save changes
		</confirmation-button>
	</form>
</template>

<style scoped>
.admin-controls {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;

	border: 1px solid #ddd;
	padding: 0.5em 1em;
}

.success-container {
	border: 1px solid forestgreen;
	border-radius: 3px;
	padding: 0.25em 0.5em;
}
</style>

<script>
import { mapState } from 'vuex';

import ConfirmationButton from '#/ConfirmationButton.vue';

import ky from '@/modules/ky.js';
import { storeError } from '@/modules/errors.js';
import { ucfirst } from '@/modules/utils.js';

export default {
	props: {
		evaluation: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			status: null,
			visibility: null,
			evaluationDates: {
				startDate: null,
				endDate: null
			},

			submissionSuccessful: null
		};
	},
	computed: {
		...mapState(['user']),
		statusOptions() {
			const options = [
				this.evaluation.complete_date ? 'complete' : 'pending',
				!this.evaluation.complete_date && 'canceled by admin',
				'disabled'
			].filter(Boolean).filter(o => o !== this.evaluation.status);

			return options;
		},
		visibilityOptions() {
			return [
				'default',
				'visible',
				'anonymous',
				'hidden',
				this.evaluation.type === 'faculty' && 'under faculty threshold'
			].filter(Boolean);
		},
		body() {
			const body = {};

			if (this.status) {
				body.status = this.status;
			}

			if (this.visibility) {
				body.visibility = this.visibility;
			}

			if (this.evaluationDates && this.evaluationDates.startDate && this.evaluationDates.endDate) {
				body.evaluation_date_start = this.evaluationDates.startDate;
				body.evaluation_date_end = this.evaluationDates.endDate;
			}

			if (!Object.getOwnPropertyNames(body).length)
				return;

			return body;
		}
	},
	methods: {
		ucfirst,
		async handleSubmit(event) {
			event.preventDefault();

			if (!this.body)
				return;

			try {
				const response = await ky.patch(`/api/evaluations/${this.evaluation.id}`, {
					json: this.body
				});

				if (response.ok) {
					this.submissionSuccessful = true;
					this.$store.dispatch('evaluations/fetchOne', { id: this.evaluation.id });
				} else {
					throw new Error(response.status);
				}
			} catch (err) {
				storeError(err, this, 'There was a problem saving the evaluation details');
			}
		}
	},
	components: {
		ConfirmationButton
	}
};
</script>

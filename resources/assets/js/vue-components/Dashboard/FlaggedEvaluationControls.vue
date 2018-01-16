<template>
	<td>
		<confirmation-button v-if="cancellable" class="btn btn-xs btn-warning"
				@click="cancelRequest">
			<span class="glyphicon glyphicon-remove"></span>
			Cancel request
		</confirmation-button>
		<confirmation-button class="btn btn-xs btn-primary"
				@click="handleComplete">
			<span class="glyphicon glyphicon-ok"></span>
			Complete
		</confirmation-button>
	</td>
</template>

<script>
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';

import { emitError } from '@/modules/errors.js';
import {
	fetchConfig,
	okOrThrow
} from '@/modules/utils.js';

export default {
	props: {
		flaggedEval: {
			type: Object,
			required: true
		}
	},

	computed: {
		cancellable() {
			return (
				this.flaggedEval.requested_action === 'delete'
				&& this.flaggedEval.evaluation.status === 'pending'
			);
		}
	},

	methods: {
		cancelRequest() {
			if (!this.cancellable)
				return;

			fetch(`/evaluations/${this.flaggedEval.evaluation.id}/cancel`, {
				...fetchConfig(),
				method: 'POST', // PATCH
				body: JSON.stringify({
					_method: 'PATCH'
				})
			}).then(okOrThrow).then(() => {
				this.handleComplete();
			}).catch(err => {
				emitError(err, this, 'There was a problem cancelling the evaluation request');
			});
		},
		handleComplete() {
			fetch(`/flagged_evaluations/${this.flaggedEval.id}`, {
				...fetchConfig(),
				method: 'POST', // DELETE
				body: JSON.stringify({
					_method: 'DELETE'
				})
			}).then(okOrThrow).then(() => {
				this.$emit('remove');
			}).catch(err => {
				emitError(err, this, 'There was a problem completing the flagged evaluation');
			});
		}
	},

	components: {
		ConfirmationButton
	}
};
</script>

<style scoped>
	td .btn {
		margin: 0.25em;
	}
</style>

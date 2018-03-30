<template>
	<div>
		<confirmation-button class="btn btn-danger btn-xs"
				@click="handleDelete">
			<span class="glyphicon glyphicon-remove"></span>
			Delete
		</confirmation-button>
		<span class="value">
			{{ value }}
		</span>
		<span class="glyphicon glyphicon-arrow-right"></span>
		<span class="highlighted-value">
			{{ highlighted_value }}
		</span>
	</div>
</template>

<script>
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';

import { emitError } from '@/modules/errors.js';
import { fetchConfig, okOrThrow } from '@/modules/utils.js';

export default {
	props: {
		id: {
			type: Number,
			required: true
		},
		highlighted_question_question_id: {
			type: Number,
			required: true
		},
		value: {
			type: String,
			required: true
		},
		highlighted_value: {
			type: String,
			required: true
		}
	},
	methods: {
		handleDelete() {
			fetch(`/highlighted-questions-values/${this.id}`, {
				...fetchConfig(),
				method: 'POST', // DELETE
				body: JSON.stringify({
					_method: 'DELETE'
				})
			}).then(okOrThrow).then(() => {
				this.$emit('delete');
			}).catch(err => {
				emitError(
					err,
					this,
					'There was a problem deleting the value mapping'
				);
			});
		}
	},
	components: {
		ConfirmationButton
	}
};
</script>

<template>
	<div class="pager-controls">
		<div class="button-container">
			<button type="button" class="btn btn-default"
					:disabled="!canGoBackPage"
					@click="$emit('back')">
				{{ backText }}
			</button>
		</div>

		<progress-bullets :max="totalPages" :value="currentPage + 1" />

		<div class="button-container">
			<button v-if="currentPage < totalPages - 1" type="button"
					class="btn btn-default" :disabled="!canAdvancePage"
					@click="$emit('forward')">
				{{ forwardText }}
			</button>
			<confirmation-button v-else-if="!readonly"
					class="btn btn-primary" pressed-class="btn-success"
					:disabled="!canSubmit"
					@click="$emit('submit')">
				{{ submitText }}
				<template slot="pressed">
					Confirm
				</template>
			</confirmation-button>
		</div>
	</div>
</template>

<script>
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';
import ProgressBullets from 'vue-components/ProgressBullets.vue';

export default {
	props: {
		currentPage: {
			type: Number,
			required: true
		},
		totalPages: {
			type: Number,
			required: true
		},
		submitText: {
			type: String,
			default: 'Submit'
		},
		forwardText: {
			type: String,
			default: 'Next page'
		},
		backText: {
			type: String,
			default: 'Back'
		},
		canGoBackPage: {
			type: Boolean,
			required: true
		},
		canAdvancePage: {
			type: Boolean,
			required: true
		},
		canSubmit: {
			type: Boolean,
			required: true
		},
		readonly: {
			type: Boolean,
			required: true
		}
	},

	computed: {

	},

	components: {
		ConfirmationButton,
		ProgressBullets
	}
};
</script>

<style scoped>
	.pager-controls {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}

	.button-container {
		display: inline-block;
		margin: 0.5em;
	}

	button,
	confirmation-button {
		min-width: 100px;
	}

	.progress-bullets {
		display: inline-block;
		margin: 0.5em 2em;
	}

	@media (max-width: 768px) {
		.progress-bullets {
			width: 100%;
			order: 1;
		}

		.button-container {
			order: 2;
		}
	}
</style>

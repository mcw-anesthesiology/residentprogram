<template>
	<div class="pager-controls">
		<div class="button-container">
			<button type="button" class="btn btn-default button-container-primary"
					:disabled="!canGoBackPage"
					@click="$emit('back')">
				{{ backText }}
			</button>
		</div>

		<progress-bullets :max="totalPages" :value="currentPage + 1" />

		<div class="button-container text-right">
			<button v-if="currentPage < totalPages - 1"
					type="button"
					class="btn btn-default button-container-primary"
					:disabled="!canAdvancePage"
					@click="$emit('forward')">
				{{ forwardText }}
			</button>
			<template v-else-if="!readonly">
				<bootstrap-popover v-if="!canSubmit"
						placement="auto bottom"
						:content="submitHelp">
					<span class="glyphicon glyphicon-question-sign"></span>
				</bootstrap-popover>
				<button type="button"
						class="btn btn-primary button-container-primary"
						pressed-class="btn-success"
						:disabled="!canSubmit"
						:title="submitHelp"
						@click="$emit('submit')">
					{{ submitText }}
					<template slot="pressed">
						Confirm
					</template>
				</button>
			</template>
		</div>
	</div>
</template>

<script>
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import ProgressBullets from '@/vue-components/ProgressBullets.vue';
import BootstrapPopover from '@/vue-components/BootstrapPopover.vue';

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
		submitHelp() {
			if (!this.canSubmit) {
				return 'There are errors preventing you from submitting the form, '
					+ 'please show checklist validation to see them.';
			}
		}
	},

	components: {
		ConfirmationButton,
		ProgressBullets,
		BootstrapPopover
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

	.button-container-primary {
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

	@media (min-width: 768px) {
		.button-container {
			width: 150px;
		}
	}
</style>

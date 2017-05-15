<template>
	<div class="pager-controls">
		<button type="button" class="btn btn-default"
				:disabled="!canGoBackPage"
				@click="$emit('back')">
			{{ backText }}
		</button>

		<progress-bullets :max="totalPages" :value="currentPage + 1" />

		<button v-if="currentPage < totalPages - 1" type="button"
				class="btn btn-default" :disabled="!canAdvancePage"
				@click="$emit('forward')">
			{{ forwardText }}
		</button>
		<button v-else-if="!readonly" type="button"
				class="btn btn-primary" :disabled="!canAdvancePage"
				@click="$emit('submit')">
			{{ submitText }}
		</button>
		<div v-else>
			<!-- To preserve spacing -->
		</div>
	</div>
</template>

<script>
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
		readonly: {
			type: Boolean,
			required: true
		}
	},

	computed: {

	},

	components: {
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

	.pager-controls button,
	.pager-controls div {
		width: 100px;
		margin: 0.5em;
	}

	.pager-controls .progress-bullets {
		margin: 0.5em 2em;
		flex-grow: 1;
	}

	@media (max-width: 768px) {
		.pager-controls .progress-bullets {
			width: 100%;
			order: 1;
		}

		.pager-controls button,
		.pager-controls div {
			order: 2;
		}
	}
</style>

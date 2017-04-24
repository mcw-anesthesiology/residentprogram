<template>
	<div class="questionnaire-pager">
		<div class="pager-content">
			<slot :page="page" :page-num="currentPage"></slot>
		</div>
		<div class="pager-controls">
			<button type="button" class="btn btn-default"
					:disabled="currentPage === 0"
					@click="goBack">
				{{ backText }}
			</button>
			
			<progress-bullets :max="pages.length" :value="currentPage + 1" />
			
			<button v-if="currentPage < pages.length - 1" type="button"
					class="btn btn-default" :disabled="!canAdvancePage"
					@click="advance">
				{{ nextText }}
			</button>
			<button v-else-if="!readonly" type="button"
					class="btn btn-primary" :disabled="!canAdvancePage"
					@click="submit">
				{{ submitText }}
			</button>
			<div v-else>
				<!-- To preserve spacing -->
			</div>
		</div>
	</div>
</template>

<script>
import ProgressBullets from 'vue-components/ProgressBullets.vue';

export default {
	props: {
		pages: {
			type: Array,
			required: true
		},
		pageValidator: {
			type: Function,
			default() {
				return true;
			}
		},
		submitText: {
			type: String,
			default: 'Submit'
		},
		nextText: {
			type: String,
			default: 'Next page'
		},
		backText: {
			type: String,
			default: 'Back'
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			currentPage: 0
		};
	},
	
	computed: {
		page() {
			return this.pages[this.currentPage];
		},
		canAdvancePage() {
			return this.pageValidator(this.currentPage);
		}
	},
	
	methods: {
		goBack() {
			if (this.currentPage > 0)
				this.currentPage--;
		},
		advance() {
			if (this.canAdvancePage)
				this.currentPage++;
		},
		submit() {
			if (this.canAdvancePage)
				this.$emit('submit');
		}
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

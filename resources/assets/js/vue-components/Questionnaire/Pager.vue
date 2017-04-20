<template>
	<div class="pager">
		<div class="pager-content">
			<slot :page="page" :page-num="currentPage"></slot>
		</div>
		<div class="pager-controls">
			<button type="button" class="btn btn-default"
					:disabled="currentPage === 0"
					@click="goBack">
				{{ backText }}
			</button>
			<progress :value="currentPage" :max="pages.length">
				{{ `${currentPage} / ${pages.length}` }}
			</progress>
			<button type="button" class="btn btn-default"
					:disabled="!canAdvancePage"
					@click="advance">
				{{ currentPage === pages.length - 1 ? submitText : nextText }}
			</button>
		</div>
	</div>
</template>

<script>
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
			if (this.canAdvancePage) {
				if (this.currentPage < this.pages.length - 1)
					this.currentPage++;
				else
					this.$emit('submit');
			}
		}
	}
};
</script>

<style scoped>
	.page-controls {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	@media (min-width: 768px) {
		.page-controls progress {
			order: 1;
			width: 100%;
			flex-shrink: 0;
			flex-grow: 1;
		}
		
		.page-controls button {
			order: 2;
		}
	}
</style>

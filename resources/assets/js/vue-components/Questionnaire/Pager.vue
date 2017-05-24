<template>
	<div ref="pager" class="questionnaire-pager">
		<pager-controls :current-page="currentPage"
			:total-pages="pages.length"
			:submit-text="submitText"
			:forward-text="forwardText"
			:back-text="backText"
			:can-advance-page="canAdvancePage"
			:can-go-back-page="canGoBackPage"
			:readonly="readonly"
			@back="goBack"
			@forward="advance"
			@submit="submit" />

		<button type="button" class="scroll-button btn"
				@click="scrollToBottom">
			<span class="glyphicon glyphicon-arrow-down"></span>
			Scroll to bottom
		</button>

		<div class="pager-content">
			<slot :page="page" :page-num="currentPage"></slot>
		</div>

		<button type="button" class="scroll-button btn"
				@click="scrollToTop">
			<span class="glyphicon glyphicon-arrow-up"></span>
			Scroll to top
		</button>

		<pager-controls :current-page="currentPage"
			:total-pages="pages.length"
			:submit-text="submitText"
			:forward-text="forwardText"
			:back-text="backText"
			:can-advance-page="canAdvancePage"
			:can-go-back-page="canGoBackPage"
			:readonly="readonly"
			@back="goBack"
			@forward="advance"
			@submit="submit" />
	</div>
</template>

<script>
import PagerControls from './PagerControls.vue';

import { getHeaderHeight } from 'modules/dom-utils.js';

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
		forwardText: {
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
		canGoBackPage() {
			return this.currentPage > 0;
		},
		canAdvancePage() {
			return this.pageValidator(this.pages[this.currentPage]);
		}
	},

	methods: {
		scrollToTop() {
			$(this.$refs.pager).velocity('scroll', {
				offset: -1 * getHeaderHeight()
			});
		},
		scrollToBottom() {
			$(this.$refs.pager).velocity('scroll', {
				offset: (
					this.$refs.pager.clientHeight
					- window.innerHeight
				)
			});
		},
		goBack() {
			if (this.canGoBackPage) {
				this.scrollToTop();
				this.currentPage--;
			}
		},
		advance() {
			if (this.canAdvancePage) {
				this.scrollToTop();
				this.currentPage++;
			}
		},
		submit() {
			if (this.canAdvancePage)
				this.$emit('submit');
		}
	},

	components: {
		PagerControls
	}
};
</script>

<style scoped>
	.scroll-button {
		display: block;
		margin-left: auto;
	}

	.scroll-button .glyphicon {
		display: block;
	}
</style>

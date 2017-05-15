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
			@sumit="submit" />
		<div class="pager-content">
			<slot :page="page" :page-num="currentPage"></slot>
		</div>
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
			@sumit="submit" />
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
			return this.pageValidator(this.currentPage);
		}
	},

	methods: {
		scrollToTop() {
			$(this.$refs.pager).velocity('scroll', {
				offset: -1 * getHeaderHeight()
			});
		},
		goBack() {
			if (this.canGoBackPage) {
				this.currentPage--;
				this.scrollToTop();
			}
		},
		advance() {
			if (this.canAdvancePage) {
				this.currentPage++;
				this.scrollToTop();
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

<template>
	<div ref="pager" class="questionnaire-pager">
		<slot name="header"
			:go-to-page="goToPage"
			:pages="pages"
			:page-num="currentPage">
		</slot>

		<pager-controls :current-page="currentPage"
			:total-pages="pages.length"
			:submit-text="submitText"
			:forward-text="forwardText"
			:back-text="backText"
			:can-advance-page="canAdvancePage"
			:can-go-back-page="canGoBackPage"
			:can-submit="canSubmit"
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
			<slot :page="page"
				:page-num="currentPage"
				:last-change="lastChange">
			</slot>
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
			:can-submit="canSubmit"
			:readonly="readonly"
			bottom
			@back="goBack"
			@forward="advance"
			@submit="submit" />

		<slot name="footer"
			:go-to-page="goToPage"
			:pages="pages"
			:page-num="currentPage">
		</slot>
	</div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

import PagerControls from './PagerControls.vue';

import { getHeaderHeight } from '@/modules/dom-utils.js';

Vue.use(VueRouter);

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
		checklistValidator: {
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
			// currentPage: 0,
			lastChange: ''
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
		},
		canSubmit() {
			return this.checklistValidator({ pages: this.pages });
		},
		currentPage() {
			if (
				this.$route
				&& this.$route.query
				&& 'page' in this.$route.query
			) {
				const page = Number(this.$route.query.page) - 1;

				if (Number.isNaN(page) || page < 0) {
					this.goToPage(0);
				} else if (page > this.pages.length - 1) {
					this.goToPage(this.pages.length - 1);
				} else {
					return page;
				}
			}

			return 0;
		}
	},

	watch: {
		currentPage(currentPage, prevPage) {
			if (currentPage > prevPage)
				this.lastChange = 'forward';
			else if (currentPage < prevPage)
				this.lastChange = 'back';
			else
				this.lastChange = '';
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
			if (this.canGoBackPage)
				this.goToPage(this.currentPage - 1);
		},
		advance() {
			if (this.canAdvancePage)
				this.goToPage(this.currentPage + 1);
		},
		goToPage(page) {
			page = page + 1;
			const query = Object.assign({}, this.$route.query, { page });
			const location = Object.assign({}, this.$route, { query });
			this.$router.push(location);
		},
		submit() {
			if (this.canSubmit)
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

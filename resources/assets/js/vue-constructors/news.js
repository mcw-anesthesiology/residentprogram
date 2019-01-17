import Vue from '@/vue-constructors/vue.js';

import { logError } from '@/modules/errors.js';
import { fetchConfig, jsonOrThrow } from '@/modules/utils.js';

export function createNews(el) {
	return new Vue({
		el,
		data() {
			return {
				open: false,
				left: false,
				newsItems: null
			};
		},
		mounted() {
			this.fetchUnseenNewsItems();
		},
		updated() {

		},
		beforeDestroy() {
			this.open = false;
		},
		watch: {
			open(open, oldOpen) {
				if (open && !oldOpen) {
					window.addEventListener('click', this.toggleDropdown);
				} else if (!open && oldOpen) {
					window.removeEventListener('click', this.toggleDropdown);
				}

				if (open) {
					this.$nextTick(() => {
						const rect = this.$refs.menu.getBoundingClientRect();
						if (rect && rect.x < 0)
							this.left = true;
					});
				}
			}
		},
		methods: {
			fetchUnseenNewsItems() {
				fetch('/news-items/unseen', {
					...fetchConfig()
				}).then(jsonOrThrow).then(newsItems => {
					this.newsItems = newsItems;
				}).catch(err => {
					// FIXME: Show this somewhere
					logError(err);
				});
			},
			ignoreDropdownClick(event) {
				event.stopPropagation();
			},
			toggleDropdown(event) {
				if (event.defaultPrevented)
					return;

				this.open = !this.open;
				this.left = false;
			},
			handleRemove(itemId) {
				this.newsItems = this.newsItems.filter(item =>
					item.id !== itemId
				);
			}
		},
		components: {
			NewsList: () => import('@/vue-components/News/List.vue')
		}
	});
}

import Vue from '@/vue-constructors/index.js';
import { mapState } from 'vuex';

import store from '@/vue-constructors/store.js';

import NewsList from '@/vue-components/News/List.vue';

export function createNews(el) {
	return new Vue({
		el,
		store,
		data() {
			return {
				open: false,
				left: false
			};
		},
		mounted() {
			this.$store.dispatch('news/fetchUnseen');
		},
		beforeDestroy() {
			this.open = false;
		},
		computed: mapState('news', {
			newsItems: 'unseenNewsItems'
		}),
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
			NewsList
		}
	});
}

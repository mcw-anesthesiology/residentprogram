import Vue from '@/vue-constructors/index.js';
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ComponentList from '@/vue-components/ComponentList.vue';
import MarkdownEditor from '@/vue-components/MarkdownEditor.vue';
import RichDate from '@/vue-components/RichDate.vue';

import { handleError } from '@/modules/errors.js';
import {
	fetchConfig,
	okOrThrow,
	jsonOrThrow,
	kebabCaseToWords
} from '@/modules/utils.js';

export default function createManageNewsItems(el, propsData) {
	return new Vue({
		mixins: [HasAlerts],
		el,
		props: {

		},
		propsData,
		data() {
			return {
				newsItems: [],

				heading: null,
				body: {
					md: '',
					html: null
				},
				link: null,
				link_text: null,
				audience: null,

				show: {
					addItem: false
				}
			};
		},
		mounted() {
			this.fetchNewsItems();
		},
		computed: {
			audienceOptions() {
				return [
					'all',
					'trainee',
					'intern',
					'resident',
					'fellow',
					'faculty',
					'admin'
				];
			}
		},
		methods: {
			kebabCaseToWords,
			fetchNewsItems() {
				fetch('/news-items', {
					...fetchConfig()
				}).then(jsonOrThrow).then(newsItems => {
					this.newsItems = newsItems;
				}).catch(err => {
					handleError(err, this, 'There was a problem fetching news items');
				});
			},
			handleAddNewsItem(event) {
				event.preventDefault();

				fetch('/news-items', {
					...fetchConfig(),
					method: 'POST',
					body: JSON.stringify({
						heading: this.heading,
						body: this.body.html,
						link: this.link,
						link_text: this.link_text,
						audience: this.audience
					})
				}).then(okOrThrow).then(() => {
					this.fetchNewsItems();
				}).catch(err => {
					handleError(err, this, 'There was a problem adding the news item');
				});
			}
		},
		components: {
			ComponentList,
			MarkdownEditor,
			RichDate
		}
	});
}

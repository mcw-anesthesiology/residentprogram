<script>
export default {
	name: 'questionnaire-print-view-section',
	model: {
		prop: 'items'
	},
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'section';
			}
		},
		title: {
			type: String,
			required: false
		},
		items: {
			type: Array,
			required: true
		},
		page: {
			type: Boolean,
			default: false
		}
	},

	render(h) {
		let items = this.items.map(item => {
			let componentName = `print-view-question-${item.type}`;

			return h(componentName, {
				props: {
					...item
				}
			});
		});

		if (this.title)
			items.unshift(h('h1', this.title));

		return h('section', {
			class: {
				page: this.page
			}
		}, items);
	}
};
</script>

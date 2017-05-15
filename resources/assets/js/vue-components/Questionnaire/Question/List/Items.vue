<script>
import TextItem from './TextItem.vue';
import PublicationItem from './PublicationItem.vue';

export default {
	props: {
		items: {
			type: Array,
			required: true
		},
		ordered: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	render(h) {
		let listEl = this.ordered ? 'ol' : 'ul';
		return h(listEl, this.items.map((item, index) => {
			let itemComponent;
			switch(item.type) {
				case 'text':
					itemComponent = 'text-item';
					break;
				case 'publication':
					itemComponent = 'publication-item';
					break;
			}

			return h(itemComponent, {
				props: {
					readonly: this.readonly,
					...item
				},
				on: {
					input: item => {
						let items = Array.slice(this.items);
						items[index] = Object.assign({}, items[index], item);

						this.$emit('change', items);
					},
					remove: () => {
						let items = Array.slice(this.items);
						items.splice(index, 1);

						this.$emit('change', items);
					}
				}
			});
		}));
	},

	components: {
		TextItem,
		PublicationItem
	}
};
</script>

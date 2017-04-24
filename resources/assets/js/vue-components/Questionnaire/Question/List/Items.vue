<script>
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
					change: item => {
						let items = Array.slice(this.items);
						items[index] = Object.assign({}, items[index], item);
						
						this.$emit('change', items);
					}
				}
			});
		}));
	}
};
</script>

<script>
import QuestionnaireInstruction from './Instruction.vue';

export default {
	name: 'questionnaire-section',
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
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	
	render(h) {
		let items = this.items.map((item, index) => {
			let componentName = `question-${item.type}`;
			
			return h(componentName, {
				props: {
					readonly: this.readonly,
					...item
				},
				on: {
					input: item => {
						let items = this.items.slice();
						items[index] = Object.assign({}, items[index], item);
						
						this.$emit('input', {items});
					}
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
	},
	
	components: {
		QuestionnaireInstruction
	}
};
</script>

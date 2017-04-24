<script>
import ChecklistItem from './Item.vue';
import QuestionnaireInstruction from 'vue-components/Questionnaire/Instruction.vue';
import QuestionnaireSection from 'vue-components/Questionnaire/Section.vue';

export default {
	extends: QuestionnaireSection,
	name: 'checklist-section',
	
	render(h) {
		let items = this.items.map((item, index) => {
			let componentName;
			switch (item.type) {
				case 'section':
					componentName = 'checklist-section';
					break;
				case 'instruction':
					componentName = 'questionnaire-instruction';
					break;
				case 'item':
					componentName = 'checklist-item';
					break;
			}
			
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
		ChecklistItem,
		QuestionnaireInstruction
	}
};
</script>

<style scoped>
	section {
		font-size: 0.95em;
		padding: 1em;
		margin: 0.5em;
		border-left: 2px solid rgba(0, 0, 0, 0.15);
	}
	
	section.page {
		border: none;
	}
	
	section h1 {
		font-size: 1.75em;
		margin: 0 0 1em;
	}
	
	@media (min-width: 768px) {
		section {
			padding: 1.5em;
			margin: 1em;
		}
	}
	
	@media (min-width: 1200px) {
		section {
			padding: 2em;
			margin: 2em;
		}
	}
</style>

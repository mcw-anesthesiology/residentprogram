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
		
		return h('section', items);
	},
	
	components: {
		ChecklistItem,
		QuestionnaireInstruction
	}
};
</script>

<style scoped>
	section h1 {
		font-size: 1.5em;
	}
</style>

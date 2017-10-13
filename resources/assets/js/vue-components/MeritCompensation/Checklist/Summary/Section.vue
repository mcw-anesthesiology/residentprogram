<script>
import ChecklistItem from '../Item.vue';
import QuestionnaireInstruction from '@/vue-components/Questionnaire/Instruction.vue';
import QuestionnaireSection from '@/vue-components/Questionnaire/Section.vue';

import { itemIsChecked } from '@/modules/merit-utils.js';

export default {
	extends: QuestionnaireSection,
	name: 'checklist-section',

	props: {
		user: {
			type: Object,
			required: false
		}
	},

	render(h) {
		let items = this.items.filter(item =>
			itemIsChecked(item)
		).map((item, index) => {
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
					user: this.user,
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
	@import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed');

	section {
		font-size: 0.95em;
		padding: 0 1.5em;
		margin: 1.5em 0;
		border-left: 2px solid rgba(0, 0, 0, 0.15);
	}

	section.page {
		margin: 0;
		border: none;
	}

	section h1 {
		font-size: 1.75em;
		font-family: 'Roboto', sans-serif;
		margin: 0 0 1em;
	}

	section.page > h1 {
		font-size: 2.5em;
		font-family: 'Roboto Condensed', sans-serif;
	}

	@media (min-width: 768px) {
		section {
			padding: 0 2.5em;
			margin: 2.5em 0;
		}

		section h1 {
			font-size: 2em;
		}

		section.page > h1 {
			font-size: 3em;
		}
	}

	@media (min-width: 1200px) {
		section {
			padding: 0 4em;
			margin: 4em 0;
		}

		section h1 {
			font-size: 2.25em;
		}

		section.page > h1 {
			font-size: 4em;
		}
	}
</style>

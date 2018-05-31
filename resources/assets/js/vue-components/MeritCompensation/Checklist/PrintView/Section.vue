<script>
import PrintViewChecklistItem from './Item.vue';
import QuestionnairePrintViewSection from '@/vue-components/Questionnaire/PrintView/Section.vue';

import { itemIsChecked } from '@/modules/merit-utils.js';

export default {
	extends: QuestionnairePrintViewSection,
	name: 'print-view-checklist-section',

	render() {
		let items = this.items.filter(item =>
				itemIsChecked(item)
			).map(item => {
			let vnodeData = {props: item};

			switch (item.type) {
				case 'section':
					return <print-view-checklist-section {...vnodeData} />;
				case 'item':
					return <PrintViewChecklistItem {...vnodeData} />;
			}
		});

		return (
			<div class="print-view-checklist-section">
		{
			this.title && (
				<p class="print-view-section-title">{this.title}</p>
			)
		}
				{items}
			</div>
		);
	}
};
</script>

<style scoped>
	.print-view-checklist-section {
		margin: 1em 0.5em;
		padding: 0.5em 0 0.5em 1.5em;
	}
</style>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed');

	div > .print-view-checklist-section {
		margin-top: 1.5em;
	}

	.print-view-checklist-section {
		border-left: none;
	}

	.print-view-checklist-section .print-view-checklist-section {
		border-left: 2px solid #dedede;
	}

	.print-view-checklist-section > .print-view-section-title {
		font-family: 'Roboto', sans-serif;
		color: rgba(0, 0, 0, 0.65);
		font-size: 2em;
	}

	.print-view-checklist-section .print-view-checklist-section > .print-view-item-text {
		font-size: 1.75em;
	}

	.print-view-checklist-section .print-view-checklist-section .print-view-checklist-section > .print-view-item-text {
		font-size: 1.5em;
	}

	.print-view-checklist-item-row {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.print-view-checklist-item-row:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.05);
	}
</style>

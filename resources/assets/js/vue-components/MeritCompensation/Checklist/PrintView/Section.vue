<script>
import PrintViewChecklistItem from './Item.vue';
import QuestionnairePrintViewSection from 'vue-components/Questionnaire/PrintView/Section.vue';

import { itemIsChecked } from 'modules/merit-utils.js';

export default {
	extends: QuestionnairePrintViewSection,
	name: 'print-view-checklist-section',

	render() {
		let items = this.items.filter(item =>
				itemIsChecked(item)
			).map(item => {
			let component;

			let vnodeData = {props: item};

			switch (item.type) {
				case 'section':
					component = <print-view-checklist-section {...vnodeData} />;
					break;
				case 'item':
					component = <PrintViewChecklistItem {...vnodeData} />;
					break;
			}

			return (
				<tr class={`print-view-checklist-${item.type}-row`}>
					<td>
						{component}
					</td>
				</tr>
			);
		});

		return (
			<table class="print-view-checklist-section">
		{
			this.title && (
				<thead>
					<tr>
						<th>{this.title}</th>
					</tr>
				</thead>
			)
		}
				<tbody>
					{items}
				</tbody>
			</table>
		);
	}
};
</script>

<style scoped>
	.print-view-checklist-section thead th,
	.print-view-checklist-section tbody td {
		padding: 0.5em 0 0.5em 1em;
	}

	.print-view-checklist-section {
		margin: 2em 0.5em;
		width: 100%;
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

	.print-view-checklist-section > thead > tr > th {
		font-family: 'Roboto', sans-serif;
		color: rgba(0, 0, 0, 0.65);
		font-size: 2em;
	}

	.print-view-checklist-section .print-view-checklist-section > thead > tr > th {
		font-size: 1.75em;
	}

	.print-view-checklist-section .print-view-checklist-section .print-view-checklist-section > thead > tr > th {
		font-size: 1.5em;
	}

	.print-view-checklist-item-row {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.print-view-checklist-item-row:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.05);
	}
</style>

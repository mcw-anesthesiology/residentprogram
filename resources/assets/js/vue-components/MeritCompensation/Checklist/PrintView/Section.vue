<script>
import PrintViewChecklistItem from './Item.vue';
import QuestionnairePrintViewSection from 'vue-components/Questionnaire/PrintView/Section.vue';

export default {
	extends: QuestionnairePrintViewSection,
	name: 'print-view-checklist-section',

	render() {
		let items = this.items.filter(item =>
				item.type === 'section'
				|| (item.type === 'item' && item.checked)
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
				<tr>
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
</style>

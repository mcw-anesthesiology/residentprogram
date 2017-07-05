<script>
import PrintViewChecklistItem from './Item.vue';
import QuestionnairePrintViewSection from 'vue-components/Questionnaire/PrintView/Section.vue';

export default {
	extends: QuestionnairePrintViewSection,
	name: 'print-view-checklist-section',

	render() {
		const PrintViewChecklistSection = 'print-view-checklist-section';

		let items = this.items.filter(item =>
				item.type === 'section'
				|| (item.type === 'item' && item.checked)
			).map(item => {
			let component;

			switch (item.type) {
				case 'section':
					component = <PrintViewChecklistSection {...item} />;
					break;
				case 'item':
					component = <PrintViewChecklistItem {...item} />;
					break;
			}

			return (
				<tr>
					{component}
				</tr>
			);
		});

		return (
			<table>
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

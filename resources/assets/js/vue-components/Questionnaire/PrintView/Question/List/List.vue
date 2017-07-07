<script>
import { ucfirst, camelCaseToWords } from 'modules/utils.js';

export default {
	props: {
		text: {
			type: String,
			required: false
		},
		ordered: {
			type: Boolean,
			default: false
		},
		items: {
			type: Array,
			required: true
		}
	},

	render() {
		const ListElement = this.ordered ? 'ol' : 'ul';

		const items = this.items.map(item =>
			<li class="print-view-list-item">
			{
				Object.keys(item).filter(prop =>
					!['type', 'labels'].includes(prop)
				).map(prop =>
					<p>
						<b>{ucfirst(camelCaseToWords(prop))}: </b>
						{item[prop]}
					</p>
				)

			}
			</li>
		);

		return (
			<tr class="print-view-question-list">
				<td>
					<p>
						{this.text}
					</p>
					<ListElement>
						{items}
					</ListElement>
				</td>
			</tr>
		);
	}
};
</script>

<style>
	.print-view-question-list td {
		padding-left: 1em;
	}

	@media (min-width: 768px) {
		.print-view-question-list td {
			padding-left: 5em;
		}
	}

	@media (min-width: 1200px) {
		.print-view-question-list td {
			padding-left: 30vw;
		}
	}

	.print-view-list-item {
		padding: 0.25em;
		margin: 0.25em;
		border: 1px solid rgba(0, 0, 0, 0.15);
	}
</style>

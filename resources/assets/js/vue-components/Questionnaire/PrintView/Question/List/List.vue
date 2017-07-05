<template>
	<td>
		<p>
			{{ text }}
		</p>

	</td>
</template>

<script>
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
			Object.keys(item).map(prop =>
				<p>
					<b>{prop}: </b>
					{item[prop]}
				</p>
			)
		);

		return (
			<td>
				<p>
					{this.text}
				</p>
				<ListElement>
					{items}
				</ListElement>
			</td>
		);
	}
};
</script>

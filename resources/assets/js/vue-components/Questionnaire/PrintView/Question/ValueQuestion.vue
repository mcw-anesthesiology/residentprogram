<template>
	<tr>
		<th>{{ text }}</th>
		<td v-html="htmlValue"></td>
	</tr>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true
		},
		value: {
			type: String,
			default: ''
		}
	},

	computed: {
		// This is potentially dangerous, inserting user input as html
		htmlValue() {
			return Array.isArray(this.value)
				? `<ul>
					${this.value.map(item => `<li>${item}</li>`)}
				</ul>`
				: this.value;
		}
	}
};
</script>

<template>
	<tr>
		<th>{{ text }}</th>
		<td>
			<ul v-if="type === 'checkbox'">
				<li v-for="option of checkedOptions">
					{{ option.text }}
				</li>
			</ul>
			<template v-else>
				{{ selectedOptionText }}
			</template>
		</td>
	</tr>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return ['radio', 'checkbox'].includes(type);
			}
		},
		text: {
			type: String,
			required: true
		},
		options: {
			type: Array,
			required: true
		}
	},

	computed: {
		checkedOptions() {
			return this.options.filter(option => option.checked);
		},
		selectedOptionText() {
			return (this.checkedOptions.length > 0)
				? this.checkedOptions[0].text
				: '';
		}
	}
};
</script>

<style scoped>
	th, td {
		padding: 0.5em;
	}

	th {
		padding-left: 1em;
	}

	@media (min-width: 768px) {
		th {
			padding-left: 5em;
		}
	}

	@media (min-width: 1200px) {
		th {
			padding-left: 30vw;
		}
	}
</style>

<template>
	<label>
		<input type="radio" :value="value" :checked="selected" @change="handleChange" :disabled="readonly" :name="name" />
		{{ text }}
	</label>
</template>

<style scoped>
	label {
		display: flex;
		align-items: center;
		margin: 0.5em;
	}

	label input {
		vertical-align: middle;
		margin: 0 0.35em 0 0;
	}
</style>

<script>
export default {
	props: {
		id: String,
		value: Number,
		text: String,
		selected: Boolean,
		readonly: Boolean
	},
	computed: {
		name() {
			return `scenario-option:${this.id}`;
		}
	},
	methods: {
		handleChange(event) {
			if (event.target.checked)
				this.$emit('select');
		}
	}
};
</script>

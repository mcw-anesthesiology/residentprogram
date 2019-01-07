<template>
	<div class="scenario-option form-group">
		<label>
			<input type="radio" :value="value" :checked="selected" @change="handleChange" :disabled="readonly" />
			{{ text }}
		</label>
	</div>
</template>

<script>
export default {
	props: {
		value: Number,
		text: String,
		selected: Boolean,
		readonly: Boolean
	},
	methods: {
		handleChange(event) {
			if (event.target.checked)
				this.$emit('select');
		}
	}
};
</script>

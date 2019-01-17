<template>
	<fieldset>
		<label v-for="option of options"
			:class="{ selected: isSelected(option) }"
		>
			<input type="radio"
				:name="name"
				:value="option.value"
				:checked="isSelected(option)"
				:disabled="readonly"
				@change="handleChange($event, option)"
			/>
			<span class="text">
				{{ option.text }}
			</span>
		</label>
	</fieldset>
</template>

<style scoped>
	fieldset {
		display: flex;
		flex-wrap: wrap;
		background-color: #fafafa;
		border-top: 1px solid #dedede;
		padding: 1em;
	}

	label {
		flex: 1 1 0;
		display: flex;
		align-items: center;
		margin: 1em;
		padding: 1.5em;
		border: 1px solid #ccc;
		border-radius: 2px;
		background-color: white;
		opacity: 0.8;
	}

	label:hover,
	label:focus,
	label.selected {
		opacity: 1;
	}

	label.selected {
		background-color: #f3faff;
	}

	label input {
		vertical-align: middle;
		margin: 0 0.25em 0 0;
	}
</style>

<script>
export default {
	props: {
		value: {
			required: true
		},
		options: {
			type: Array,
			required: true
		},
		name: {
			type: String,
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		isSelected(option) {
			return this.value === option.value;
		},
		handleChange(event, option) {
			if (!this.readonly && event.target.checked) {
				this.$emit('change', option);
			}
		}
	}
};
</script>

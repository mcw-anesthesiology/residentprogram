<template>
	<div v-if="hasSuggestions">
		<select class="form-control" @change="handleInput">
			<option v-for="suggestion of suggestions"
					:key="suggestion"
					:selected="value === suggestion">
				{{ suggestion }}
			</option>
			<option :selected="showOther" value="">Other</option>
		</select>
		<textarea v-if="showOther" class="form-control"
			:value="value"
			:placeholder="placeholder"
			@input="handleInput">
		</textarea>
	</div>
	<textarea v-else class="form-control"
		:value="value"
		:placeholder="placeholder"
		@input="handleInput">
	</textarea>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: ''
		},
		suggestions: {
			type: Array,
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			required: false
		}
	},

	computed: {
		hasSuggestions() {
			return (
				this.suggestions
				&& Array.isArray(this.suggestions)
				&& this.suggestions.length > 0
			);
		},
		showOther() {
			if (!this.hasSuggestions)
				return true;

			return !this.suggestions.includes(this.value);
		}
	},

	methods: {
		handleSelectChange() {

		},
		handleInput(event) {
			this.$emit('input', event.target.value);
		}
	}
};
</script>

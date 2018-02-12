<template>
	<div v-if="hasSuggestions">
		<label class="containing-label">
			{{ label }}
			<select class="form-control"
					:disabled="readonly"
					@change="handleInput">
				<option v-for="suggestion of suggestions"
						:key="suggestion"
						:selected="value === suggestion">
					{{ suggestion }}
				</option>
				<option :selected="showOther" value="">Other</option>
			</select>
		</label>
		<textarea v-if="showOther" class="form-control"
			:value="value"
			:placeholder="placeholder"
			aria-label="Please enter the 'other' value"
			@input="handleInput">
		</textarea>
	</div>
	<label v-else class="containing-label">
		{{ label }}
		<textarea class="form-control"
			:value="value"
			:placeholder="placeholder"
			:readonly="readonly"
			@input="handleInput">
		</textarea>
	</label>
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
		label: {
			type: String,
			default: ''
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
		handleInput(event) {
			if (this.readonly)
				return;

			this.$emit('input', event.target.value);
		}
	}
};
</script>

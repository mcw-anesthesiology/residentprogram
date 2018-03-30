<template>
	<form @submit="handleSubmit">
		<div class="panel panel-info">
			<div class="panel-heading">
				<span class="panel-title">
					Highlighted Question
					- Value editor
				</span>
			</div>
			<div class="panel-body">
				<validated-form-group :errors="errors" prop="value">
					<form-reader-question
						v-bind="question"
						:question-id="question.id"
						:value="value"
						@input="handleInput" />
				</validated-form-group>

				<validated-form-group :errors="errors" prop="highlightedValue">
					<label class="containing-label control-label">
						Highlighted value
						<input type="text" class="form-control"
							v-model="highlightedValue" />
					</label>
				</validated-form-group>
			</div>
			<div class="panel-footer text-right">
				<button type="button" class="btn btn-default btn-sm"
						@click="$emit('close')">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary btn-sm"
						:disabled="!valid">
					Save
				</button>
			</div>
		</div>
	</form>
</template>

<script>
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';
import FormReaderQuestion from '@/vue-components/FormReader/FormReaderQuestion.vue';

export default {
	props: {
		question: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			value: null,
			highlightedValue: null
		};
	},
	computed: {
		errors() {
			const errors = new Map();

			if (!this.value)
				errors.set('value', 'Please select a value');

			if (!this.highlightedValue)
				errors.set('highlightedValue', 'Please enter a highlighted value');

			return errors;
		},
		valid() {
			return this.errors.size === 0;
		},
		option() {
			if (!this.value || !this.question || !this.question.options)
				return;

			return this.question.options.find(o => o.value === this.value);
		}
	},
	watch: {
		option(option, oldOption) {
			if (
				!this.highlightedValue
				|| this.highlightedValue === oldOption.text
			)
				this.highlightedValue = option.text;
		}
	},
	methods: {
		handleInput({ options }) {
			const selectedOption = options.find(o => o.checked);
			if (selectedOption && selectedOption.value)
				this.value = selectedOption.value;
			else
				this.value = null;
		},
		handleSubmit(event) {
			event.preventDefault();

			this.$emit('submit', {
				value: this.value,
				highlighted_value: this.highlightedValue
			});
		}
	},
	components: {
		FormReaderQuestion,
		ValidatedFormGroup
	}
};
</script>

<template>
	<form @submit="handleSubmit">
		<validated-form-group :errors="errors" prop="formId">
			<label class="containing-label">
				Form
				<select-two :options="formGroups"
					v-model.number="formId" />
			</label>
		</validated-form-group>

		<validated-form-group :errors="errors" prop="questionId">
			<label class="containing-label">
				Question
				<select-two :options="questionOptions"
					v-model="questionId" />
			</label>
		</validated-form-group>

		<div class="text-right">
			<button type="button" class="btn btn-default"
					@click="$emit('close')">
				Cancel
			</button>
			<button type="submit" class="btn btn-primary">
				Save
			</button>
		</div>
	</form>
</template>

<script>
import delve from 'dlv';

import SelectTwo from '@/vue-components/SelectTwo.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';

export default {
	props: {
		form_id: {
			type: Number,
			default: null
		},
		question_id: {
			type: String,
			default: null
		},
		forms: {
			type: Array,
			default() {
				return [];
			}
		},
		formGroups: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			formId: this.form_id,
			questionId: this.question_id
		};
	},
	computed: {
		form() {
			if (!this.formId)
				return;

			return this.forms.find(form => form.id === this.formId);
		},
		questions() {
			if (!this.form)
				return;

			return delve(this.form, 'contents.items', [])
				.filter(i => i.type === 'question');
		},
		questionOptions() {
			if (!this.questions)
				return [];

			return this.questions.map(q => ({
				id: q.id,
				text: `${q.id}: ${q.text}`
			}));
		},
		question() {
			if (!this.questions || !this.questionId)
				return;

			return this.questions.find(q => q.id === this.questionId);
		},
		errors() {
			const errors = new Map();

			if (!this.form) {
				errors.set('formId', 'Please select a form');
			} else {
				if (!this.questions)
					errors.set('formId', 'No questions found in the form');
				if (!this.question)
					errors.set('questionId', 'Please select a question');
			}

			return errors;
		},
		valid() {
			return this.errors.size === 0;
		}
	},
	methods: {
		handleSubmit(event) {
			event.preventDefault();

			if (!this.valid)
				return;

			this.$emit('submit', {
				form_id: this.formId,
				question_id: this.questionId
			});
		}
	},
	components: {
		ValidatedFormGroup,
		SelectTwo
	}
};
</script>

<template>
	<section v-if="form">
		<h5>{{ form.title }}</h5>

		<div v-if="question">
			<span>{{ question.id }}</span>
			<span>{{ question.text }}</span>
		</div>
	</section>
</template>

<script>
import delve from 'dlv';

export default {
	props: {
		form_id: {
			type: Number,
			required: false
		},
		question_id: {
			type: String,
			required: false
		},
		values: {
			type: Array,
			required: false
		},
		forms: {
			type: Array,
			required: true,
			default() {
				return [];
			}
		}
	},
	computed: {
		form() {
			if (!this.form_id || !this.forms)
				return;

			return this.forms.find(form => form.id === this.form_id);
		},
		questions() {
			if (!this.form)
				return;

			return delve(this.form, 'contents.items', [])
				.filter(i => i.type === 'question');
		},
		question() {
			if (!this.questions || !this.question_id)
				return;

			return this.questions.find(q => q.id === this.question_id);
		},
	}
};
</script>

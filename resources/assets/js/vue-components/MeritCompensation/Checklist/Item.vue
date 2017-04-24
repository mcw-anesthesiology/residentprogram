<template>
	<div class="checklist-item">
		<label class="containing-label">
			<input type="checkbox" :checked="checked" :disabled="readonly"
				@change="handleCheck" />
							
			<span class="item-text">
				{{ text }}
			</span>
		</label>
		<div v-if="checked" class="item-questions">
			<questionnaire-question v-for="(question, index) of questions"
				:question="question" :readonly="readonly"
				@input="handleQuestionInput(index, arguments[0])" />
		</div>
	</div>
</template>

<script>
import QuestionnaireQuestion from 'vue-components/Questionnaire/Question/Question.vue';

export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'item';
			}
		},
		text: {
			type: String,
			required: true
		},
		checked: {
			type: Boolean,
			default: false
		},
		questions: {
			type: Array,
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	
	methods: {
		handleCheck() {
			let checked = !this.checked;
			let item = {checked};
			
			if (!checked) {
				let questions = this.questions.map(this.clearQuestion);
				item.questions = questions;
			}
			
			this.$emit('input', item);
		},
		handleQuestionInput(index, question) {
			let questions = this.questions.slice();
			questions[index] = Object.assign({}, questions[index], question);
			
			this.$emit('input', {questions});
		},
		clearQuestion(question) {
			question = Object.assign({}, question);
			switch (question.type) {
				case 'text':
				case 'number':
					delete question.value;
					break;
				case 'checkbox':
				case 'radio':
					question.options = question.options.map(option =>
						Object.assign({}, option, {checked: false})
					);
					break;
				case 'list':
					delete question.items;
					break;
			}
			
			return question;
		}
	},
	
	components: {
		QuestionnaireQuestion
	}
};
</script>

<style scoped>
	label {
		display: flex;
		font-size: 1.75em;
	}
	
	input[type="checkbox"] {
		width: 1em;
		height: 1em;
		padding: 0.5em;
		margin-right: 1em;
	}
	
	.item-questions {
		margin-left: 3em;
		padding: 1em;
	}
	
	@media (min-width: 768px) {
		input[type="checkbox"] {
			margin-right: 1.5em;
		}
		
		.item-questions {
			margin-left: 4em;
		}
	}
	
	@media (min-width: 768px) {
		input[type="checkbox"] {
			margin-right: 2em;
		}
		
		.item-questions {
			margin-left: 5em;
		}
	}
</style>

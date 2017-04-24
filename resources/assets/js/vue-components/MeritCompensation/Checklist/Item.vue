<template>
	<div class="checklist-item">
		<div class="checkbox">
			<input type="checkbox" :checked="checked"
				@change="handleCheck" />
		</div>
		<div class="content">
			<div class="item-text">
				{{ text }}
			</div>
			<div v-if="checked" class="item-questions">
				<questionnaire-question v-for="(question, index) of questions"
					:question="question"
					@input="handleQuestionInput(index, arguments[0])" />
			</div>
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

<template>
	<div class="checklist-item">
		<div class="checkbox">
			<input type="checkbox" :checked="selected"
				@change="this.$emit('input', {selected: !selected})" />
		</div>
		<div class="content">
			<div class="item-text">
				{{ text }}
			</div>
			<div v-if="selected" class="item-questions">
				<questionnaire-question v-for="(question, index) of questions"
					:question="question"
					@input="handleQuestionInput(index, arguments[0])" />
			</div>
		</div>
	</div>
</template>

<script>
import QuestionnaireQuestion from 'vue-components/Questionnaire/Question';

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
		selected: {
			type: Boolean,
			default: false
		},
		questions: {
			type: Array,
			required: false
		}
	},
	
	methods: {
		handleQuestionInput(index, question) {
			let questions = this.questions.slice();
			questions[index] = Object.assign({}, questions[index], question);
			
			this.$emit('input', {questions});
		}
	},
	
	components: {
		QuestionnaireQuestion
	}
};
</script>

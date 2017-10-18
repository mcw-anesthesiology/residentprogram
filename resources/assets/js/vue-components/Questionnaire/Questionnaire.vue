<template>
	<div class="questionnaire">
		<h1>{{ title }}</h1>
		<div class="questionnaire-sections">
			<questionnaire-section v-for="(section, index) of sections" :key="index"
				v-show="!section.condition || conditionChecker(section.condition)"
				v-bind="section"
				:condition-checker="conditionChecker"
				@input="handleInput(index, arguments[0])" />
		</div>
	</div>
</template>

<script>
import QuestionnaireSection from './Section.vue';

import {
	getQuestions,
	getConditionChecker
} from '@/modules/questionnaire/index.js';

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		sections: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		questions() {
			return getQuestions(this);
		},
		conditionChecker() {
			return getConditionChecker(this.questions);
		}
	},

	methods: {
		handleInput(index, section) {
			let sections = this.sections.slice();
			sections[index] = Object.assign({}, sections[index], section);

			this.$emit('input', {sections});
		}
	},

	components: {
		QuestionnaireSection
	}
};
</script>

<style>
	.question-description {
		color: rgba(0, 0, 0, 0.65);
	}
</style>

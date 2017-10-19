<template>
	<section class="questionnaire">
		<h1>{{ formTitle }}</h1>
		<div class="questionnaire-sections">
			<questionnaire-section v-for="(section, index) of sections" :key="index"
				v-show="!section.condition || conditionChecker(section.condition)"
				v-bind="section"
				:condition-checker="conditionChecker"
				:show-errors="showErrors"
				:readonly="readonly"
				@input="handleInput(index, arguments[0])" />
		</div>

		<div>
			<show-hide-button class="btn-default" v-model="showErrors">
				error messages
				<template slot="glyph"></template>
			</show-hide-button>
		</div>
	</section>
</template>

<script>
import QuestionnaireSection from './Section.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import {
	getQuestions,
	getConditionChecker
} from '@/modules/questionnaire/index.js';

export default {
	props: {
		formTitle: {
			type: String,
			default: ''
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

	data() {
		return {
			showErrors: false
		};
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
		QuestionnaireSection,
		ShowHideButton
	}
};
</script>

<style>
	.question-description {
		color: rgba(0, 0, 0, 0.65);
	}
</style>

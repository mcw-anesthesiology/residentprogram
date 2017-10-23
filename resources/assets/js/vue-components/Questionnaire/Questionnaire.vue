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
				:help-class="helpClass"
				@input="handleInput(index, arguments[0])" />
		</div>

		<bootstrap-alert v-if="!readonly && !validation.valid"
				type="info">
			<show-hide-button class="btn-default" v-model="showErrors">
				error messages
				<template slot="glyph"></template>
			</show-hide-button>
		</bootstrap-alert>
	</section>
</template>

<script>
import QuestionnaireSection from './Section.vue';
import BootstrapAlert from '@/vue-components/BootstrapAlert.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import {
	getQuestions,
	getConditionChecker
} from '@/modules/questionnaire/index.js';
import { resetUnmetQuestions } from '@/modules/questionnaire/reset.js';
import { questionnaire as validate } from '@/modules/questionnaire/validate.js';

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
		},
		helpClass: {
			type: String,
			required: false
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
		},
		validation() {
			return validate(this);
		}
	},

	methods: {
		handleInput(index, section) {
			let sections = this.sections.slice();
			sections[index] = Object.assign({}, sections[index], section);

			this.$emit('input', resetUnmetQuestions({sections}));
		}
	},

	components: {
		QuestionnaireSection,
		BootstrapAlert,
		ShowHideButton
	}
};
</script>

<style>
	.question-description {
		color: rgba(0, 0, 0, 0.65);
	}
</style>

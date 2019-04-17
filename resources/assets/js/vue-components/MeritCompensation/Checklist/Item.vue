
<template>
	<div class="checklist-item" :class="{checked, readonly, editable: !readonlyToUser}">
		<label class="containing-label">
			<input type="checkbox" :checked="checked" :disabled="readonlyToUser"
				@change="handleCheck" />

			<span class="item-text" v-html="markedUpText"></span>
		</label>
		<div v-if="previewing" class="previewing-info-container">
			<div v-if="hasQuestions && !expandAll" class="text-right">
				<show-hide-button v-model="expanded" class="btn btn-xs btn-default">
					followup questions
				</show-hide-button>
			</div>
			<div v-if="scoring" class="panel panel-default">
				<div class="panel-heading">
					<span class="panel-title">
						Scoring information
					</span>
				</div>
				<table class="table">
					<tbody>
						<tr v-for="(val, key) of scoring">
							<th>{{ ucfirst(key) }}</th>
							<td>{{ val }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-if="(checked || expanded || expandAll) && hasQuestions" class="item-questions">
			<questionnaire-question v-for="(question, index) of questions"
				:key="index"
				:question="question"
				:readonly="readonlyToUser"
				:previewing="previewing"
				:showErrors="showErrors"
				@input="handleQuestionInput(index, arguments[0])" />
		</div>
	</div>
</template>

<style>
.checklist-item.readonly .control-label {
	color: rgba(0, 0, 0, 0.5);
}

.checklist-item.readonly .input-group-addon {
	color: #555;
	background-color: #eee;
	border-color: #ccc;
}
</style>

<script>
import QuestionnaireQuestion from '@/vue-components/Questionnaire/Question/Question.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import snarkdown from 'snarkdown';

import { ucfirst } from '@/modules/utils.js';

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
		},
		subjectReadonly: {
			type: Boolean,
			default: false
		},
		user: {
			type: Object,
			required: false
		},
		showErrors: {
			type: Boolean,
			default: false
		},
		previewing: {
			type: Boolean,
			default: false
		},
		scoring: {
			type: Object,
			required: false
		}
	},
	data() {
		return {
			expanded: false
		};
	},

	computed: {
		expandAll() {
			return (
				this.$route
				&& this.$route.query
				&& this.$route.query.expandAll
			);
		},
		hasQuestions() {
			return this.questions && this.questions.length > 0;
		},
		markedUpText() {
			return snarkdown(this.text);
		},
		readonlyToUser() {
			return this.readonly || (
				this.subjectReadonly && (
					!this.user || this.user.type !== 'admin'
				)
			);
		}
	},

	methods: {
		ucfirst,
		handleCheck() {
			if (this.readonlyToUser)
				return;

			let checked = !this.checked;
			let item = {checked};

			if (!checked && this.questions) {
				let questions = this.questions.map(this.clearQuestion);
				item.questions = questions;
			}

			this.$emit('input', item);
		},
		handleQuestionInput(index, question) {
			if (this.readonlyToUser)
				return;

			let questions = this.questions.slice();
			questions[index] = Object.assign({}, questions[index], question);

			this.$emit('input', {questions});
		},
		clearQuestion(question) {
			if (this.readonlyToUser)
				return;

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
		QuestionnaireQuestion,
		ShowHideButton
	}
};
</script>

<style scoped>
	.checklist-item {
		padding-bottom: 0.25em;
		margin-bottom: 0.75em;
		border-bottom: 1px solid transparent;
		color: rgba(0, 0, 0, 0.5);
		page-break-inside: avoid;
	}

	.checklist-item:hover {
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	}

	.checklist-item.editable:hover {
		color: rgba(0, 0, 0, 0.95);
	}

	.checklist-item.checked {
		color: rgba(0, 0, 0, 0.85);
	}

	label {
		display: flex;
		font-size: 1.25em;
	}

	input[type="checkbox"] {
		width: 1em;
		height: 1em;
		margin-right: 1em;
		flex-shrink: 0;
	}

	.item-text {
		font-weight: normal;
	}

	.item-questions {
		margin-left: 1em;
		padding: 1em;
	}

	.previewing-info-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	@media (min-width: 768px) {
		label {
			font-size: 1.35em;
		}

		input[type="checkbox"] {
			margin-right: 1.5em;
		}

		.item-questions {
			margin-left: 4em;
		}
	}

	@media (min-width: 1200px) {
		label {
			font-size: 1.5em;
		}

		input[type="checkbox"] {
			margin-right: 2em;
		}

		.item-questions {
			margin-left: 5em;
		}
	}
</style>

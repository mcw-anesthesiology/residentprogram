<template>
	<section class="highlighted-question component-list-item">
		<h2>{{ highlight_name }}</h2>

		<div>
			<highlighted-question-editor v-if="show.editor"
				:highlight_name="highlight_name"
				@close="show.editor = false"
				@submit="handleUpdate" />
			<button v-else type="button" class="btn btn-info"
					@click="show.editor = true">
				<span class="glyphicon glyphicon-pencil"></span>
				Edit
			</button>

			<div class="questions-container panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title">Questions</h3>
				</div>
				<div class="panel-body">
					<div class="question-editor-container">
						<hqq-editor v-if="show.questionEditor"
							:forms="forms"
							:form-groups="formGroups"
							@close="show.questionEditor = false"
							@submit="handleQuestionAdd" />
						<button v-else type="button" class="btn btn-success btn-sm"
								@click="show.questionEditor = true">
							<span class="glyphicon glyphicon-plus"></span>
							Add
						</button>
					</div>

					<ul v-if="questions && questions.length"
							class="highlighted-question-questions list-group">
						<highlighted-question-question v-for="question of questions"
							:key="question.id"
							v-bind="question"
							:forms="forms"
							:form-groups="formGroups"
							@update="handleQuestionUpdate(question.id, ...arguments)"
							@alert="$emit('alert', ...arguments)" />
					</ul>
				</div>
			</div>
		</div>

		<alert-list v-model="alerts" />
	</section>
</template>

<style scoped>
	.highlighted-question {
		padding: 1.5em;
	}

	.questions-container {
		margin: 1em 0;
	}

	.questions-container .panel-body {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.questions-container .panel-body > * {
		flex-basis: calc(50% - 2em);
		margin: 0 1em;
		min-width: 300px;
		max-width: 100%;
	}
</style>

<script>
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import HighlightedQuestionEditor from './HighlightedQuestionEditor.vue';
import HighlightedQuestionQuestion from './HighlightedQuestionQuestion.vue';
import HqqEditor from './HighlightedQuestionQuestionEditor.vue';

import { emitError } from '@/modules/errors.js';
import { fetchConfig, okOrThrow, jsonOrThrow } from '@/modules/utils.js';

export default {
	mixins: [ HasAlerts ],
	props: {
		id: {
			type: Number,
			required: true
		},
		highlight_name: {
			type: String,
			required: true
		},
		questions: {
			type: Array,
			default() {
				return [];
			}
		},
		forms: {
			type: Array,
			required: false
		},
		formGroups: {
			type: Array,
			required: false
		}
	},
	data() {
		return {
			show: {
				editor: false,
				questionEditor: false
			}
		};
	},
	methods: {
		handleUpdate(changes) {
			fetch(`/highlighted-questions/${this.id}`, {
				...fetchConfig(),
				method: 'POST', // PATCH
				body: JSON.stringify({
					_method: 'PATCH',
					...changes
				})
			}).then(okOrThrow).then(() => {
				this.$emit('update', changes);
				this.show.editor = false;
			}).catch(err => {
				emitError(
					err,
					this,
					'There was a problem updating the highlighted question'
				);
			});
		},
		handleQuestionAdd(data) {
			fetch('/highlighted-questions-questions', {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					highlighted_question_id: this.id,
					...data
				})
			}).then(jsonOrThrow).then(question => {
				this.$emit('update', {
					questions: this.questions.concat(question)
				});
				this.show.questionEditor = false;
			}).catch(err => {
				emitError(
					err,
					this,
					'There was a problem adding the question'
				);
			});
		},
		handleQuestionUpdate(id, changes) {
			this.$emit('update', {
				questions: this.questions.map(question =>
					question.id === id
						? Object.assign({}, question, changes)
						: question
				)
			});
		}
	},
	components: {
		HighlightedQuestionEditor,
		HighlightedQuestionQuestion,
		HqqEditor
	}
};
</script>

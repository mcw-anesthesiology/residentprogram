<template>
	<li v-if="form" class="list-group-item">
		<dl>
			<dt>
				Form
			</dt>
			<dd>
				{{ form.title }}
			</dd>
			<dd>
				<a :href="`/manage/forms/${form.id}`" target="_blank">
					View form
				</a>
			</dd>
			<dt>
				Question
			</dt>
			<dd class="question-id">
				{{ question.id }}
			</dd>
			<dd>
				{{ question.text }}
			</dd>
		</dl>

		<div class="panel panel-default" v-if="values">
			<div class="panel-heading">
				<span class="panel-title">Values</span>
			</div>
			<div class="panel-body">
				<hqq-value v-for="value of values" :key="value.id"
					v-bind="value"
					@delete="handleValueDelete(value.id)" />
			</div>
			<div class="panel-footer">
				<hqq-value-editor v-if="show.valueEditor"
					:question="question"
					@close="show.valueEditor = false"
					@submit="handleValueAdd" />
				<button v-else type="button" class="btn btn-info btn-sm"
						@click="show.valueEditor = true">
					Add value
				</button>

				<button type="button" class="btn btn-warning btn-sm"
						@click="handleAddOptionValues">
					Add option text values
				</button>
			</div>
		</div>

		<div class="question-editor-container">
			<hqq-editor v-if="show.questionEditor"
				:form_id="form_id"
				:question_id="question_id"
				:forms="forms"
				:form-groups="formGroups"
				@close="show.questionEditor = false"
				@submit="handleQuestionEdit" />
			<button v-else type="button" class="btn btn-info btn-sm"
					@click="show.questionEditor = true">
				<span class="glyphicon glyphicon-pencil"></span>
				Edit
			</button>
		</div>
	</li>
</template>

<style scoped>
	dt {
		font-weight: bold;
	}

	dt:not(:first-child) {
		margin-top: 1em;
	}

	dd {
		display: inline-block;
		margin-left: 1em;
	}

	.question-id {
		text-transform: uppercase;
	}
</style>

<script>
import delve from 'dlv';

import HqqEditor from './HighlightedQuestionQuestionEditor.vue';
import HqqValue from './HighlightedQuestionQuestionValue.vue';
import HqqValueEditor from './HighlightedQuestionQuestionValueEditor.vue';

import { emitError } from '@/modules/errors.js';
import { fetchConfig, okOrThrow, jsonOrThrow } from '@/modules/utils.js';

export default {
	props: {
		id: {
			type: Number,
			required: true
		},
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
			show: {
				questionEditor: false,
				valueEditor: false
			}
		};
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
		}
	},
	methods: {
		handleQuestionEdit(changes) {
			fetch(`/highlighted-questions-questions/${this.id}`, {
				...fetchConfig(),
				method: 'POST', // PATCH
				body: JSON.stringify({
					_method: 'PATCH',
					...changes
				})
			}).then(okOrThrow).then(() => {
				this.$emit('update', changes);
				this.show.questionEditor = false;
			}).catch(err => {
				emitError(
					err,
					this,
					"There was a problem editing the highlighted question's question"
				);
			});
		},
		handleValueAdd(value) {
			fetch('/highlighted-questions-values', {
				...fetchConfig(),
				method: 'POST',
				body: JSON.stringify({
					highlighted_question_question_id: this.id,
					...value
				})
			}).then(jsonOrThrow).then(value => {
				this.$emit('update', {
					values: this.values.concat(value)
				});
				this.show.valueEditor = false;
			}).catch(err => {
				emitError(
					err,
					this,
					'There was a problem adding the value'
				);
			});
		},
		handleAddOptionValues() {
			if (!this.question || !this.question.options)
				return;

			for (const option of this.question.options) {
				this.handleValueAdd({
					value: option.value,
					highlighted_value: option.text
				});
			}
		},
		handleValueDelete(id) {
			this.$emit('update', {
				values: this.values.filter(v => v.id !== id)
			});
		}
	},
	components: {
		HqqEditor,
		HqqValue,
		HqqValueEditor
	}
};
</script>

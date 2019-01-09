import Vue from '@/vue-constructors/vue.js';

import HighlightedQuestion from '@/vue-components/Manage/HighlightedQuestions/HighlightedQuestion.vue';
import HighlightedQuestionEditor from '@/vue-components/Manage/HighlightedQuestions/HighlightedQuestionEditor.vue';

import ComponentList from '@/vue-components/ComponentList.vue';

import { handleError } from '@/modules/errors.js';
import {
	fetchConfig,
	jsonOrThrow,
	groupForms
} from '@/modules/utils.js';

export default function createManageHighlightedQuestions(el, propsData) {
	return new Vue({
		el,
		props: {

		},
		propsData,
		data() {
			return {
				highlightedQuestions: null,
				forms: null,
				formGroups: null,

				show: {
					editor: false
				}
			};
		},
		mounted() {
			this.fetchHighlightedQuestions();
			this.fetchForms();
		},
		methods: {
			fetchHighlightedQuestions() {
				const query = $.param({
					with: {
						questions: true,
						'questions.values': true
					}
				});

				fetch(`/highlighted-questions?${query}`, {
					...fetchConfig()
				}).then(jsonOrThrow).then(highlightedQuestions => {
					this.highlightedQuestions = highlightedQuestions;
				}).catch(err => {
					handleError(
						err,
						this,
						'There was a problem fetching highlighted questions'
					);
				});
			},
			fetchForms() {
				const query = $.param({
					revealing: ['contents']
				});

				fetch(`/forms?${query}`, {
					...fetchConfig()
				}).then(jsonOrThrow).then(forms => {
					this.forms = forms;
					this.formGroups = groupForms(forms);
				}).catch(err => {
					handleError(
						err,
						this,
						'There was a problem fetching form groups'
					);
				});
			},
			handleAdd(values) {
				fetch('/highlighted-questions', {
					...fetchConfig(),
					method: 'POST',
					body: JSON.stringify(values)
				}).then(jsonOrThrow).then(newHq => {
					this.highlightedQuestions = this.highlightedQuestions.concat(newHq);
					this.show.editor = false;
				}).catch(err => {
					handleError(
						err,
						this,
						'There was a problem adding the new highlighted question'
					);
				});
			},
			handleUpdate(id, changes) {
				this.highlightedQuestions = this.highlightedQuestions.map(hq =>
					hq.id === id
						? Object.assign({}, hq, changes)
						: hq
				);
			}
		},
		components: {
			HighlightedQuestion,
			HighlightedQuestionEditor,
			ComponentList
		}
	});
}

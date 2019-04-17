<template>
	<div class="checklist">
		<h1>{{ title }}</h1>
		<submission-confirmation v-if="submitting"
			:pages="pages"
			@submit="handleConfirmSubmit"
			@save="handleSave"
			@cancel="handleConfirmationCancel" />
		<template v-else>
			<div v-if="dontPaginate" class="pages">
				<checklist-section v-for="(page, pageNum) of pages"
					:key="`page-${pageNum}`"
					v-bind="page"
					:page="true"
					:readonly="readonly"
					:previewing="previewing"
					:user="user"
					:show-errors="showErrors"
					@input="handleInput(pageNum, arguments[0])" />
			</div>
			<questionnaire-pager v-else
					:pages="pages"
					:readonly="readonly"
					@submit="handleSubmit">
				<template slot="header" slot-scope="pager">
					<div class="text-right">
						<show-hide-button class="btn btn-info btn-sm"
								:value="showErrors"
								@input="handleChangeShowErrors">
							checklist validation
							<span slot="glyph" class="glyphicon glyphicon-ok"></span>
						</show-hide-button>
					</div>
					<checklist-errors v-if="showErrors"
						:pages="pager.pages"
						:page="pager.pageNum"
						@navigate="pager.goToPage" />
				</template>
				<template slot-scope="pager">
					<section-errors v-if="showErrors" :page="pager.page" />
					<transition :name="`checklist-pager-${pager.lastChange}`">
						<checklist-section
							:key="`page-${pager.pageNum}`"
							v-bind="pager.page" :page="true"
							:readonly="readonly" :user="user"
							:previewing="previewing"
							:show-errors="showErrors"
							@input="handleInput(pager.pageNum, arguments[0])" />
					</transition>
					<section-errors v-if="showErrors" :page="pager.page" />
				</template>
			</questionnaire-pager>

			<div class="checklist-controls">
				<div v-if="dontPaginate">
					<div class="text-right">
						<show-hide-button class="btn btn-info btn-sm"
								v-model="showErrors">
							checklist validation
							<span slot="glyph" class="glyphicon glyphicon-ok"></span>
						</show-hide-button>
					</div>
					<checklist-errors v-if="showErrors"
						:pages="pages"
						@navigate="goToPage" />
				</div>

				<div class="text-center">
					<confirmation-button v-if="!readonly && unsaved" class="btn btn-default"
							pressed-class="btn btn-warning"
							:disabled="saving"
							@click="handleClose">
						Close
						<template slot="pressed">
							Yes, close without saving
						</template>
					</confirmation-button>
					<button type="button" v-else class="btn btn-default"
							:disabled="saving"
							@click="handleClose">
						Close
					</button>

					<button v-if="!readonly" type="button" class="btn btn-info"
							:disabled="saving || saveSuccessful"
							@click="handleSave">
						<template v-if="saveSuccessful">
							<span class="glyphicon glyphicon-saved"></span>
							Saved!
						</template>
						<template v-else>
							Save
						</template>
					</button>

					<button v-if="!readonly" type="button"
							class="btn btn-primary"
							pressed-class="btn-success"
							:disabled="saving"
							@click="handleSubmit">
						Submit
					</button>
				</div>

				<div class="dont-paginate-container text-center">
					<label class="normal-text-label">
						<input type="checkbox" :checked="dontPaginate"
							@change="togglePagination" />
						Show on one page
					</label>
					<label class="normal-text-label">
						<input type="checkbox" :checked="expandAll"
							@change="toggleQueryProp('expandAll')" />
						Expand all followup questions
					</label>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import ChecklistSection from './Section.vue';
import SectionErrors from './SectionErrors.vue';
import ChecklistErrors from './ChecklistErrors.vue';
import SubmissionConfirmation from './SubmissionConfirmation.vue';
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import QuestionnairePager from '@/vue-components/Questionnaire/Pager.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import { checklistIsValid } from '@/modules/merit-utils.js';

export default {
	props: {
		title: {
			type: String,
			required: false
		},
		pages: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		},
		user: {
			type: Object,
			required: false
		},
		previewing: {
			type: Boolean,
			default: false
		},
		unsaved: {
			type: Boolean,
			required: false
		},
		saving: {
			type: Boolean,
			required: false
		},
		saveSuccessful: {
			type: Boolean,
			required: false
		}
	},

	computed: {
		submitting() {
			return (
				this.$route
				&& this.$route.query
				&& this.$route.query.page === 'submit'
			);
		},
		expandAll() {
			return (
				this.$route
				&& this.$route.query
				&& this.$route.query.expandAll
			);
		},
		dontPaginate() {
			return (
				this.$route
				&& this.$route.query
				&& this.$route.query.dontPaginate
			);
		},
		showErrors() {
			return Boolean(
				this.$route
				&& this.$route.query
				&& this.$route.query.showErrors
			);
		}
	},

	methods: {
		checklistIsValid,
		toggleQueryProp(prop) {
			const newVal = !this[prop] || undefined;
			const location = Object.assign({}, this.$route, {
				query: {
					...this.$route.query,
					[prop]: newVal
				}
			});

			this.$router.push(location);
		},
		togglePagination() {
			const dontPaginate = !this.dontPaginate || undefined;
			const location = Object.assign({}, this.$route, {
				query: {
					...this.$route.query,
					dontPaginate,
					page: undefined
				}
			});

			this.$router.push(location);
		},
		goToPage(pageNum) {
			if (!this.dontPaginate)
				return;

			$('.pages > section').eq(pageNum).velocity('scroll');
		},
		handleChangeShowErrors(showErrors) {
			const query = Object.assign({}, this.$route.query, { showErrors });
			const location = Object.assign({}, this.$route, { query });

			this.$router.push(location);
		},
		handleInput(pageNum, page) {
			let pages = this.pages.slice();
			pages[pageNum] = Object.assign({}, pages[pageNum], page);

			this.$emit('input', {pages});
		},
		handleSave() {
			this.$emit('save');
		},
		handleSubmit() {
			const location = Object.assign({}, this.$route, { query: { page: 'submit' } });
			this.$router.push(location);
		},
		handleConfirmSubmit() {
			this.$emit('submit');
		},
		handleConfirmationCancel() {
			const location = Object.assign({}, this.$route, { query: { page: 0 } });
			this.$router.push(location);
		},
		handleClose() {
			this.$emit('close');
		}
	},

	components: {
		ChecklistSection,
		SectionErrors,
		ChecklistErrors,
		SubmissionConfirmation,
		ConfirmationButton,
		QuestionnairePager,
		ShowHideButton
	}
};
</script>

<style scoped>
	.checklist {
		font-size: 1.25em;
	}

	@media (min-width: 768px) {
		.checklist {
			padding: 0 1em;
		}
	}

	@media (min-width: 1200px) {
		.checklist {
			padding: 0 2em;
		}
	}

	.pages > .page {
		margin-bottom: 6em;
	}

	.checklist-pager-forward-enter-active,
	.checklist-pager-back-enter-active {
		transition: all 0.1s ease-out;
	}

	.checklist-pager-forward-leave-active,
	.checklist-pager-back-leave-active {
		transition: all 0.1s ease-out;
	}

	.checklist-pager-forward-enter, .checklist-pager-forward-leave-to {
		transform: translateX(-10px);
		opacity: 0;
	}

	.checklist-pager-back-enter, .checklist-pager-back-leave-to {
		transform: translateX(10px);
		opacity: 0;
	}

	.dont-paginate-container {
		margin-top: 2em;
	}

	@media print {
		.checklist {
			padding: 0 !important;
		}

		.checklist-controls {
			display: none;
		}
	}
</style>

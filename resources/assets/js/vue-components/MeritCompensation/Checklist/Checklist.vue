<template>
	<div class="checklist">
		<h1>{{ title }}</h1>
		<div v-if="dontPaginate" class="pages">
			<checklist-section v-for="(page, pageNum) of pages"
				:key="`page-${pageNum}`"
				v-bind="page"
				:page="true"
				:readonly="readonly"
				:user="user"
				:show-errors="show.errors"
				@input="handleInput(pageNum, arguments[0])" />
		</div>
		<questionnaire-pager v-else
				:pages="pages"
				:readonly="readonly"
				:checklist-validator="checklistIsValid"
				@submit="handleSubmit">
			<template slot="header" slot-scope="pager">
				<div class="text-right">
					<show-hide-button class="btn btn-info btn-sm"
							v-model="show.errors">
						checklist validation
						<span slot="glyph" class="glyphicon glyphicon-ok"></span>
					</show-hide-button>
				</div>
				<checklist-errors v-if="show.errors"
					:pages="pager.pages"
					@navigate="pager.goToPage" />
			</template>
			<template slot-scope="pager">
				<section-errors v-if="show.errors" :page="pager.page" />
				<transition :name="`checklist-pager-${pager.lastChange}`">
					<checklist-section :key="`page-${pager.pageNum}`"
						v-bind="pager.page" :page="true"
						:readonly="readonly" :user="user"
						:show-errors="show.errors"
						@input="handleInput(pager.pageNum, arguments[0])" />
				</transition>
				<section-errors v-if="show.errors" :page="pager.page" />
			</template>
		</questionnaire-pager>

		<div class="checklist-controls">
			<div v-if="dontPaginate">
				<div class="text-right">
					<show-hide-button class="btn btn-info btn-sm"
							v-model="show.errors">
						checklist validation
						<span slot="glyph" class="glyphicon glyphicon-ok"></span>
					</show-hide-button>
				</div>
				<checklist-errors v-if="show.errors"
					:pages="pages"
					@navigate="goToPage" />
			</div>

			<div class="text-center">
				<button type="button" v-if="readonly" class="btn btn-default"
						@click="handleClose">
					Close
				</button>
				<confirmation-button v-else class="btn btn-default"
						pressed-class="btn btn-warning" @click="handleClose">
					Close
					<template slot="pressed">
						Yes, close without saving
					</template>
				</confirmation-button>

				<button v-if="!readonly" type="button" class="btn btn-info"
						@click="handleSave">
					Save and close
				</button>

				<confirmation-button v-if="dontPaginate && !readonly"
						class="btn btn-primary"
						pressed-class="btn-success"
						:disabled="!checklistIsValid({pages})"
						@click="handleSubmit">
					Submit
					<template slot="pressed">
						Confirm submission
					</template>
				</confirmation-button>
			</div>

			<div class="dont-paginate-container text-center">
				<label class="normal-text-label">
					<input type="checkbox" :value="dontPaginate"
						@change="togglePagination" />
					Show on one page
				</label>
			</div>
		</div>
	</div>
</template>

<script>
import ChecklistSection from './Section.vue';
import SectionErrors from './SectionErrors.vue';
import ChecklistErrors from './ChecklistErrors.vue';
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import QuestionnairePager from '@/vue-components/Questionnaire/Pager.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import { checklistIsValid } from '@/modules/merit-utils.js';
import { getHeaderHeight } from '@/modules/dom-utils.js';

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
		}
	},
	data() {
		return {
			show: {
				errors: false
			}
		};
	},

	computed: {
		dontPaginate() {
			return (
				this.$route
				&& this.$route.query
				&& this.$route.query.dontPaginate
			);
		}
	},

	methods: {
		checklistIsValid,
		togglePagination() {
			const dontPaginate = !this.dontPaginate || undefined;
			const location = Object.assign({}, this.$route, {
				query: { dontPaginate, page: undefined }
			});

			this.$router.push(location);
		},
		goToPage(pageNum) {
			if (!this.dontPaginate)
				return;

			$('.pages > section').eq(pageNum).velocity('scroll', {
				offset: -1 * getHeaderHeight()
			});
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
			this.$emit('submit');
		},
		handleClose() {
			this.$emit('close');
		}
	},

	components: {
		ChecklistSection,
		SectionErrors,
		ChecklistErrors,
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

<template>
	<div class="checklist">
		<h1>{{ title }}</h1>
		<questionnaire-pager :pages="pages" :readonly="readonly"
				:checklist-validator="checklistIsValid"
				@submit="handleSubmit">
			<template slot="header" scope="pager">
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
			<template scope="pager">
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

export default {
	props: {
		title: {
			type: String,
			required: true
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

	methods: {
		checklistIsValid,
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
</style>

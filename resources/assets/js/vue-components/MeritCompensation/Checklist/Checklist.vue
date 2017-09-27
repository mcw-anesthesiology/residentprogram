<template>
	<div class="checklist">
		<h1>{{ title }}</h1>
		<questionnaire-pager :pages="pages" :readonly="readonly"
				:page-validator="validatePage"
				@submit="handleSubmit">
			<template scope="pager">
				<transition :name="`checklist-pager-${pager.lastChange}`">
					<checklist-section :key="`page-${pager.pageNum}`"
						v-bind="pager.page" :page="true"
						:readonly="readonly" :user="user"
						@input="handleInput(pager.pageNum, arguments[0])" />
				</transition>
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
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';
import QuestionnairePager from 'vue-components/Questionnaire/Pager.vue';

import { sectionIsValid } from 'modules/merit-utils.js';

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

	methods: {
		validatePage(page) {
			return sectionIsValid(page);
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
		ConfirmationButton,
		QuestionnairePager
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

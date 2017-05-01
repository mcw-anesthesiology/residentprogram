<template>
	<div class="checklist">
		<h1>{{ title }}</h1>
		<questionnaire-pager :pages="pages" :readonly="readonly"
				@submit="handleSubmit">
			<template scope="pager">
				<checklist-section v-bind="pager.page" :page="true"
					:readonly="readonly"
					@input="handleInput(pager.pageNum, arguments[0])" />
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
			
			<button type="button" class="btn btn-info"
					@click="handleSave">
				Save progress
			</button>			
		</div>
	</div>
</template>

<script>
import ChecklistSection from './Section.vue';
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';
import QuestionnairePager from 'vue-components/Questionnaire/Pager.vue';

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
		}
	},
	
	methods: {
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
</style>

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
	</div>
</template>

<script>
import ChecklistSection from './Section.vue';
import QuestionnairePager from 'vue-components/Questionnaire/Pager.vue';

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		version: {
			type: Number,
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
		handleSubmit() {
			this.$emit('submit');
		}
	},
	
	components: {
		ChecklistSection,
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

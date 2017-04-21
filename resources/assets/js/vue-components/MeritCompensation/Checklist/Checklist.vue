<template>
	<div class="checklist">
		<h1>{{ title }}</h1>
		<questionnaire-pager :pages="pages" @submit="handleSubmit">
			<template scope="pager">
				<checklist-section v-bind="pager.page"
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
		}
	},
	
	methods: {
		handleInput(pageNum, page) {
			let pages = this.pages.slice();
			pages[pageNum] = Object.assign({}, pages[pageNum], page);
			
			this.$emit('input', {pages});
		},
		handleSubmit() {
			// TODO
			console.log('SUBMIT!');
			console.log(JSON.stringify({
				title: this.title,
				version: this.version,
				pages: this.pages
			}, null, 4));
		}
	},
	
	components: {
		ChecklistSection,
		QuestionnairePager
	}
};
</script>

<template>
	<div>
		<div v-if="!checklistValidation.valid" class="submit-container">
			<p>
				There are errors in the checklist preventing you from completing your checklist now. Please resolve them, or save your checklist to return to it later.
			</p>
			<checklist-errors :pages="pages" @navigate="goToPage" />
		</div>
		<div v-else class="submit-container">
			<p>
				Submitting your checklist will mark it as complete, preventing you from making changes in the future. If you want to return to your checklist to make changes later, please instead save your progress using the second button below.
			</p>
			<p>
				If you would like your checklist reopened for edits after it has been submitted, please just let me know at
				<a :href="`mailto:${ADMIN_EMAIL}`">{{ ADMIN_EMAIL }}</a>.
			</p>
		</div>
		<div class="buttons-container">
			<button v-if="checklistValidation.valid" type="button"
					class="btn btn-lg btn-primary"
					@click="$emit('submit')">
				<span class="glyphicon glyphicon-saved"></span>
				Complete and submit checklist
			</button>
			<button type="button" class="btn btn-info btn-lg"
					@click="$emit('save')">
				<span class="glyphicon glyphicon-save"></span>
				Save checklist progress
			</button>
			<button type="button" class="btn btn-default btn-lg"
					@click="$emit('cancel')">
				<span class="glyphicon glyphicon-list"></span>
				Return to the checklist
			</button>
		</div>
	</div>
</template>

<script>
import ChecklistErrors from './ChecklistErrors.vue';
import { checklist as validateChecklist, flattenErrors } from '@/modules/merits/validate.js';

import { ADMIN_EMAIL } from '@/modules/constants.js';

export default {
	props: {
		pages: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			ADMIN_EMAIL
		};
	},
	computed: {
		checklistValidation() {
			return validateChecklist({pages: this.pages});
		},
		flatErrors() {
			return flattenErrors(this.checklistValidation.errors);
		}
	},
	methods: {
		goToPage(page) {
			page = page + 1;
			const location = Object.assign({}, this.$route, { query: { page, showErrors: true }});
			this.$router.push(location);
		}
	},
	components: {
		ChecklistErrors
	}
};
</script>

<style scoped>
	.submit-container {
		margin: 1em;
	}

	.buttons-container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		margin: 1em auto;
	}

	.buttons-container > * {
		margin: 0.75em;
	}

	@media (min-width: 768px) {
		p {
			font-size: 1.5em;
			margin-bottom: 2em;
		}

		.submit-container {
			margin: 3em;
		}

		.buttons-container {
			padding: 0 25%;
		}
	}

	@media (min-width: 1200px) {
		.buttons-container {
			padding: 0 30%;
		}
	}
</style>

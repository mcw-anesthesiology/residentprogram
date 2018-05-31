<template>
	<div class="print-view-checklist-item">
		<span class="glyphicon glyphicon-ok"></span>
		<div class="item-contents">
			<p class="print-view-item-text" v-html="markedUpText"></p>
			<div class="item-questions">
				<print-view-question v-for="(question, index) of questions" :key="index"
					:question="question" />
			</div>
		</div>
	</div>
</template>

<script>
import PrintViewQuestion from '@/vue-components/Questionnaire/PrintView/Question/Question.vue';

import snarkdown from 'snarkdown';

export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'item';
			}
		},
		text: {
			type: String,
			required: true
		},
		questions: {
			type: Array,
			required: false
		}
	},

	computed: {
		markedUpText() {
			return snarkdown(this.text);
		}
	},

	components: {
		PrintViewQuestion
	}
};
</script>

<style scoped>
	.print-view-checklist-item {
		margin-left: 1em;
		display: flex;
		flex-direction: row;
	}

	.print-view-checklist-item:not(:first-child) {
		margin-top: 0.5em;
	}

	.glyphicon.glyphicon-ok {
		font-size: 1.25em;
		vertical-align: top;
		color: rgba(0, 0, 0, 0.5);
	}

	.item-contents {
		flex-grow: 1;
		display: inline-block;
		margin-left: 1em;
	}

	.print-view-item-text {
		font-size: 1.15em;
		font-weight: normal;
		margin: 0;
	}

	.item-questions {
		margin-left: 1em;
		font-size: 0.85em;
	}
</style>


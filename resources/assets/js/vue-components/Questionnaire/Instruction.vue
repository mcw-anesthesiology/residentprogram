<template>
	<div class="instruction-block" v-html="markedUpText"></div>
</template>

<script>
import { Parser as CommonmarkParser, HtmlRenderer } from 'commonmark';

const reader = new CommonmarkParser();
const writer = new HtmlRenderer();

export default {
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'instruction';
			}
		},
		text: {
			type: String,
			required: true
		}
	},

	computed: {
		markedUpText() {
			return writer.render(reader.parse(this.text));
		}
	}
};
</script>

<style scoped>
	.instruction-block {
		margin: 1em;
		padding: 1em;
		font-size: 1.25em;
	}
</style>

<style>
	.instruction-block p {
		margin-bottom: 1.5em;
	}
</style>

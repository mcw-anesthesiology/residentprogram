<template>
	<div v-html="html"></div>
</template>

<script>
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default {
	props: {
		md: {
			type: String,
			required: true
		}
	},
	computed: {
		html() {
			return md.render(this.md);
		}
	}
};
</script>

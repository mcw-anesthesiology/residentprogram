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
		},
		replacements: {
			type: Map,
			required: false
		}
	},
	computed: {
		markdown() {
			let md = this.md;

			if (this.replacements) {
				for (const [pattern, replacement] of this.replacements.entries()) {
					md = md.replace(pattern, replacement);
				}
			}

			return md;
		},
		html() {
			return md.render(this.markdown);
		}
	}
};
</script>

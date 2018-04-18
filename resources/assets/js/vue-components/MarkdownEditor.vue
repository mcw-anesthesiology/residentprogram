<template>
	<div>
		<section @mouseenter="mouseIn = true" @mouseleave="mouseIn = false">
			<textarea class="form-control" :class="{'editor-shown': showEditor}"
					:id="id" rows="15" tabindex="0"
					:placeholder="placeholder"
					:value="value"
					@focusout="focused = false" @focusin="focused = true"
					@input="input" ref="editor"></textarea>
			<div v-show="!showEditor" v-html="html || placeholder"
				class="form-control markdown-editor-rendered-html-container"
				:class="{'displaying-placeholder': !html}">
			</div>
		</section>
		<div class="row">
			<small class="col-md-8" v-if="showHelp">
				Supports
				<a href="http://commonmark.org/help/" target="_blank" rel="noopener noreferrer">
					markdown
					<img src="/img/commonmark.png" width="24" height="24"
						alt="Commonmark" />
				</a>
			</small>
			<div class="col-md-4">
				<replacement-list v-if="replacements"
					:replacements="replacements" />
			</div>
		</div>
	</div>
</template>

<script>
import MarkdownIt from 'markdown-it';

import ReplacementList from './ReplacementList.vue';

import { htmlLabelReplacements } from '@/modules/utils.js';

const md = new MarkdownIt();

export default {
	props: {
		value: {
			type: String,
			required: true,
			default: ''
		},
		replacements: {
			type: Array,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		showHelp: {
			type: Boolean,
			default: true
		},
		placeholder: {
			type: String,
			required: false
		}
	},
	data(){
		return {
			mouseIn: false,
			focused: false
		};
	},
	computed: {
		html(){
			let html = md.render(this.value);
			if (this.replacements)
				html = htmlLabelReplacements(html, this.replacements);

			this.$emit('html', html);

			return html;
		},
		showEditor(){
			return this.mouseIn || this.focused;
		}
	},
	watch: {
		focused(focused){
			if(focused)
				this.$refs.editor.focus();
		}
	},
	methods: {
		input(event){
			let markdown = event.target.value;
			this.$emit('input', markdown);
		}
	},
	components: {
		ReplacementList
	}
};
</script>

<style scoped>
	textarea {
		opacity: 0;
		pointer-events: none;
		position: absolute;
		left: -10000px;
	}

	textarea.editor-shown {
		opacity: 1;
		pointer-events: all;
		position: relative;
		left: 0;
	}

	.markdown-editor-rendered-html-container {
		height: 300px;
		overflow: auto;
	}

	.markdown-editor-rendered-html-container.displaying-placeholder {
		color: #999;
	}
</style>

<style>
	.markdown-editor-rendered-html-container p + p {
		margin-top: 20px;
	}
</style>

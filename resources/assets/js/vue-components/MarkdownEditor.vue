<template>
	<div>
		<section @mouseenter="mouseIn = true" @mouseleave="mouseIn = false">
			<textarea class="form-control" :class="{'editor-shown': showEditor}"
					:id="editorId" rows="15"  tabindex="0" :value="value"
					@focusout="focused = false" @focusin="focused = true"
					@input="input" ref="editor"></textarea>
			<div v-show="!showEditor" v-html="html"
				class="form-control markdown-editor-rendered-html-container">
			</div>
		</section>
		<small v-if="showHelp">
			Supports
			<a href="http://commonmark.org/help/" target="_blank" rel="noopener noreferrer">
				markdown
				<img src="/img/commonmark.png" width="24" height="24"
					alt="Commonmark" />
			</a>
		</small>
	</div>
</template>

<script>
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default {
	props: {
		value: {
			type: String,
			required: true,
		},
		replacements: {
			type: Array,
			required: false
		},
		editorId: {
			type: String,
			required: false
		},
		showHelp: {
			type: Boolean,
			default: true
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
			this.replacements.map(replacement => {
				const pattern = new RegExp(`\\[\\[${replacement}\\]\\]`, 'g');
				const label = `<span class="label label-info">${replacement}</span>`;
				html = html.replace(pattern, label);
			});
			
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
		},
		html(html){
			this.$emit('html', html);
		}
	},
	methods: {
		input(event){
			let markdown = event.target.value;
			this.$emit('input', markdown);
		}
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
	
	small {
		display: block;
		text-align: right;
	}
</style>

<style>
	.markdown-editor-rendered-html-container p + p {
		margin-top: 20px;		
	}
</style>

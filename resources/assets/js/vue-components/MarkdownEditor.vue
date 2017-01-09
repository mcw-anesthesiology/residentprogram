<template>
	<div>
		<section @mouseenter="mouseIn = true" @mouseleave="mouseIn = false">
			<textarea class="form-control" :class="{'editor-shown': showEditor}"
					:id="editorId" rows="15"  tabindex="0" :value="value.markdown"
					@focusout="focused = false" @focusin="focused = true"
					@input="input" ref="editor"></textarea>
			<div v-show="!showEditor" v-html="value.html"
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
			type: Object,
			required: true,
			validator(value){
				return value.hasOwnProperty('markdown')
					&& value.hasOwnProperty('html');
			}
		},
		replacements: {
			type: Object,
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
			return md.render(this.value);
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
			let value = Object.assign({}, this.value, {markdown});
			value.html = md.render(value.markdown);
			this.$emit('input', value);
		}
	}
};
</script>

<style scoped>
	textarea {
		opacity: 0;
		pointer-events: none;
		position: absolute;
	}
	
	textarea.editor-shown {
		opacity: 1;
		pointer-events: all;
		position: relative;
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

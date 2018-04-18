<template>
	<div ref="container">
		<div :id="id" :name="name" ref="editor" v-once v-html="value"></div>
		<div v-if="replacements || showHelp" class="row">
			<small v-if="showHelp" class="col-md-8">
				Select some text to show controls.
				Cursor position gets a little wonky when a replacement is made,
				sorry about that.
			</small>
			<div class="col-md-4">
				<replacement-list v-if="replacements"
					:replacements="replacements" />
			</div>
		</div>
	</div>
</template>

<script>
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/bootstrap.css';

import debounce from 'lodash/debounce';

import ReplacementList from './ReplacementList.vue';

import { htmlLabelReplacements } from '@/modules/utils.js';

export default {
	props: {
		value: {
			type: String,
			required: true
		},
		id: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		replacements: {
			type: Array,
			required: false
		},
		showHelp: {
			type: Boolean,
			default: true
		}
	},
	data(){
		return {
			editor: null
		};
	},
	mounted(){
		this.editor = new MediumEditor(this.$refs.editor, {
			autoLink: true,
			toolbar: {
				buttons: [
					'bold',
					'italic',
					'underline',
					'anchor',
					'orderedlist',
					'unorderedlist',
					'removeFormat'
				]
			},
			paste: {
				cleanPastedHTML: false
			}
		});
		this.editor.subscribe('editableInput', debounce(() => {
			let html = this.editor.getContent();

			this.$emit('input', htmlLabelReplacements(html, this.replacements));
		}, 500));

		this.$refs.container.querySelector('.medium-editor-element')
			.classList.add('form-control');
	},

	watch: {
		value(value){
			if(value !== this.editor.getContent()){
				this.editor.saveSelection();
				this.editor.setContent(value);
				this.editor.restoreSelection();
			}
		}
	},

	destroyed(){
		this.editor.unsubscribe();
		this.editor.destroy();
	},

	components: {
		ReplacementList
	}
};
</script>

<style scoped>
	textarea {
		display: none;
	}

	.medium-editor-element {
		font-size: 1.15em;
	}

	.medium-editor-element:focus {
		outline: none;
	}

	.form-control {
		height: auto !important;
	}
</style>

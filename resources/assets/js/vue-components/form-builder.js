import Vue from 'vue';
import FormBuilder from './FormBuilder.vue';

export const FORM_BUILDER_VM = new Vue({
	el: '#form-builder',
	data(){
		return {
			oldFormContents: {}
		};
	},
	render(h){
		return h(FormBuilder, {props: {oldFormContents: this.oldFormContents}});
	}
});

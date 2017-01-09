import Vue from 'vue';
import FormBuilder from '../vue-components/FormBuilder/FormBuilder.vue';

export function createFormBuilder(el){
	return new Vue({
		el: el,
		data(){
			return {
				oldFormContents: {}
			};
		},
		render(h){
			return h(FormBuilder, {
				props: {
					oldFormContents: this.oldFormContents
				}
			});
		}
	});
}

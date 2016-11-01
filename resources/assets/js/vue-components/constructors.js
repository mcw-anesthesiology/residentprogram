import Vue from 'vue';
import FormBuilder from './FormBuilder.vue';
import Reports from './Reports.vue';

export function createFormBuilder(el){
	return new Vue({
		el: el,
		data(){
			return {
				oldFormContents: {}
			};
		},
		render(h){
			return h(FormBuilder, {props: {oldFormContents: this.oldFormContents}});
		}
	});
}

export function createReports(el){
	return new Vue({
		el: el,
		render(h){
			return h(Reports);
		}
	});
}

import Vue from 'vue';
import VueRouter from 'vue-router';

import ManageAlumni from '../../vue-components/Manage/Alumni.vue';
import AddAlumni from '../../vue-components/Manage/Alumni/Add.vue';
import ImportAlumni from '../../vue-components/Manage/Alumni/Import.vue';

Vue.use(VueRouter);

export default function createAlumni(el){
	return new Vue({
		el,
		router: new VueRouter({
			routes: [
				{
					path: '/add',
					component: AddAlumni
				},
				{
					path: '/import',
					component: ImportAlumni
				}
			]
		}),
		render(h){
			return h(ManageAlumni);
		}
	});
}

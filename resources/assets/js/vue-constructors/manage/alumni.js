import Vue from 'vue';
import VueRouter from 'vue-router';

import ManageAlumni from 'vue-components/Manage/Alumni.vue';
import EditAlumni from 'vue-components/Alumni/Edit.vue';
import ImportAlumni from 'vue-components/Alumni/Import.vue';

Vue.use(VueRouter);

export default function createAlumni(el){
	return new Vue({
		el,
		router: new VueRouter({
			routes: [
				{
					path: '/edit',
					component: EditAlumni,
					props: {
						saveUrl: '/alumni'
					}
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

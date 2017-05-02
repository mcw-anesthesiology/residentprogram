import Vue from 'vue';
// import VueRouter from 'vue-router';

// Vue.use(VueRouter);

export default function createAdminSupervisorMeritReports(el, propsData) {
	return new Vue({
		el,
		props: {
			user: {
				type: Object,
				required: true
			},
			meritReportTypes: {
				type: Object,
				required: true
			},
			meritReportTypeForms: {
				type: Object,
				required: true
			}
		},
		data() {
			return {

			};
		},
		propsData,

		methods: {

		},

		components: {

		}
	});
}

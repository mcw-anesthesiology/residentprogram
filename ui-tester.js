// TODO: Make this more automatable and nicer

import Vue from 'vue';
import VueRouter from 'vue-router';

import SelectQuestion from './resources/assets/js/vue-components/Questionnaire/Question/__ui-tests__/select.js';
import RadioQuestion from './resources/assets/js/vue-components/Questionnaire/Question/__ui-tests__/radio.js';
import DatedEventList from './resources/assets/js/vue-components/Questionnaire/Question/__ui-tests__/dated-event-list.js';

import './resources/assets/css/main.css';

const components = {
	SelectQuestion,
	RadioQuestion,
	DatedEventList
};

Vue.use(VueRouter);

new Vue({
	el: 'main',
	data() {
		return {
			components
		};
	},
	router: new VueRouter({
		routes: Object.entries(components)
			.map(([name, component]) => ({path: `/${name}`, component})),
	}),
	template: `
		<div>
			<div class="container body-block">
				<router-link v-for="name of Object.keys(components)"
						class="btn btn-default"
						active-class="active"
						:to="'/' + name">
					{{ name }}
				</router-link>
			</div>

			<router-view></router-view>
		</div>
	`,
	components
});

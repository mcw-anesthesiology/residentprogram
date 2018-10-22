import Vue from '@/vue-constructors/index.js';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import ky from '@/modules/ky.js';

import store from '@/vue-constructors/store.js';

import BootstrapAlert from '#/BootstrapAlert.vue';
import ClearableDate from '#/ClearableDate.vue';
import StoredAlertList from '#/StoredAlertList.vue';
import StartEndDate from '#/StartEndDate.vue';
import SelectTwo from '#/SelectTwo.vue';
import EvaluationList from '#/EvaluationList.vue';

import ExternalUserEditor from '#/Request/ExternalUserEditor.vue';

import { storeError } from '@/modules/errors.js';
import { isoDateStringObject, thisMonth, currentYear } from '@/modules/date-utils.js';
import { groupUsers } from '@/modules/utils.js';

new Vue({
	el: 'main',
	store,
	router: new VueRouter({
		routes: [
			{
				path: '/add-user',
				component: ExternalUserEditor
			}
		]
	}),
	data() {
		return {
			evaluationDates: isoDateStringObject(thisMonth()),
			subject_id: null,
			evaluator_id: null,
			form_id: null,
			hash_expires: null,

			newEvaluation: null,
			listDates: isoDateStringObject(currentYear())
		};
	},
	computed: {
		...mapState('users', ['users']),
		...mapState('forms', ['forms']),
		subjectOptions() {
			return groupUsers(this.users.filter(u => u.type === 'resident'));
		},
		evaluatorOptions() {
			return this.users.filter(u => u.type === 'external').map(u => ({
				id: `${u.id}`,
				text: u.full_name
			}));
		},
		formOptions() {
			return this.forms.filter(f =>
				f.type === 'resident' && f.evaluator_type === 'external'
			).map(f => ({
				id: `${f.id}`,
				text: f.title
			}));
		},
		evaluations() {
			return this.$store.getters['evaluations/external/listBetween'](this.listDates);
		}
	},
	mounted() {
		this.$store.dispatch('users/fetch');
		this.$store.dispatch('forms/fetch');
		this.fetchEvaluations();
	},
	watch: {
		listDates() {
			this.fetchEvaluations();
		}
	},
	methods: {
		fetchEvaluations() {
			this.$store.dispatch('evaluations/external/fetch', this.listDates);
		},
		handleAddUser(user) {
			ky.post('/users', { json: {
				...user,
				type: 'external'
			}}).json().then(user => {
				this.$store.commit('users/add', user);
				this.$router.replace('/');
			}).catch(err => {
				storeError(err, this, 'There was a problem adding the user');
			});
		},
		handleSubmit(event) {
			event.preventDefault();

			ky.post('/api/external-evaluations', { json: {
				subject_id: this.subject_id,
				evaluator_id: this.evaluator_id,
				form_id: this.form_id,
				evaluation_date_start: this.evaluationDates.startDate,
				evaluation_date_end: this.evaluationDates.endDate,
				hash_expires: this.hash_expires || 'never'
			}}).json().then(evaluation => {
				this.newEvaluation = evaluation;
				this.$store.commit('evaluations/external/add', [evaluation]);
			}).catch(err => {
				storeError(err, this, 'There was a problem creating the evaluation');
			});
		}
	},
	components: {
		BootstrapAlert,
		ClearableDate,
		StoredAlertList,
		StartEndDate,
		SelectTwo,
		EvaluationList
	}
});

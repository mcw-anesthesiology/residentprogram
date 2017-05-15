import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import SelectTwo from 'vue-components/SelectTwo.vue';

import {
	getFetchHeaders,
	sortPropIgnoreCase,
	errorToAlert
} from 'modules/utils.js';

export default function createFaculty360Request(el, propsData) {
	return new Vue({
		el,
		props: {
			user: {
				type: Object,
				required: false
			},
			faculty: {
				type: Array,
				required: true
			},
			forms: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				facultyId: null,
				formId: this.forms.length === 1
					? this.forms[0].id
					: null,
				email: null,

				emailError: null,

				requestSuccessful: false,

				alerts: []
			};
		},
		propsData,

		computed: {
			emailIsValid() {
				return (this.email !== null && this.email.endsWith('@mcw.edu'));
			},
			formIsValid() {
				return (this.facultyId !== null && (this.user || this.emailIsValid));
			},
			sortedFaculty() {
				let faculty = this.faculty.slice();
				faculty.sort(sortPropIgnoreCase('full_name'));

				return faculty;
			}
		},

		methods: {
			validateEmail() {
				if (!this.email || this.emailIsValid)
					this.emailError = null;
				else
					this.emailError = 'Please enter your mcw.edu email address';
			},
			handleSubmit() {
				if (!this.formIsValid)
					return;

				fetch('/faculty360/evaluations', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						subject_id: this.facultyId,
						form_id: this.formId,
						email: this.email
					})
				}).then(response => {
					if (response.ok)
						return response.json();

					if (response.status === 403)
						throw new Error("You aren't currently elligible to evaluate faculty");

					if (response.status === 404)
						throw new Error('Please complete all fields');

					throw new Error('There was a problem creating the evaluation');
				}).then(response => {
					this.requestSuccessful = true;

					if (response.hash)
						window.location = `/faculty360/evaluate/${response.hash}`;
				}).catch(err => {
					console.error(err);
					this.alerts.push(errorToAlert(err));
				});
			}
		},

		components: {
			AlertList,
			SelectTwo
		}
	});
}

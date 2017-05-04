import Vue from 'vue';

import AlertList from 'vue-components/AlertList.vue';
import SelectTwo from 'vue-components/SelectTwo.vue';

import {
	getFetchHeaders,
	sortPropIgnoreCase,
	errorToAlert
} from 'modules/utils.js';

export default function createFcaulty360Request(el, propsData) {
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
			}
		},
		data() {
			return {
				facultyId: null,
				email: null,
				
				emailError: null,
				
				alerts: []
			};
		},
		propsData,
		
		computed: {
			emailIsValid() {
				return (this.email !== null && this.email.endsWith('@mcw.edu'));
			},
			formIsValid() {
				return (this.facultyId !== null && this.emailIsValid);
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
				fetch('/faculty360/evaluations', {
					method: 'POST',
					headers: getFetchHeaders(),
					credentials: 'same-origin',
					body: JSON.stringify({
						faculty_id: this.facultyId,
						email: this.email
					})
				}).then(response => {
					if (response.ok)
						return response.json();
						
					if (response.status === 403)
						throw new Error("You aren't currently elligible to evaluate faculty");
					
					if (response.status === 404)
						throw new Error('Please select a faculty member to evaluate');
					
					throw new Error('There was a problem creating the evaluation');
				}).then(response => {
					// TODO
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

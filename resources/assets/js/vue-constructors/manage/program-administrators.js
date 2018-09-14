import Vue from '@/vue-constructors/index.js';
import VueRouter from 'vue-router';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import store from '@/vue-constructors/store.js';

import ProgramAdministratorEditor from '@/vue-components/Manage/ProgramAdministrator/Editor.vue';
import ComponentList from '@/vue-components/ComponentList.vue';

import { handleError, emitError } from '@/modules/errors.js';
import {
	renderTrainingLevel,
	renderSecondaryTrainingLevel
} from '@/modules/datatable-utils.js';
import { fetchConfig, jsonOrThrow, okOrThrow, ucfirst } from '@/modules/utils.js';

export default function createManageProgramAdministrators(el, propsData) {
	return new Vue({
		el,
		store,
		mixins: [HasAlerts],
		router: new VueRouter({
			routes: [
				{
					path: '/add',
					component: {
						template: `
							<program-administrator-editor
								@submit="handleSubmit"
								@alert="$emit('alert', ...arguments)"
								@cancel="$router.push('/')">
							</program-administrator-editor>
						`,
						methods: {
							handleSubmit(pa) {
								fetch('/program-administrators', {
									...fetchConfig(),
									method: 'POST',
									body: JSON.stringify(pa)
								}).then(okOrThrow).then(() => {
									this.$emit('reload');
									this.$router.push('/');
								}).catch(err => {
									emitError(err, this, 'There was a problem saving.');
								});
							}
						},
						components: {
							ProgramAdministratorEditor
						}
					}
				},
				{
					path: '/edit/:id',
					component: {
						props: {
							programAdministrators: {
								type: Array,
								required: true,
								default() {
									return [];
								}
							}
						},
						template: `
							<program-administrator-editor v-if="editedPA"
								:initialValue="editedPA"
								@submit="handleSubmit"
								@alert="$emit('alert', ...arguments)"
								@cancel="$router.push('/')">
							</program-administrator-editor>
						`,
						computed: {
							editedPA() {
								return this.programAdministrators.find(pa =>
									pa.id == this.$route.params.id // eslint-disable-line eqeqeq
								);
							}
						},
						methods: {
							handleSubmit(pa) {
								fetch(`/program-administrators/${this.$route.params.id}`, {
									...fetchConfig(),
									method: 'POST',
									body: JSON.stringify({
										_method: 'PATCH',
										...pa
									})
								}).then(okOrThrow).then(() => {
									this.$emit('reload');
									this.$router.push('/');
								}).catch(err => {
									emitError(err, this, 'There was a problem saving.');
								});
							}
						},
						components: {
							ProgramAdministratorEditor
						}
					}
				}
			]
		}),
		props: {

		},
		propsData,

		data() {
			return {
				programAdministrators: [],
				programAdministratorFields: [
					'user_name',
					'type',
					'training_level',
					'secondary_training_level'
				],
				programAdministratorAccessors: {
					user_name(pa) {
						return pa.user ? pa.user.full_name : '';
					}
				}
			};
		},

		computed: {
		},

		mounted() {
			this.fetchProgramAdministrators();
		},

		methods: {
			ucfirst,
			renderTrainingLevel,
			renderSecondaryTrainingLevel,
			fetchProgramAdministrators() {
				const q = $.param({
					with: {
						user: ['full_name']
					}
				});

				fetch(`/program-administrators?${q}`, {
					...fetchConfig()
				}).then(jsonOrThrow).then(programAdministrators => {
					this.programAdministrators = programAdministrators;
				}).catch(err => {
					handleError(err, this, 'There was a problem fetching program administrators');
				});
			}
		},

		components: {
			ComponentList
		}
	});
}

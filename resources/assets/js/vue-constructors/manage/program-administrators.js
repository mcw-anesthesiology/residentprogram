import Vue from '@/vue-constructors/index.js';
import VueRouter from 'vue-router';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import store from '@/vue-constructors/store.js';

import ProgramAdministratorEditor from '@/vue-components/Manage/ProgramAdministrator/Editor.vue';
import ComponentList from '@/vue-components/ComponentList.vue';
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';

import { handleError, emitError } from '@/modules/errors.js';
import {
	renderTrainingLevel,
	renderSecondaryTrainingLevel
} from '@/modules/datatable-utils.js';
import { ucfirst } from '@/modules/utils.js';

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
								this.$store.dispatch('programAdministrators/create', pa).then(() => {
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
								return this.$store.state.programAdministrators.programAdministrators.find(pa =>
									pa.id == this.$route.params.id // eslint-disable-line eqeqeq
								);
							}
						},
						methods: {
							handleSubmit(pa) {
								this.$store.dispatch('programAdministrators/update', {
									id: this.$route.params.id,
									...pa
								}).then(() => {
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
			programAdministrators() {
				return this.$store.state.programAdministrators.programAdministrators;
			}
		},

		mounted() {
			this.$store.commit('programAdministrators/query', {
				with: {
					user: ['full_name']
				}

			});

			this.fetchProgramAdministrators();
		},

		methods: {
			ucfirst,
			renderTrainingLevel,
			renderSecondaryTrainingLevel,
			fetchProgramAdministrators() {
				this.$store.dispatch('programAdministrators/fetch').catch(err => {
					handleError(err, this, 'There was a problem fetching program administrators');
				});
			},
			handleDelete(id) {
				this.$store.dispatch('programAdministrators/delete', id).catch(err => {
					handleError(err, this, 'There was a problem deleting the program administrator');
				});
			}
		},

		components: {
			ComponentList,
			ConfirmationButton
		}
	});
}

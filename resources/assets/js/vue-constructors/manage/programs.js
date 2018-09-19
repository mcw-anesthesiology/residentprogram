import Vue from '@/vue-constructors/index.js';
import VueRouter from 'vue-router';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import store from '@/vue-constructors/store.js';

import ProgramEditor from '@/vue-components/Manage/Programs/Editor.vue';
import ProgramListItem from '@/vue-components/Manage/Programs/ListItem.vue';
import ComponentList from '@/vue-components/ComponentList.vue';

import { handleError, emitError } from '@/modules/errors.js';

export default function createManagePrograms(el, propsData) {
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
							<program-editor
								@submit="handleSubmit"
								@alert="$emit('alert', ...arguments)"
								@cancel="$router.push('/')">
							</program-editor>
						`,
						methods: {
							handleSubmit(pa) {
								this.$store.dispatch('programs/create', pa).then(() => {
									this.$router.push('/');
								}).catch(err => {
									emitError(err, this, 'There was a problem saving.');
								});
							}
						},
						components: {
							ProgramEditor
						}
					}
				},
				{
					path: '/edit/:id',
					component: {
						template: `
							<program-editor v-if="editedPA"
								:initialValue="editedPA"
								@submit="handleSubmit"
								@alert="$emit('alert', ...arguments)"
								@cancel="$router.push('/')">
							</program-editor>
						`,
						computed: {
							editedPA() {
								return this.$store.state.programs.programs.find(pa =>
									pa.id == this.$route.params.id // eslint-disable-line eqeqeq
								);
							}
						},
						methods: {
							handleSubmit(pa) {
								this.$store.dispatch('programs/update', {
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
							ProgramEditor
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
				programFields: [
					'user_name',
					'type',
					'training_level',
					'secondary_training_level'
				],
				programAccessors: {
					user_name(pa) {
						return pa.user ? pa.user.full_name : '';
					}
				}
			};
		},

		computed: {
			programs() {
				return this.$store.state.programs.programs;
			}
		},

		mounted() {
			this.fetchPrograms();
		},

		methods: {
			fetchPrograms() {
				this.$store.dispatch('programs/fetch').catch(err => {
					handleError(err, this, 'There was a problem fetching programs');
				});
			},
		},

		components: {
			ProgramListItem,
			ComponentList
		}
	});
}

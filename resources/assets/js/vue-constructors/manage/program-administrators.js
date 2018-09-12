import Vue from '@/vue-constructors/index.js';

import ComponentList from '@/vue-components/ComponentList.vue';

import { handleError } from '@/modules/errors.js';
import {
	renderTrainingLevel,
	renderSecondaryTrainingLevel
} from '@/modules/datatable-utils.js';
import { fetchConfig, jsonOrThrow, ucfirst } from '@/modules/utils.js';

export default function createManageProgramAdministrators(el, propsData) {
	return new Vue({
		el,
		props: {

		},
		propsData,

		data() {
			return {
				programAdministrators: null,
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

import Vue from 'vue';
import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import ComponentList from '@/vue-components/ComponentList.vue';
import JsonSchemaEditor from '@/vue-components/JsonSchemaEditor.vue';

import AddEditLocation from '@/vue-components/Location/AddEdit.vue';

import { handleError } from '@/modules/errors.js';
import {
	fetchConfig,
	okOrThrow,
	jsonOrThrow
} from '@/modules/utils.js';

export default function createManageCaseLogs(el, propsData) {
	return new Vue({
		mixins: [
			HasAlerts
		],
		el,
		props: {
			detailsSchemas: {
				type: Object,
				required: true
			}
		},
		propsData,
		data() {
			return {
				locations: null,
				locationBeingEdited: null
			};
		},

		computed: {

		},

		mounted() {
			this.fetchLocations();
		},

		methods: {
			fetchLocations() {
				fetch('/locations', {
					...fetchConfig()
				}).then(jsonOrThrow).then(locations => {
					this.locations = locations;
				}).catch(err => {
					handleError(err, this, 'There was a problem fetching locations');
				});
			},
			addLocation() {
				this.locationBeingEdited = {};
			},
			editLocation(location) {
				this.locationBeingEdited = location;
			},
			handleLocationSubmit() {
				this.locationBeingEdited = null;
				this.fetchLocations();
			},
			deleteLocation(location) {
				fetch(`/locations/${location.id}`, {
					...fetchConfig(),
					method: 'POST', // DELETE
					body: JSON.stringify({
						_method: 'DELETE'
					})
				}).then(okOrThrow).then(() => {
					this.fetchLocations();
				}).catch(err => {
					handleError(err, this, 'There was a problem deleting the location');
				});
			},

			handleSchemaSubmit(detailsType, schema) {
				fetch('/case_log_details_schemas', {
					...fetchConfig(),
					method: 'POST',
					body: JSON.stringify({
						details_type: detailsType,
						schema
					})
				}).then(okOrThrow).catch(err => {
					handleError(err, this, 'There was a problem updating the schema');
				});
			}
		},

		components: {
			ConfirmationButton,
			ComponentList,
			JsonSchemaEditor,
			AddEditLocation
		}
	});
}

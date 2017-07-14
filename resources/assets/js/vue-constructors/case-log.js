import Vue from 'vue';

import HasAlerts from 'vue-mixins/HasAlerts.js';

import ComponentList from 'vue-components/ComponentList.vue';
import DataTable from 'vue-components/DataTable.vue';

import { renderDateCell, createDateCell } from 'modules/datatable-utils.js';
import { getFetchHeaders, jsonOrThrow, userIsType } from 'modules/utils.js';

export function createCaseLog(el, propsData) {
	return new Vue({
		mixins: [
			HasAlerts
		],
		el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData,
		data() {
			return {
				caseLogs: []
			};
		},

		computed: {
			isAdmin() {
				return userIsType(this.user, 'admin');
			},
			caseLogFields() {
				return [
					'full_name'
				];
			},
			caseLogTableHeader() {
				return [[
					'#',
					'Trainee',
					'Location',
					'Date',
					'Type',
					''
				]];
			},
			caseLogTableConfig() {
				let columns = [
					{data: 'id'},
					{data: 'location.name'},
					{data: 'case_date', render: renderDateCell, createdCell: createDateCell},
					{data: 'details_schema.details_type', render(detailsType) {
						if (detailsType)
							return detailsType.toUpperCase();

						return '';
					}},
					{
						data: null,
						orderable: false,
						searchable: false,
						render(){
							return `<button>{{ hm }}</button>`;
						},
						createdCell(el, caseLog){
							new Vue({
								el,
								data() {
									return {
										hm: 'ok'
									};
								}
							});
						}
					}
				];

				return {
					columns,
					order: [[0, 'desc']]
				};
			}
		},

		mounted() {
			this.fetchCaseLogs();
		},

		methods: {
			fetchCaseLogs() {
				let query = $.param({
					with: {
						location: ['name'],
						user: ['full_name'],
						detailsSchema: true
					}
				});

				fetch(`/case_logs?${query}`, {
					headers: getFetchHeaders(),
					credentials: 'same-origin'
				}).then(jsonOrThrow).then(caseLogs => {
					this.caseLogs = caseLogs;
				}).catch(err => {
					console.error(err);
					this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching case logs'
					});
				});
			}
		},

		components: {
			ComponentList,
			DataTable
		}
	});
}

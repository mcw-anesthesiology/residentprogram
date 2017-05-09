import Vue from 'vue';

import DataTable from 'vue-components/DataTable.vue';

import { ucfirst } from 'modules/utils.js';
import {
	renderDateTimeCell,
	createDateTimeCell
} from 'modules/datatable-utils.js';

export default function createManageForms(el) {
	return new Vue({
		el,

		computed: {
			faculty360Thead() {
				return [[
					'Title',
					'Created',
					'Status',
					'View',
					'Action'
				]];
			},
			faculty360Config() {
				return {
					ajax: {
						url: '/faculty360/forms',
						dataSrc: '',
					},
					columns: [
						{data: 'title'},
						{
							data: 'created_at',
							render: renderDateTimeCell,
							createdCell: createDateTimeCell
						},
						{
							data: 'status',
							render(status, type) {
								if (type === 'display') {
									let label = status === 'active'
										? 'label-success'
										: 'label-danger';

									return `<span class="status label ${label}">
											${ucfirst(status)}
										</span>`;
								}

								return status;
							}
						},
						{
							data: 'id',
							render(id, type) {
								if (type === 'display') {
									return `<a href="/faculty360/forms/${id}/view"
												target="_blank">
											View form
										</a>`;
								}

								return id;
							}
						},
						{
							data: null,
							orderable: false,
							searchable: false,
							render() {
								// FIXME
								return '';
							}
						}
					]
				};
			}
		},

		components: {
			DataTable
		}
	});
}

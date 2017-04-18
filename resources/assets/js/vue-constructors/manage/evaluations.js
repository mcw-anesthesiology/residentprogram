import Vue from 'vue';

import EvaluationDataTable from 'vue-components/EvaluationDataTable.vue';

import { ucfirst } from 'modules/utils.js';
import {
	renderDateTimeCell,
	createDateTimeCell,
	renderDateRangeCell,
	createDateRangeCell
} from 'modules/datatable-utils.js';

export default function createManageEvaluations(el, propsData){
	
	return new Vue({
		el,
		props: {
			
		},
		propsData,
		
		computed: {
			thead(){
				return [[
					'#',
					'Subject',
					'Evaluator',
					'Requested By',
					'Form',
					'Evaluation Date',
					'Request Date',
					'Complete Date',
					'Status',
					'Action'
				]];
			},
			config(){
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: [
									'full_name'
								],
								evaluator: [
									'full_name'
								],
								requestor: [
									'full_name'
								],
								form: [
									'title',
									'visibility',
									'type'
								]
							}
						},
						dataSrc: ''
					},
					columns: [
						{data: 'url'},
						{data: 'subject.full_name'},
						{data: 'evaluator.full_name'},
						{data: 'requestor.full_name'},
						{data: 'form.title'},
						{
							data: null,
							render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
							createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
						},
						{data: 'request_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: 'complete_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
						{data: null, orderable: false, render: function(evaluation){
							if(!evaluation.visibility)
								evaluation.visibility = evaluation.form.visibility;
							let label;
							switch(evaluation.status){
								case 'complete':
									label = 'success';
									break;
								case 'pending':
									label = 'warning';
									break;
								default:
									label = 'danger';
									break;
							}
							let eyeType, visBtnType;
							switch(evaluation.visibility){
								case 'visible':
									eyeType = 'open';
									visBtnType = 'btn-info';
									break;
								case 'anonymous':
								case 'under faculty threshold':
									eyeType = 'close';
									visBtnType = '';
									break;
								case 'hidden':
									eyeType = 'close';
									visBtnType = 'btn-default';
									break;
							}
							return `<span class="status">
								<span class="label label-${label}">
									${ucfirst(evaluation.status)}
								</span>
							</span>
							<br />
							<button type="button"
									class="visibility visibility-${evaluation.visibility} btn ${visBtnType} btn-xs"
									data-eval-type="${evaluation.form.type}"
									data-id="${evaluation.id}"
									data-current-visibility="${evaluation.visibility}">
								${ucfirst(evaluation.visibility)}
								<span class="glyphicon glyphicon-eye-${eyeType}"></span>
							</button>`;
						}},
						{data: null, orderable: false, render: function(evaluation){
							let buttonClass, buttonType, glyphicon, buttonText;
							if(evaluation.status === "disabled"){
								buttonClass = "enableEval";
								buttonType = "success";
								glyphicon = "ok";
								buttonText = "Enable";
							} else {
								buttonClass = "disableEval";
								buttonType = "danger";
								glyphicon = "remove";
								buttonText = "Disable";
							}
							
							return `<span>
								<button class="${buttonClass} btn btn-${buttonType} btn-xs"
										data-id="${evaluation.id}">
									<span class="glyphicon glyphicon-${glyphicon}"></span>
									${buttonText}
								</button>
							</span>
							<span class="cancel">
								${evaluation.status === 'pending'
									? `<button class="cancelEval btn btn-danger btn-xs"
												data-id="${evaluation.id}">
											<span class="glyphicon glyphicon-remove"></span>
											Cancel
										</button>
										<button class="send-reminder btn btn-primary btn-xs"
												data-id="${evaluation.id}">
											<span class="glyphicon glyphicon-send"></span>
											Send reminder
										</button>`
									: ''
								}
							</span>`;
						}}
					],
					order: [[0, 'desc']],
					deferRender: true
				};
			}
		},
		
		components: {
			EvaluationDataTable
		}
	});
}

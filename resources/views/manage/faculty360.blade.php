@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-manage.css') }}" />
@endpush

@section('head')
	<style>
		.faculty360-evaluation-list-item,
		.faculty360-form-list-item {
			border-bottom: 1px solid rgba(0, 0, 0, 0.25);
			padding: 5px 0;
			cursor: pointer;
		}

		.faculty360-evaluation-list-item:nth-child(even),
		.faculty360-form-list-item:nth-child(even) {
			background-color: rgba(0, 0, 0, 0.05);
		}

		.faculty360-evaluation-list-item .row,
		.faculty360-form-list-item .row {
			margin: 0;
		}

		.faculty360-form-list-item small,
		.faculty360-evaluation-list-item small,
		.evaluation-details-panel small {
			display: block;
			font-size: 0.85em;
			color: rgba(0, 0, 0, 0.55);
		}

		.cancel-button-container {
			margin-top: 1em;
		}
	</style>
@stop

@section('blockless-body')
	<div v-if="show.createForm" v-cloak class="container body-block">
		<h2>
			Create form
		</h2>
		<form-builder :old-form-contents="formToEdit"
			fixed-form-type="faculty360"
			default-period-type="year"
			@submit="handleFormSubmit">
		</form-builder>
		<div class="cancel-button-container text-center">
			<button type="button" class="btn btn-default"
					@click="show.createForm = false">
				Cancel
			</button>
		</div>
	</div>

	<div id="faculty-360-forms-block" class="container body-block">
		<h2 class="sub-header">
			Faculty 360 forms
			<button type="button" class="btn btn-success btn-xs"
					@click="show.createForm = true">
				<span class="glyphicon glyphicon-plus"></span>
				Add new
			</a>
		</h2>
		<component-list v-if="forms" :items="forms" :fields="formFields"
				:field-accessors="formFieldAccessors"
				default-sort-by="id" default-sort-order="desc"
				reloadable
				@reload="fetchForms">
			<template slot-scope="form">
				<div class="faculty360-form-list-item row">
					<div class="col-sm-1">
						<small>#</small>
						@{{ form.id }}
					</div>
					<div class="col-sm-3">
						<small>Title</small>
						@{{ form.title }}
					</div>
					<div class="col-sm-3">
						<small>Created</small>
						<rich-date :date="form.created_at"></rich-date>
					</div>
					<div class="col-sm-1">
						<span :class="`label ${form.status === 'active'
								? 'label-success' : 'label-danger' }`">
							@{{ ucfirst(form.status) }}
						</span>
					</div>
					<div class="col-sm-2">
						<a :href="`/faculty360/forms/${form.id}/view`"
								target="_blank">
							View form
						</a>
					</div>
					<div class="col-sm-2">
						<confirmation-button class="btn btn-sm"
								:unpressed-class="form.status === 'inactive'
										? 'btn-success'
										: 'btn-danger'
								"
								pressed-class="btn-warning"
								@click="toggleFormStatus(form, $event)">
							<span class="glyphicon"
								:class="
									form.status === 'inactive'
										? 'glyphicon-ok'
										: 'glyphicon-remove'
								">
							</span>
							@{{
								form.status === 'inactive'
									? 'Enable'
									: 'Disable'
							}}
						</confirmation-button>
					</div>
				</div>
			</template>
		</component-list>
	</div>

	<div v-if="viewedEvaluation" v-cloak class="container body-block">
		<div class="evaluation-details-panel panel panel-default">
			<div class="panel-heading">
				Evaluation details
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-2">
						<small>#</small>
						@{{ viewedEvaluation.id }}
					</div>
					<div class="col-sm-4">
						<small>Faculty</small>
						@{{ viewedEvaluation.subject.full_name }}
					</div>
					<div class="col-sm-4">
						<small>Evaluation date</small>
						<rich-date-range :dates="viewedEvaluation"
							start="evaluation_date_start"
							end="evaluation_date_end">
						</rich-date-range>
					</div>
					<div class="col-sm-2">
						<small>Status</small>
						<span :class="`label ${getEvaluationStatusLabel(viewedEvaluation.status)}`">
							@{{ ucfirst(viewedEvaluation.status) }}
						</span>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-3 col-sm-offset-1">
						<small>Evaluator email</small>
						@{{ viewedEvaluation.evaluator_email }}
					</div>
					<div class="col-sm-3">
						<small>Created</small>
						<rich-date :date="viewedEvaluation.request_date" time>
						</rich-date>
					</div>
					<div class="col-sm-3">
						<small>Completed</small>
						<rich-date :date="viewedEvaluation.complete_date" time>
						</rich-date>
					</div>
				</div>
			</div>
		</div>
		<form-reader v-bind="viewedEvaluation"
			:title="viewedEvaluation.form.title" readonly>
		</form-reader>
		<div class="text-center">
			<button type="button" class="btn btn-default"
					@click="viewedEvaluation = null">
				Close
			</button>
		</div>
	</div>

	<div class="container body-block">
		<h2 class="sub-header">Evaluations</h2>
		<div class="row">
			<div class="form-group">
				<label class="containing-label">
					Evaluation date academic year
					<academic-year-selector v-model="evaluationDates"
						start-date="2017-05-01">
					</academic-year-selector>
				</label>
			</div>
		</div>
		<component-list v-if="evaluations"
				:items="evaluations"
				:fields="evaluationFields"
				:field-accessors="evaluationFieldAccessors"
				default-sort-by="id"
				default-sort-order="desc"
				reloadable
				@reload="fetchEvaluations">
			<template slot-scope="evaluation">
				<div class="faculty360-evaluation-list-item row"
						@click="viewEvaluation(evaluation, $event)">
					<div class="col-sm-1">
						<small>#</small>
						@{{ evaluation.id }}
					</div>
					<div class="col-sm-3">
						<small>Faculty</small>
						@{{ evaluation.subject.full_name }}
					</div>
					<div class="col-sm-2">
						<small>Form</small>
						@{{ evaluation.form.title }}
					</div>
					<div class="col-sm-3">
						<small>Evaluation date</small>
						<rich-date-range :dates="evaluation"
							start="evaluation_date_start"
							end="evaluation_date_end">
						</rich-date-range>
					</div>
					<div class="col-sm-1">
						<span :class="`label ${getEvaluationStatusLabel(evaluation.status)}`">
							@{{ ucfirst(evaluation.status) }}
						</span>
					</div>
					<div class="col-sm-2">
						<confirmation-button class="btn btn-sm"
								:unpressed-class="evaluation.status === 'disabled'
										? 'btn-success'
										: 'btn-danger'
								"
								pressed-class="btn-warning"
								@click="toggleEvaluationStatus(evaluation, $event)">
							<span class="glyphicon"
								:class="
									evaluation.status === 'disabled'
										? 'glyphicon-ok'
										: 'glyphicon-remove'
								">
							</span>
							@{{
								evaluation.status === 'disabled'
									? 'Enable'
									: 'Disable'
							}}
						</confirmation-button>

						<confirmation-button class="btn btn-sm"
								unpressed-class="btn-info"
								pressed-class="btn-warning"
								@click="resendEvaluationHash(evaluation, $event)">
							<span class="glyphicon glyphicon-send"></span>
							Send new completion link
						</confirmation-button>
					</div>
				</div>
			</template>
		</component-list>
	</div>

	<div class="container">
		<alert-list v-model="alerts"></alert-list>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManageFaculty360('main');
	</script>
@endpush

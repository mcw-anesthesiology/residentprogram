@extends('app')

@section('head')
	<style>
		.faculty360-evaluation-list-item {
			border-bottom: 1px solid rgba(0, 0, 0, 0.25);
			padding: 5px 0;
		}

		.faculty360-evaluation-list-item:nth-child(even) {
			background-color: rgba(0, 0, 0, 0.05);
		}

		.faculty360-evaluation-list-item .row {
			margin: 0;
		}

		.faculty360-evaluation-list-item small {
			display: block;
			font-size: 0.85em;
			color: rgba(0, 0, 0, 0.55);
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
		<div class="text-center">
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
		<data-table v-if="forms"
			:thead="formsThead" :config="formsConfig" :data="forms">
		</data-table>
	</div>

	<div class="container body-block">
		<h2 class="sub-header">Evaluations</h2>
		<div class="row">
			<start-end-date v-model="evaluationDates"></start-end-date>
		</div>
		<component-list v-if="evaluations"
				:items="evaluations"
				:fields="evaluationFields"
				:field-accessors="evaluationFieldAccessors"
				default-sort-by="id"
				default-sort-order="desc"
				reloadable
				@reload="fetchEvaluations">
			<template scope="evaluation">
				<div class="faculty360-evaluation-list-item row">
					<div class="col-sm-2">
						<small>ID</small>
						@{{ evaluation.id }}
					</div>
					<div class="col-sm-4">
						<small>Faculty</small>
						@{{ evaluation.subject.full_name }}
					</div>
					<div class="col-sm-2">
						<small>Evaluation date</small>
						@{{
							renderDateRange(
								evaluation.evaluation_date_start,
								evaluation.evaluation_date_end
							)
						}}
					</div>
					<div class="col-sm-2">
						<small>Status</small>
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
								@click="toggleEvaluationStatus(evaluation)">
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
								@click="resendEvaluationHash(evaluation)">
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

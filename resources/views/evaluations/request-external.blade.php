@extends('app')

@push('stylesheets')
	{{-- <link rel="stylesheet" href="{{ elixir('css/createExternalEvaluation.css') }}" /> --}}
@endpush

@section('blockless-body')
	<div class="container body-block">
		<h1>Create external evaluation</h1>

		<form @submit="handleSubmit">
			<div class="form-group">
				<label>
					Subject
					<select-two :options="subjectOptions" v-model="subject_id"></select-two>
				</label>
			</div>

			<div class="form-group">
				<label>
					Evaluator
					<select-two :options="evaluatorOptions" v-model="evaluator_id"></select-two>
				</label>
			</div>

			<router-link to="/add-user">
				Add external user
			</router-link>

			<router-view @submit="handleAddUser"></router-view>

			<div class="form-group">
				<label>
					Form
					<select-two :options="formOptions" v-model="form_id"></select-two>
				</label>
			</div>

			<div class="form-group">
				<fieldset>
					<legend>Evaluation period</legend>
					<start-end-date v-model="evaluationDates"></start-end-date>
				</fieldset>
			</div>

			<div class="form-group">
				<label>
					Evaluation link expiration date
					<clearable-date v-model="hash_expires"></clearable-date>
				</label>
			</div>

			<button type="submit" class="btn btn-lg btn-primary">
				Create evaluation
			</button>
		</form>

		<bootstrap-alert v-if="newEvaluation" type="success" dismissable @close="newEvaluation = null">
			<p slot="header" class="lead">
				Evaluation created!
			</p>

			<p>Please send the completion link to the evaluator.</p>

			<p>
				<a :href="`/evaluate/${newEvaluation.completion_hash}`">
					{{ url('/evaluate') }}/@{{ newEvaluation.completion_hash }}
				</a>
			</p>
		</bootstrap-alert>

		<stored-alert-list></stored-alert-list>
	</div>


	<div class="container body-block">
		<h2>All external evaluations</h2>

		<fieldset>
			<legend>Filter</legend>
			<start-end-date v-model="listDates"></start-end-date>
		</fieldset>

		<evaluation-list :evaluations="evaluations"></evaluation-list>
	</div>
@endsection

@push('scripts')
	<script src="{{ elixir('js/createExternalEvaluation.js') }}"></script>
@endpush

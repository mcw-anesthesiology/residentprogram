@extends('app')

@if (App::environment('production'))
	@push('stylesheets')
		<link rel="stylesheet" href="{{ mix('createExternalEvaluation.css') }}" />
	@endpush
@endif

@section('blockless-body')
	<div class="container body-block">
		<h1>Create external evaluation</h1>

		<div v-show="false">
			<p>
				Loading
				<img src="/img/spinner.gif" height="18" width="18" alt="" />
			</p>
		</div>
		<form v-cloak @submit="handleSubmit">
			<div class="form-group">
				<label>
					Subject
					<select-two :options="subjectOptions" v-model="subject_id"></select-two>
				</label>
			</div>

			<div class="form-group">
				<label>
					<div class="input-group">
						Evaluator
						<select-two :options="evaluatorOptions" v-model="evaluator_id"></select-two>
						<span class="input-group-btn">
							<router-link to="/add-user" class="btn btn-default labelless-button">
								Add external user
							</router-link>
						</span>
					</div>
				</label>
			</div>


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
					<clearable-date input-class="form-control appear-not-readonly" v-model="hash_expires"></clearable-date>
				</label>
				<small>
					Leave blank for no expiration
				</small>
			</div>

			<button type="submit" class="btn btn-lg btn-primary">
				Create evaluation
			</button>
		</form>

		<bootstrap-alert v-if="newEvaluation" v-cloak type="success" dismissable @close="newEvaluation = null">
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

		<evaluation-list :evaluations="evaluations">
			<template slot-scope="evaluation">
				<div>
					<span>
						Completion link:
					</span>
					<a :href="`/evaluate/${evaluation.completion_hash}`">
						{{ url('/evaluate') }}/@{{ evaluation.completion_hash }}
					</a>
				</span>
				<div v-if="evaluation.hash_expires">
					<span>
						Link expires:
					</span>
					<template v-if="hashExpired(evaluation)">
						<b>
							Expired on
							<RichDate :date="evaluation.hash_expires"></RichDate>
						</b>
					</template>
					<template v-else>
						<RichDate :date="evaluation.hash_expires"></RichDate>
					</template>
				</div>
			</template>
		</evaluation-list>
	</div>
@endsection

@push('scripts')
	<script src="{{ mix('createExternalEvaluation.js') }}"></script>
@endpush

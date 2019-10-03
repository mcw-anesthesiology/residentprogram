@extends("app")

@section("head")
	<style>
		.page-header {
			margin-bottom: 40px;
		}

		.date-heading {
			margin-top: 40px;
		}

		.submit-container {
			margin-top: 40px;
		}

		.admin-panel-group {
			margin-bottom: 15px;
		}

		.explanation-panel {
			margin: 30px 0;
		}

		.flatpickr-minute,
		.flatpickr-second {
			pointer-events: none;
		}
	</style>
@stop

@section("body")
	<div class="page-header">
		<h1>
			{{ $user->isType($evaluatorTypes) ? 'Create' : 'Request' }} {{ $requestTypeText }} evaluation
		</h1>
	</div>

	<form id="form" role="form" action="#" method="POST" class="form-horizontal"
			@submit="checkSubmit">
		<input type="hidden" name="_token" value="{{ csrf_token() }}" />

	@if(!empty($subjects))
		<div class="form-group">
			<div class="col-md-2">
				<div v-if="error.subjectId" v-cloak class="alert alert-danger" role="alert">
					@{{ error.subjectId }}
				</div>
			</div>
			<div class="col-md-8">
				<label for="subject">
					{{ ucfirst($subjectTypeText) }}
				</label>
				<div class="input-group">
					<select-two class="form-control" name="subject_id[]" id="subject" required
							:options="subjectOptions" v-model="subjectId"
							:multiple="allowMultiple.subjects"
							placeholder="Select {{ $subjectTypeText }}">
						<option value="" v-if="!allowMultiple.subjects">
							Select {{ $subjectTypeText }}
						</option>
					</select-two>
					<span class="input-group-addon">
						<label title="Allows you to make requests for multiple subjects at once">
							<input type="checkbox" v-model="allowMultiple.subjects" />
							Select multiple
						</label>
					</span>
				</div>
				<small v-if="subjectFilter" v-cloak>
					Currently being filtered
					<button type="button" class="btn btn-xs btn-default"
							@click="subjectFilter = null">
						Clear filter
					</button>
				</small>
			</div>
		</div>
	@endif

	@if(!empty($evaluators))
		<div class="form-group">
			<div class="col-md-2">
				<div v-if="error.evaluatorId" v-cloak class="alert alert-danger" role="alert">
					@{{ error.evaluatorId }}
				</div>
			</div>
			<div class="col-md-8">
				<label for="evaluator">
					{{ ucfirst($evaluatorTypeText) }}
				</label>
				<div class="input-group">
					<select-two class="form-control" name="evaluator_id[]"
							id="evaluator" required
							:options="evaluatorOptions" v-model="evaluatorId"
							:multiple="allowMultiple.evaluators"
							placeholder="Select {{ $evaluatorTypeText }}">
						<option value="" v-if="!allowMultiple.evaluators">
							Select {{ $evaluatorTypeText }}
						</option>
					</select-two>
					<span class="input-group-addon">
						<label title="Allows you to make requests to multiple evaluators at once">
							<input type="checkbox" v-model="allowMultiple.evaluators" />
							Select multiple
						</label>
					</span>
				</div>
				<small v-if="evaluatorFilter" v-cloak>
					Currently being filtered
					<button type="button" class="btn btn-xs btn-default"
							@click="evaluatorFilter = null">
						Clear filter
					</button>
				</small>
			</div>
		</div>
	@endif

		<div class="form-group" v-visible.once="!required.subjectId || subjectId">
			<div class="col-md-2">
				<div v-if="error.formId" v-cloak class="alert alert-danger" role="alert">
					@{{ error.formId }}
				</div>
			</div>
			<div class="col-md-8">
				<label for="evaluation-form">
					Evaluation form
				</label>
				<select-two class="form-control" name="form_id"
						id="evaluation-form" required
						:options="formOptions" v-model="formId"
						placeholder="Select form">
					<option value="">Select form</option>
				</select-two>
				<small v-if="formFilter" v-cloak>
					Currently being filtered
					<button type="button" class="btn btn-xs btn-default"
							@click="formFilter = null">
						Clear filter
					</button>
				</small>
			</div>
		</div>

		<div v-visible.once="formId || evaluationDateJson">
			<div class="row">
				<div class="col-md-offset-1 col-md-10">
					<h2 class="date-heading">
						When is this evaluation for?
					</h2>
				</div>
			</div>

	@if($user->isType("resident") && $requestType == "faculty")
			<div class="row">
				<div class="col-md-offset-2 col-md-8">
					<div class="explanation-panel panel panel-default">
						<div class="panel-heading">
							<span class="glyphicon glyphicon-info-sign"></span>
							Faculty evaluations
						</div>
						<div class="panel-body">
							<p>
								Faculty evaluations are anonymous.
								The only information shown to faculty is the academic
								year and the evaluation itself.
							</p>
							<p>
								When completed, evaluations are banked and released
								to be viewed by the faculty at the end of each quarter.
							</p>
						</div>
					</div>
				</div>
			</div>
	@endif

			<div class="form-group">
				<div class="col-md-2">
					<div v-if="error.evaluationDate" v-cloak class="alert alert-danger" role="alert">
						@{{ error.evaluationDate }}
					</div>
				</div>
				<div class="col-md-8">
					<label for="evaluation-date">Evaluation period</label>
	@if($user->isType('admin'))
					<div class="input-group">
	@endif
						<select-two class="form-control" id="evaluation-date"
								placeholder="Select evaluation period" required
								:options="evaluationDateOptions" v-model="evaluationDateJson"
								:multiple="allowMultiple.evaluationDate"
								:disabled="useCustomEvaluationDate && customEvaluationDate">
							<option value="" v-if="!allowMultiple.evaluationDate">
								Select evaluation period
							</option>
						</select-two>

	@if($user->isType('admin'))
						<span class="input-group-addon">
							<label title="Allows you to make requests for multiple months at once">
								<input type="checkbox" v-model="allowMultiple.evaluationDate"
									:disabled="useCustomEvaluationDate && customEvaluationDate" />
								Multiple
							</label>
						</span>
					</div>
	@endif

				</div>
				<template v-if="Array.isArray(evaluationDate)"
						v-for="(date, index) of evaluationDate">
					<input type="hidden" :name="'evaluation_date[' + index + '][startDate]'" required
						:value="date.startDate" />
					<input type="hidden" :name="'evaluation_date[' + index + '][endDate]'" required
						:value="date.endDate" />
				</template>
				<template v-else>
					<input type="hidden" name="evaluation_date[startDate]" required
						:value="evaluationDate.startDate" />
					<input type="hidden" name="evaluation_date[endDate]" required
						:value="evaluationDate.endDate" />
				</template>
			</div>
		</div>

		<div class="form-group" v-if="!requestorIsEvaluator"
				v-visible.once="evaluationDateJson || customEvaluationDate">
			<div class="col-md-offset-2 col-md-8">
				<label for="request-note">
					Request note (optional)
				</label>
				<markdown-editor
					id="request-note"
					v-model="requestNote"
					@html="requestNoteHtml = arguments[0]"
					placeholder="Write a little note that will be displayed with your request">
				</markdown-editor>
				<input type="hidden" name="request_note" :value="requestNoteHtml" />
			</div>
		</div>

		<alert-list v-model="alerts"></alert-list>

	@if($user->isType("admin"))
		<div class="form-group">
			<div class="col-md-offset-2 col-md-8">
				<div class="panel panel-default">
					<div class="panel-heading">Admin controls</div>
					<div class="panel-body">
						<div class="admin-panel-group form-horizontal row">
							<div class="col-md-12">
								<label>
									<input type="checkbox" id="force-notification"
										name="force_notification"
										v-model="forceNotification" />
									Force notification
								</label>
							</div>
						</div>
						<div class="admin-panel-group form-horizontal row">
							<div class="col-md-6">
								<label>
									<input type="checkbox" id="send-hash"
										name="send_hash" v-model="sendHash" />
									Send personalized completion link
								</label>
							</div>
							<div class="col-md-6">
								<label v-show="sendHash" v-cloak
										class="containing-label">
									Hash expires in
									<select class="form-control"
											id="hash-expires-in"
											name="hash_expires_in"
											v-model="hashExpiresIn" />
										<option value="30">30 days</option>
										<option value="60">60 days</option>
										<option value="90">90 days</option>
										<option value="never">Never expires</option>
									</select>
								</label>
							</div>
						</div>
						<div class="admin-panel-group form-horizontal row">
							<div class="col-md-6">
								<label>
									<input type="checkbox" name="schedule"
										v-model="schedule" />
									Schedule request
								</label>
							</div>
							<div class="col-md-6">
								<label v-show="schedule" v-cloak
										class="containing-label">
									Schedule request for
									<vue-flatpickr class="form-control"
										name="request_date"
										:options="flatpickrOptions"
										v-model="requestDate"></vue-flatpickr>
								</label>
							</div>
						</div>
						<div class="admin-panel-group form-horizontal row">
							<div class="col-md-6">
								<label>
									<input type="checkbox"
										v-model="useCustomEvaluationDate" />
									Custom evaluation date
								</label>
								<label v-show="useCustomEvaluationDate" v-cloak
										class="containing-label">
									<vue-flatpickr class="form-control"
										:options="customEvalFlatpickrOptions"
										v-model="customEvaluationDate"></vue-flatpickr>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	@endif

		<div v-if="error.alert" v-cloak class="alert alert-danger" role="alert">
			<b>Error</b>: @{{ error.alert }}
		</div>

		<div class="submit-container text-center">
			<button type="submit" class="btn btn-primary btn-lg"
					:disabled="!requirementsAreMet">
				{{ $user->isType($evaluatorTypes) ? 'Create' : 'Request' }}
				Evaluation
			</button>
		</div>
	</form>

	@if($user->isType("resident") && $requestType == "faculty")
</div>
<div class="container body-block">
	<h3 class="sub-header">Evaluations in progress</h3>
	<evaluation-data-table range="allTime" :thead="pendingFacultyEvalsThead"
		:config="pendingFacultyEvalsConfig"/>

</div>
<div class="container body-block">
	<h3 class="sub-header">Completed faculty evaluations</h3>
	<evaluation-data-table range="allTime" :thead="completeFacultyEvalsThead"
		:config="completeFacultyEvalsConfig" />
	@endif
@stop

@section("script")
	<script>
		var propsData = {
			user: {!! $user->toJson() !!}
		};
	@if(!empty($evaluators))
		propsData.evaluators = {!! $evaluators !!};
	@endif
	@if(!empty($subjects))
		propsData.subjects = {!! $subjects !!};
	@endif
	@if(!empty($forms))
		propsData.forms = {!! $forms !!};
	@endif

		createRequest('main', propsData);
	</script>
@stop

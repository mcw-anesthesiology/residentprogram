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
	@if(!empty($blocks))
		<div class="form-group">
			<div class="col-md-offset-2 col-md-8">
				<label for="block">Filter by block</label>
				<select class="form-control" id="block">
					<option value="0" selected>Select from all {{ $user->isType($evaluatorTypes) ? $subjectTypeTextPlural : $evaluatorTypeText }}</option>
		@foreach($blocks as $block)
			@if($block->assignments->contains("user_id", $user->id))
					<option value="{{ $block->id }}">{{ $block->year }} {{ $block->block_name }}</option>
			@endif
		@endforeach
				</select>
			</div>
		</div>
	@endif

	@if(!empty($subjects))
		<div class="form-group">
			<div class="col-md-2">
				<div v-if="error.subjectId" v-show="true" class="alert alert-danger" role="alert">
					@{{ error.subjectId }}
				</div>
			</div>
			<div class="col-md-8">
				<label for="subject">{{ ucfirst($subjectTypeText) }}</label>
				<div class="input-group">
					<select-two class="form-control" name="subject_id" id="subject" required
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
			</div>
		</div>
	@endif

	@if(!empty($evaluators))
		<div class="form-group">
			<div class="col-md-2">
				<div v-if="error.evaluatorId" v-show="true" class="alert alert-danger" role="alert">
					@{{ error.evaluatorId }}
				</div>
			</div>
			<div class="col-md-8">
				<label for="evaluator">{{ ucfirst($evaluatorTypeText) }}</label>
				<div class="input-group">
					<select-two class="form-control" name="evaluator_id" id="evaluator" required
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
			</div>
		</div>
	@endif

		<div class="form-group">
			<div class="col-md-2">
				<div v-if="error.formId" v-show="true" class="alert alert-danger" role="alert">
					@{{ error.formId }}
				</div>
			</div>
			<div class="col-md-8">
				<label for="evaluation-form">Evaluation form</label>
				<select-two class="form-control" name="form_id" id="evaluation-form" required
						:options="formOptions" v-model="formId"
						placeholder="Select form">
					<option value="">Select form</option>
				</select-two>
			</div>
		</div>

		<div class="row">
			<div class="col-md-offset-1 col-md-10">
				<h2 class="date-heading">
					When is this evaluation for?
				</h2>
			</div>
		</div>

	@if($user->isType("resident") && $requestType == "faculty")
		<div class="row">
			<div class="col-md-8">
				<div class="explanation-panel panel panel-default">
					<div class="panel-heading">
						<span class="glyphicon glyphicon-info-sign"></span>
						Faculty evaluations
					</div>
					<div class="panel-body">
						<p>
							The faculty member you are evaluating will not be able to see the date you select.
							The only information shown to faculty is the evaluation itself.
						</p>
						<p>
							Evaluations are released to the faculty in groups of 3, or at the end of the academic year.
						</p>
					</div>
				</div>
			</div>
		</div>
	@endif

		<div class="form-group">
			<div class="col-md-2">
				<div v-if="error.evaluationDate" v-show="true" class="alert alert-danger" role="alert">
					@{{ error.evaluationDate }}
				</div>
			</div>
			<div class="col-md-4">
				<label for="evaluation-month">Month</label>
				<select-two class="form-control" id="evaluation-month" required
						v-model="evaluationMonth" placeholder="Select a month">
					<option value="">Select a month</option>
	@foreach($months as $date => $monthName)
					<option value="{{ $date }}">{{ $monthName }}</option>
	@endforeach
				</select-two>
			</div>
			<div id="evaluation-day-div" class="col-md-2" v-show="evaluationMonth">
				<label for="evaluation-day" :class="{'text-muted': !evaluationDay}">
					Date (optional)
				</label>
				<vue-flatpickr class="form-control" v-model="evaluationDay"
					:options="evaluationDayOptions" ref="evaluationDayFlatpickr" />
			</div>

			<div class="col-md-2 text-right" v-show="evaluationDay">
				<button type="button" class="labelless-button btn btn-default" @click="clearDay">
					Clear date
				</button>
			</div>
			<input type="hidden" id="evaluation-date" name="evaluation_date" required
				:value="evaluationDate"/>
		</div>

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
								<label v-show="sendHash">
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
					</div>
				</div>
			</div>
		</div>
	@endif

		<div v-if="error.alert" v-show="true" class="alert alert-danger" role="alert">
			<b>Error</b>: @{{ error.alert }}
		</div>

		<div class="submit-container text-center">
			<button type="submit" class="btn btn-primary btn-lg">
				{{ $user->isType($evaluatorTypes) ? 'Create' : 'Request' }}
				Evaluation
			</button>
		</div>
	</form>

	@if($user->isType(["resident", "faculty"]))
</div>
<div class="container body-block">
	<h3 class="sub-header">Block information</h3>
	<p>
		Selecting a block is used to filter the lists to others who are scheduled
		in the same locations as you. This filter is not perfect.
		
		If the doctor you are looking for is missing after selecting a block,
		or an entire block is missing for you from the list, please select
		"select from all" for the block.
		
		You will then be able to select from the entire lists.
	</p>
	@endif
	@if($user->isType("resident") && $requestType == "faculty" && $pendingEvalCount > 0)
</div>
<div class="container body-block">
	<h3 class="sub-header">Evaluations in progress</h3>
	<table class="table table-striped" id="pending-faculty-evals" width="100%">
		<thead>
			<tr>
				<th>#</th>
				<th>Faculty</th>
				<th>Form</th>
				<th>Evaluation date</th>
				<th>Started</th>
				<th></th>
			</tr>
		</thead>
	</table>
	@endif
@stop

@section("script")
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-request.js') }}"></script>
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

	@if($user->type == "resident" && $requestType == "faculty")
		var pendingFacultyEvalsTable = $('#pending-faculty-evals').DataTable({
			ajax: {
				url: '/evaluations',
				data: {
					whereHas: {
						form: {
							type: 'faculty'
						}
					},
					with: {
						subject: ['full_name'],
						form: ['title']
					},
					evaluator_id: user.id,
					status: 'pending'
				},
				dataSrc: ''
			},
			columns: [
				{data: 'url', render: renderEvaluatorEvalUrl},
				{data: 'subject.full_name'},
				{data: 'form.title'},
				{data: 'evaluation_date', render: renderDateCell, createdCell: createDateCell},
				{data: 'request_date', render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: null, render: function(eval){
					if(eval.requested_by_id === user.id)
						return '<button class='btn btn-danger btn-xs cancel-eval-button' '
							+ 'data-id='' + eval.id + ''><span class='glyphicon glyphicon-remove'></span> '
							+ 'Cancel</button>';

					return '';
				}}
			],
			order: [[0, 'desc']],
			createdRow: function(row){
				$(row).addClass('view-evaluation');
			}
		});
	@endif
	</script>
@stop

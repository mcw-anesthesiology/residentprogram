	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Requests</h2>
@if($user->evaluatorEvaluations()->where("status", "pending")->count() > 0)
	<div class="table-responsive">
		<table class="table table-striped" id="pending-faculty-evaluator-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident/Fellow</th>
					<th>Evaluation Form</th>
					<th>Requested</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
@else
	<p class="lead">You have no pending evaluation requests, why not <a href="/request">create one?</a></p>
@endif
</div>


@foreach($user->mentees as $mentee)
<div class="container body-block">
	@include("dashboard.tables.mentee-evaluations")
</div>
@endforeach

@foreach($user->watchedForms as $watchedForm)
<div class="container body-block">
	@include("dashboard.tables.watched-form")
</div>
@endforeach

<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-check"></span> Completed Evaluations</h2>
@if($user->evaluatorEvaluations()->count() > 0)
	<div class="table-responsive">
		<table class="table table-striped" id="complete-faculty-evaluator-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident/Fellow</th>
					<th>Evaluation Form</th>
					<th>Evaluation Date</th>
					<th>Requested</th>
					<th>Completed</th>
				</tr>
			</thead>
		</table>
	</div>
@else
	<p class="lead">You have no completed evaluations</p>
@endif

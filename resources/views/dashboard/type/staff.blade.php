@if($user->evaluatorEvaluations()->where("status", "pending")->count() > 0)
	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Pending</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="pending-staff-evaluator-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident</th>
					<th>Form</th>
					<th>Evaluation Date</th>
					<th>Created</th>
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
	<div class="table-responsive">
		<table class="table table-striped" id="complete-staff-evaluator-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident</th>
					<th>Form</th>
					<th>Evaluation Date</th>
					<th>Created</th>
					<th>Completed</th>
				</tr>
			</thead>
		</table>
	</div>

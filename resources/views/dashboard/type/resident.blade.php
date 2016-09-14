	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Requests</h2>
@if($user->subjectEvaluations()->where("status", "pending")->count() > 0)
	<div class="table-responsive">
		<table class="table table-striped" id="pending-resident-subject-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Faculty</th>
					<th>Form</th>
					<th>Requested</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
@else
	<p class="lead">You have no pending evaluation requests, why not <a href="/request">request one?</a></p>
@endif
</div>

@if($user->evaluatorEvaluations()->where("status", "pending")->count() > 0)
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Evaluations To Complete</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="pending-resident-evaluator-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Subject</th>
					<th>Form</th>
					<th>Evaluation date</th>
					<th>Requested</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
</div>
@endif

<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-check"></span> Completed Evaluations</h2>
@if($user->subjectEvaluations()->where("evaluator_id", "!=", $user->id)->where("status", "complete")->count() > 0)
	<div class="table-responsive">
		<table class="table table-striped" id="complete-resident-evaluations-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Faculty</th>
					<th>Form</th>
					<th>Evaluation date</th>
					<th>Requested</th>
					<th>Completed</th>
				</tr>
			</thead>
		</table>
	</div>
@else
	<p class="lead">You have no completed evaluations</p>
@endif

@if($numStaffEvals > 0)
</div>
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> Staff Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="complete-resident-staff-evaluations-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Staff</th>
					<th>Form</th>
					<th>Evaluation Date</th>
					<th>Created</th>
					<th>Completed</th>
				</tr>
			</thead>
		</table>
	</div>
@endif

@if($numSelfEvals > 0)
</div>
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-user"></span> Self Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="complete-resident-self-evaluations-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Form</th>
					<th>Evaluation Date</th>
					<th>Completed</th>
				</tr>
			</thead>
		</table>
	</div>
@endif

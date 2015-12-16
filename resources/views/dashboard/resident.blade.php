@if($user->subjectEvaluations()->where("status", "pending")->count() > 0)
	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Requests</h2>
	<div class="table-responsive">
		<table class="table table-striped datatable-pending" id="keywordsPending" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Faculty</th>
					<th>Evaluation Form</th>
					<th>Requested</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
@else
	<h2>You have no pending evaluations</h2>
@endif

	</div>
	<div class="container body-block">
		<h2 class="sub-header"><span class="glyphicon glyphicon-check"></span> Completed Evaluations</h2>
		<div class="table-responsive">
			<table class="table table-striped datatable-complete" id="keywordsComplete" width="100%">
				<thead>
					<tr>
						<th>#</th>
						<th>Faculty</th>
						<th>Evaluation Form</th>
						<th>Requested</th>
						<th>Completed</th>
					</tr>
				</thead>
			</table>
		</div>

@if($numStaffEvals > 0)
	</div>
	<div class="container body-block">
		<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> Staff Evaluations</h2>
		<div class="table-responsive">
			<table class="table table-striped datatable-staff-complete">
				<thead>
					<tr>
						<th>#</th>
						<th>Staff</th>
						<th>Evaluation Form</th>
						<th>Evaluation Date</th>
						<th>Created</th>
						<th>Completed</th>
					</tr>
				</thead>
			</table>
		</div>
@endif

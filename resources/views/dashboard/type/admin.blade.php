@if($numFlagged > 0)
	<h2 class="sub-header"><span class="glyphicon glyphicon-flag"></span> Flagged Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="flagged-evaluations-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Evaluator</th>
					<th>Subject</th>
					<th>Requested Action</th>
					<th>Reason</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
</div>
@endif

<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> Resident Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="trainee-evaluations-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident/Fellow</th>
					<th>Faculty</th>
					<th>Form</th>
					<th>Evaluation Date</th>
					<th>Requested</th>
					<th>Completed</th>
					<th>Status</th>
				</tr>
			</thead>
		</table>
	</div>
</div>

@foreach($user->watchedForms as $watchedForm)
<div class="container body-block">
	@include("dashboard.tables.watched-form")
</div>
@endforeach


<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> Self Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="self-evaluations-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Evaluator</th>
					<th>Form</th>
					<th>Evaluation date</th>
					<th>Completed</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
</div>

<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> Staff Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="staff-evaluations-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident/Fellow</th>
					<th>Staff</th>
					<th>Form</th>
					<th>Evaluation Date</th>
					<th>Created</th>
					<th>Completed</th>
					<th>Status</th>
				</tr>
			</thead>
		</table>
	</div>

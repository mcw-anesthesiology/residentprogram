@if($user->evaluatorEvaluations()->where("status", "pending")->count() > 0)
	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Pending</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="pending-staff-evaluator-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident</th>
					<th>Evaluation Form</th>
					<th>Evaluation Date</th>
					<th>Created</th>
				</tr>
			</thead>
		</table>
	</div>
</div>
<div class="container body-block">
@endif

	<h2 class="sub-header"><span class="glyphicon glyphicon-check"></span> Completed Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped" id="complete-staff-evaluator-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident</th>
					<th>Evaluation Form</th>
					<th>Evaluation Date</th>
					<th>Created</th>
					<th>Completed</th>
				</tr>
			</thead>
		</table>
	</div>

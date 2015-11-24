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
</div>
<div class="container body-block">
@endif

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

@if($numFlagged > 0)
	<h2 class="sub-header"><span class="glyphicon glyphicon-flag"></span> Flagged Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped datatable-flagged" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Evaluator</th>
					<th>Subject</th>
					<th>Requested Action</th>
					<th>Reason</th>
				</tr>
			</thead>
		</table>
	</div>
</div>
<div class="container body-block">
@endif

	<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> All Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped datatable-all" id="keywordsAll" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident/Fellow</th>
					<th>Faculty</th>
					<th>Evaluation Form</th>
					<th>Requested</th>
					<th>Completed</th>
					<th>Status</th>
				</tr>
			</thead>
		</table>
	</div>

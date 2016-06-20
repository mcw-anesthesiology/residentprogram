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
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
</div>
<div class="container body-block">
@endif

	<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> Resident Evaluations</h2>
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

@foreach($user->watchedForms as $watchedForm)
</div>
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-list-alt"></span> {{ $watchedForm->form->title }}</h2>
	<div class="table-responsive">
		<table class="table table-striped datatable-watched-form" data-id="{{ $watchedForm->form_id }}" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Subject</th>
					<th>Evaluator</th>
					<th>Evaluation date</th>
					<th>Completed</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
@endforeach

</div>
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
					<th>Complete date</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>

</div>
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-list"></span> Staff Evaluations</h2>
	<div class="table-responsive">
		<table class="table table-striped datatable-staff" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Resident/Fellow</th>
					<th>Staff</th>
					<th>Evaluation Form</th>
					<th>Evaluation Date</th>
					<th>Created</th>
					<th>Completed</th>
				</tr>
			</thead>
		</table>
	</div>

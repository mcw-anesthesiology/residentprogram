
<h2 class="sub-header">Requests</h2>
<div class="table-responsive">
	<table class="table table-striped datatable-pending" id="keywordsPending" width="100%">
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

@foreach($mentees as $mentee)
	<h2 class="sub-header">{{ $mentee->last_name }}, {{ $mentee->first_name }}</h2>
	<div class="table-responsive">
		<table class="table table-striped datatable-mentee" data-id="{{ $mentee->id }}" width="100%">
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
@endforeach

<h2 class="sub-header">Evaluations</h2>
<div class="table-responsive">
	<table class="table table-striped datatable-complete" width="100%">
		<thead>
			<tr>
				<th>#</th>
				<th>Resident/Fellow</th>
				<th>Evaluation Form</th>
				<th>Requested</th>
				<th>Completed</th>
			</tr>
		</thead>
	</table>
</div>

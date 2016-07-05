<h2 class="sub-header"><span class="glyphicon glyphicon-user"></span> {{ $mentee->last_name }}, {{ $mentee->first_name }}</h2>
<div class="table-responsive">
	<table class="table table-striped mentee-evaluations-table" data-id="{{ $mentee->id }}" width="100%">
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

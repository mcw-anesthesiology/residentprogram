	<h2 class="sub-header"><span class="glyphicon glyphicon-inbox"></span> Requests</h2>
@if($user->evaluatorEvaluations()->where("status", "pending")->count() > 0)
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
@else
	<p class="lead">You have no pending evaluation requests, why not <a href="/request">create one?</a></p>
@endif

@foreach($mentees as $mentee)
</div>
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-user"></span> {{ $mentee->last_name }}, {{ $mentee->first_name }}</h2>
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

</div>
<div class="container body-block">
	<h2 class="sub-header"><span class="glyphicon glyphicon-check"></span> Completed Evaluations</h2>
@if($user->evaluatorEvaluations()->count() > 0)
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
@else
	<p class="lead">You have no completed evaluations</p>
@endif

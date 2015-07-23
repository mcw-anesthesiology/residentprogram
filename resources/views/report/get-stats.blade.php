<h3>Evaluation Statistics</h3>
<table class="table table-striped datatable" width="100%">
	<thead>
		<tr>
			<th>User</th>
			<th>Requests</th>
			<th>Completed</th>
			<th>Ratio</th>
		</tr>
	</thead>
	<tbody>
<?php
$tsv = "User\tRequests\tCompleted\tRatio\n";
?>
		@foreach($users as $statUser)
<?php
	if($type == "faculty"){
		$requests = $statUser->evaluatorEvaluations->count();
		$completed = $statUser->evaluatorEvaluations->where("status", "complete")->count();
	} else{
		$requests = $statUser->subjectEvaluations->count();
		$completed = $statUser->subjectEvaluations->where("status", "complete")->count();
	}
	if($requests != 0)
		$ratio = number_format(($completed/$requests) * 100, 0);
	else
		$ratio = 0;

	$tsv .= $requests."\t";
	$tsv .= $completed."\t";
	$tsv .= $ratio."\n";
?>
			<tr>
					<th>{{ $statUser->last_name }}, {{ $statUser->first_name }}</th>
					<td>{{ $requests }}</td>
					<td>{{ $completed }}</td>
					<td>{{ $ratio }}%</td>
			</tr>
		@endforeach
	</tbody>
</table>
<form method="post" target="_blank" action="/report/export" style="text-align: center">
	{!! csrf_field() !!}
	<input type="hidden" name="name" value="Evaluation Statistics" />
	<button class="btn" type="submit" name="data" value="{{ $tsv }}">Export</button>
</form>
<hr />

<h3>No Requests</h3>
<ul class="list-group row">
	@foreach($users as $statUser)
		@if($type == "faculty")
			@if($statUser->evaluatorEvaluations->count() == 0)
				<li class="list-group-item col-xs-6">{{ $statUser->last_name }}, {{ $statUser->first_name }}</li>
			@endif
		@else
			@if($statUser->subjectEvaluations->count() == 0)
				<li class="list-group-item col-xs-6">{{ $statUser->last_name }}, {{ $statUser->first_name }}</li>
			@endif
		@endif
	@endforeach
</ul>
<hr />

<h3>None Completed</h3>
<ul class="list-group row">
	@foreach($users as $statUser)
		@if($type == "faculty")
			@if($statUser->evaluatorEvaluations()->where("status", "complete")->count() == 0)
				<li class="list-group-item col-xs-6">{{ $statUser->last_name }}, {{ $statUser->first_name }}</li>
			@endif
		@else
			@if($statUser->subjectEvaluations()->where("status", "complete")->count() == 0)
				<li class="list-group-item col-xs-6">{{ $statUser->last_name }}, {{ $statUser->first_name }}</li>
			@endif
		@endif
	@endforeach
</ul>
<hr />

@if($type == "faculty")
	<h3>Average Completion Time</h3>
	<table class="table table-striped datatable" width="100%">
		<thead>
			<tr>
				<th>User</th>
				<th>Time</th>
			</tr>
		</thead>
		<tbody>
			@for($i = 0; $i < $users->count(); $i++)
				@if($times[$i] != "0 days 00 hours")
					<tr>
						<td>{{ $users[$i]->last_name }}, {{ $users[$i]->first_name }}</td>
						<td>{{ $times[$i] }}</td>
					</tr>
				@endif
			@endfor
		</tbody>
	</table>
	<hr />
@endif

<h3>Last Completed Evaluations</h3>
<table class="table table-striped datatable" width="100%">
	<thead>
		<tr>
			<th>User</th>
			<th>Date</th>
		</tr>
	</thead>
	<tbody>
		@foreach($users as $statUser)
<?php
	if($type == "faculty"){
		$lastCompleted = $statUser->evaluatorEvaluations()->where("status", "complete")->orderBy("complete_date", "desc")->first();
	} else{
		$lastCompleted = $statUser->subjectEvaluations()->where("status", "complete")->orderBy("complete_date", "desc")->first();
	}
?>
			@if($lastCompleted)
				<tr>
					<th>{{ $statUser->last_name }}, {{ $statUser->first_name }}</th>
					<td>{{ $lastCompleted->complete_date }}</td>
				</tr>
			@endif
		@endforeach
	</tbody>
</table>

<div class="container body-block">
<h3>Evaluation Statistics</h3>
<table class="table table-striped datatable" width="100%">
	<thead>
		<tr>
			<th>User</th>
			<th>Requested</th>
			<th>Total Requests</th>
			<th>Total Completed</th>
			<th>Total Ratio</th>
		</tr>
	</thead>
	<tbody>
<?php
	$tsv = "User\tRequested\tTotal Requests\tTotal Completed\tTotal Ratio\n";
?>
		@foreach($users as $statUser)
<?php
	if($type == "faculty")
		$userEvaluations = $statUser->evaluatorEvaluations();
	else
		$userEvaluations = $statUser->subjectEvaluations();
	if(!empty($startDate))
		$userEvaluations->where("evaluation_date", ">=", $startDate);
	if(!empty($endDate))
		$userEvaluations->where("evaluation_date", "<", $endDate);

	$userEvaluations = $userEvaluations->get();

	$totalRequests = $userEvaluations->count();
	$requested = $userEvaluations->where("requested_by_id", $statUser->id)->count();
	$completed = $userEvaluations->where("status", "complete")->count();
	if($totalRequests != 0)
		$ratio = number_format(($completed/$totalRequests) * 100, 0);
	else
		$ratio = 0;

	$tsv .= $statUser->last_name.", ".$statUser->first_name."\t";
	$tsv .= $requested."\t";
	$tsv .= $totalRequests."\t";
	$tsv .= $completed."\t";
	$tsv .= $ratio."\n";
?>
			<tr>
				<th>{{ $statUser->last_name }}, {{ $statUser->first_name }}</th>
				<td>{{ $requested }}</td>
				<td>{{ $totalRequests }}</td>
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
</div>
<div class="container body-block">

<h3>No Requests</h3>
<?php $tsv = ""; ?>
<ul class="list-group row">
	@foreach($users as $statUser)
		@if($type == "faculty")
			@if($statUser->evaluatorEvaluations->count() == 0)
				<li class="list-group-item col-xs-6">{{ $statUser->last_name }}, {{ $statUser->first_name }}</li>
<?php $tsv .= $statUser->last_name.", ".$statUser->first_name."\n"; ?>
			@endif
		@else
			@if($statUser->subjectEvaluations->count() == 0)
				<li class="list-group-item col-xs-6">{{ $statUser->last_name }}, {{ $statUser->first_name }}</li>
<?php $tsv .= $statUser->last_name.", ".$statUser->first_name."\n"; ?>
			@endif
		@endif
	@endforeach
</ul>
<form method="post" target="_blank" action="/report/export" style="text-align: center">
	{!! csrf_field() !!}
	<input type="hidden" name="name" value="No Requests" />
	<button class="btn" type="submit" name="data" value="{{ $tsv }}">Export</button>
</form>
</div>
<div class="container body-block">

<h3>None Completed</h3>
<?php $tsv = ""; ?>
<ul class="list-group row">
	@foreach($users as $statUser)
		@if($type == "faculty")
			@if($statUser->evaluatorEvaluations()->where("status", "complete")->count() == 0)
				<li class="list-group-item col-xs-6">{{ $statUser->last_name }}, {{ $statUser->first_name }}</li>
<?php $tsv .= $statUser->last_name.", ".$statUser->first_name."\n"; ?>
			@endif
		@else
			@if($statUser->subjectEvaluations()->where("status", "complete")->count() == 0)
				<li class="list-group-item col-xs-6">{{ $statUser->last_name }}, {{ $statUser->first_name }}</li>
<?php $tsv .= $statUser->last_name.", ".$statUser->first_name."\n"; ?>
			@endif
		@endif
	@endforeach
</ul>
<form method="post" target="_blank" action="/report/export" style="text-align: center">
	{!! csrf_field() !!}
	<input type="hidden" name="name" value="None Completed" />
	<button class="btn" type="submit" name="data" value="{{ $tsv }}">Export</button>
</form>
</div>
<div class="container body-block">

@if($type == "faculty")
	<h3>Average Completion Time</h3>
<?php $tsv = "User\tTime\n"; ?>
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
<?php $tsv .= $users[$i]->last_name.", ".$users[$i]->first_name."\t".$times[$i]."\n"; ?>
				@endif
			@endfor
		</tbody>
	</table>
	<form method="post" target="_blank" action="/report/export" style="text-align: center">
		{!! csrf_field() !!}
		<input type="hidden" name="name" value="Average Completion Time" />
		<button class="btn" type="submit" name="data" value="{{ $tsv }}">Export</button>
	</form>
</div>
<div class="container body-block">
@endif

<h3>Last Completed Evaluations</h3>
<?php $tsv = "User\tDate\n"; ?>
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
<?php $tsv .= $statUser->last_name.", ".$statUser->first_name."\t".$lastCompleted->complete_date."\n"; ?>
			@endif
		@endforeach
	</tbody>
</table>
<form method="post" target="_blank" action="/report/export" style="text-align: center">
	{!! csrf_field() !!}
	<input type="hidden" name="name" value="Last Completed Evaluations" />
	<button class="btn" type="submit" name="data" value="{{ $tsv }}">Export</button>
</form>

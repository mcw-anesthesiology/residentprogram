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
		@foreach($users as $user)
<?php
	if($type == "faculty"){
		$requests = $user->evaluatorEvaluations->count();
		$completed = $user->evaluatorEvaluations->where("status", "complete")->count();
	} else{
		$requests = $user->subjectEvaluations->count();
		$completed = $user->subjectEvaluations->where("status", "complete")->count();
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
					<th>{{ $user->last_name }}, {{ $user->first_name }}</th>
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

<h3>No Requests</h3>
<ul class="list-group">
	@foreach($users as $user)
		@if($type == "faculty")
			@if($user->evaluatorEvaluations->count() == 0)
				<li class="list-group-item">{{ $user->last_name }}, {{ $user->first_name }}</li>
			@endif
		@else
			@if($user->subjectEvaluations->count() == 0)
				<li class="list-group-item">{{ $user->last_name }}, {{ $user->first_name }}</li>
			@endif
		@endif
	@endforeach
</ul>

<h3>None Completed</h3>
<ul class="list-group">
	@foreach($users as $user)
		@if($type == "faculty")
			@if($user->evaluatorEvaluations()->where("status", "complete")->count() == 0)
				<li class="list-group-item">{{ $user->last_name }}, {{ $user->first_name }}</li>
			@endif
		@else
			@if($user->subjectEvaluations()->where("status", "complete")->count() == 0)
				<li class="list-group-item">{{ $user->last_name }}, {{ $user->first_name }}</li>
			@endif
		@endif
	@endforeach
</ul>

@if($type == "faculty")
	<table class="table table-striped datatable" width="100%">
		<thead>
			<tr>
				<th>User</th>
				<th>Time</th>
			</tr>
		</thead>
		<tbody>
			@for($i = 0; $i < $users->count(); $i++)
				<tr>
					<td>{{ $users[$i]->last_name }}, {{ $users[$i]->first_name }}</td>
					<td>{{ $times[$i] }}</td>
				</tr>
			@endfor
		</tbody>
	</table>
@endif

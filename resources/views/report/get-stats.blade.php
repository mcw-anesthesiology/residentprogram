@if(!empty($userStats))
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
		@foreach($userStats as $stat)
			<tr>
				<th>{{ $stat["name"] }}</th>
				<td>{{ $stat["requested"] }}</td>
				<td>{{ $stat["totalRequests"] }}</td>
				<td>{{ $stat["completed"] }}</td>
				<td>{{ $stat["ratio"] }}%</td>
			</tr>
<?php
	$tsv .= join("\t", array_values($stat));
?>
		@endforeach
	</tbody>
</table>
<form method="post" target="_blank" action="/report/export" style="text-align: center">
	{!! csrf_field() !!}
	<input type="hidden" name="name" value="Evaluation Statistics" />
	<button class="btn" type="submit" name="data" value="{{ $tsv }}">Export</button>
</form>
</div>
@endif
<div class="container body-block">

<h3>No Requests</h3>
<?php $tsv = ""; ?>
<ul class="list-group row">
	@foreach($noneRequested as $name)
	<li class="list-group-item col-xs-6">{{ $name }}</li>
<?php $tsv .= $name."\n"; ?>
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
@if(!empty($noneCompleted))
<ul class="list-group row">
	@foreach($noneCompleted as $name)
	<li class="list-group-item col-xs-6">{{ $name }}</li>
<?php $tsv .= $name."\n"; ?>
	@endforeach
</ul>
<form method="post" target="_blank" action="/report/export" style="text-align: center">
	{!! csrf_field() !!}
	<input type="hidden" name="name" value="None Completed" />
	<button class="btn" type="submit" name="data" value="{{ $tsv }}">Export</button>
</form>
@endif
</div>
<div class="container body-block">

@if($type == "faculty" && !empty($averageCompletionTimes))
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
			@foreach($averageCompletionTimes as $name => $time)
				@if($time != "0 days 00 hours")
					<tr>
						<td>{{ $name }}</td>
						<td>{{ $time }}</td>
					</tr>
<?php $tsv .= $name."\t".$time."\n"; ?>
				@endif
			@endforeach
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

@if(!empty($lastCompleted))
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
		@foreach($lastCompleted as $name => $date)
				<tr>
					<th>{{ $name }}</th>
					<td>{{ $date }}</td>
				</tr>
<?php $tsv .= $name."\t".$date."\n"; ?>
		@endforeach
	</tbody>
</table>
<form method="post" target="_blank" action="/report/export" style="text-align: center">
	{!! csrf_field() !!}
	<input type="hidden" name="name" value="Last Completed Evaluations" />
	<button class="btn" type="submit" name="data" value="{{ $tsv }}">Export</button>
</form>
@endif

@if(!empty($statEvalData))
<script type="application/json" id="stat-eval-data">
	{!! json_encode($statEvalData) !!}
</script>
@endif

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
				<th><a href="/profile/{{ $stat['id'] }}">{{ $stat["name"] }}</a></th>
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

@if(count($userStats) == 1)
<div class="container body-block">
	<div class="line-chart-container">
		<h3>Evaluation History</h3>
		<canvas id="line-chart"></canvas>
		<div id="line-chart-legend"></div>
	</div>
	<div class="col-sm-4 col-sm-offset-4">
		<label for="line-chart-set">Chart increment</label>
		<select class="form-control" id="line-chart-increment">
			<option value="1-month">Monthly</option>
			<option value="1-week">Weekly</option>
			<option value="1-day">Daily</option>
			<option value="1-year">Yearly</option>
		</select>
	</div>
</div>
@endif

@if(!empty($noneRequested))
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
@endif

@if(!empty($noneCompleted))
<div class="container body-block">
<h3>None Completed</h3>
<?php $tsv = ""; ?>
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
</div>
@endif

@if($type == "faculty" && !empty($averageCompletionTimes))
<div class="container body-block">
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
@endif

@if(!empty($lastCompleted))
<div class="container body-block">
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

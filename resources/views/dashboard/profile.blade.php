@extends("app")

@section("head")
	<style>
		.legend {
			display: table;
			list-style: none;
			padding-left: 20px;
			padding-right: 20px;
			padding-top: 10px;
			padding-bottom: 10px;
			margin: 0px auto;
			/*background-color: #bbbbbb;*/
		}
	</style>
@stop

@section("body")
	<h2 class="heading">{{ $profileUser->full_name }}</h2>
	@if(!empty($profileUser->photo_path))
	<img src="{{ $profileUser->photo_path }}" alt="{{ $profileUser->full_name }}" />
	@endif

	<table class="table" width="100%">
		<thead>
			<tr>
				<th>Last completed evaluation</th>
				<th>Evaluations personally requested since {{ $yearStart->toFormattedDateString() }}</th>
				<th>Total evaluations requested since {{ $yearStart->toFormattedDateString() }}</th>
				<th>Total evaluations completed since {{ $yearStart->toFormattedDateString() }}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{{ $lastCompleted }}</td>
				<td>{{ $requests }}</td>
				<td>{{ $totalRequests }}</td>
				<td>{{ $totalComplete }}</td>
			</tr>
		</tbody>
	</table>
</div>
<div class="container body-block">
	<div id="line-chart-container">
		<canvas id="line-chart"></canvas>
		<div id="line-chart-legend"></div>
	</div>
	<div class="col-sm-4 col-sm-offset-4">
		<label for="line-chart-set">Chart range</label>
		<select class="form-control" id="line-chart-set">
			<option value="year">1 year</option>
			<option value="month-3">3 months</option>
			<option value="month">1 month</option>
			<!-- <option value="training-level">Training level</option>
			<option value="alltime">All time</option> -->
		</select>
	</div>
</div>
<div class="container body-block">
	<table class="table table-striped datatable" id="user-profile-evaluations" width="100%">
		<thead>
			<tr>
				<th>#</th>
				<th>Evaluator</th>
				<th>Form</th>
				<th>Evaluation Date</th>
				<th>Requested</th>
				<th>Completed</th>
				<th>Status</th>
			</tr>
		</thead>
	</table>
@stop

@section("script")
	<script src="/js/Chart.js"></script>
	<script src="/js/evaluation-line-chart.js"></script>
	<script>
		var profileUser = {!! json_encode($profileUser) !!};
		var evals = {!! json_encode($evalData) !!};
		$("#user-profile-evaluations").DataTable({
			ajax: "evaluations/" + profileUser.id,
			"order": [[0, "desc"]],
			"createdRow": function(row, data, index){
				$("td", row).addClass("view");
			}
		});


		function drawChart(){
			var set = $("#line-chart-set").val();
			var range = set.split("-");
			var rangeIncrements = {
				"year": "month",
				"month-3": "week",
				"month": "day"
			};
			var increments = rangeIncrements[set];
			var chartData = getChartEvalData(evals, range[0], increments, range[1]);
			drawLineChart("#line-chart", chartData[0], chartData[1]);
		}

		$("#line-chart-set").change(drawChart);

		$(document).ready(function(){
			drawChart();
		});
	</script>
@stop

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

		.profile-image {
			text-align: center;
		}

		.profile-image img {
			width: 100%;
			max-width: 300px;
		}
	</style>
@stop

@section("body")
	<h2 class="heading">{{ $profileUser->full_name }}</h2>
	@if(!empty($profileUser->photo_path))
	<figure class="profile-image">
		<img src="/{{ $profileUser->photo_path }}" alt="{{ $profileUser->full_name }}" />
	</figure>
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
		<h3>Evaluation History</h3>
		<canvas id="line-chart"></canvas>
		<div id="line-chart-legend"></div>
	</div>
	<div class="col-sm-3 col-sm-offset-3">
		<label for="line-chart-range">Chart range</label>
		<select class="form-control" id="line-chart-range">
			<option value="1-year">1 year</option>
			<option value="3-month">3 months</option>
			<option value="1-month">1 month</option>
			<option value="training-level">Training level</option>
			<option value="all-time">All time</option>
		</select>
	</div>
	<div class="col-sm-3">
		<label for="line-chart-increment">Chart increment</label>
		<select class="form-control" id="line-chart-increment">
			<option value="1-month">Monthly</option>
			<option value="1-week">Weekly</option>
			<option value="1-day">Daily</option>
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
	<script>
		var profileUser = {!! json_encode($profileUser) !!};
		var evals = {!! json_encode($evalData) !!};
		var yearStart = "{{ $yearStart->toDateTimeString() }}";

		var useProfileEvaluationsTable = $("#user-profile-evaluations").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						evaluator: ["full_name"],
						form: ["title"]
					},
	@if($profileUser->isType("resident"))
					subject_id: profileUser.id
	@else
					evaluator_id: profileUser.id
	@endif
				},
				dataSrc: ""
			},
			columns: [
				{data: "url"},
				{data: "evaluator.full_name"},
				{data: "form.title"},
				{data: "evaluation_date", render: renderDateCell, createdCell: createDateCell},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: "status", render: renderEvaluationStatus}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});

		function drawChart(){
			var range = $("#line-chart-range").val();
			var startDate;
			if(range == "training-level"){
				startDate = moment(yearStart);
			}
			else if(range == "all-time"){
				startDate = moment(evals[0].request_date);
			}
			else{
				range = range.split("-");
				startDate = moment().subtract(range[0], range[1]);
			}
			var increment = $("#line-chart-increment").val().split("-");
			startDate.startOf(increment[1]);
			var endDate = moment();
			var chartData = getChartEvalData(evals, startDate, endDate, increment[1], increment[0]);
			drawLineChart("#line-chart", chartData[0], chartData[1]);
		}

		$("#line-chart-range, #line-chart-increment").change(drawChart);

		$(document).ready(function(){
			drawChart();
		});
	</script>
@stop

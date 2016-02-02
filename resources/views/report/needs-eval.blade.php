@extends("app")

@section("head")
	<style>
		.n { background-color: pink !important; }
		.y { background-color: lightgreen !important; }
		.glyphicon-ok { color: green !important; }
		.glyphicon-remove { color: red !important; }
		td { text-align: center; }
		.labelless-button {
			margin-top: 25px;
			text-align: center;
		}
	</style>
@stop

@section("body")
	<h2 class="header">Needs Evaluations</h2>
	<div id="needs-evals-form" class="form-horizontal report report-options">
		<div class="form-group">
			<div class="col-md-4">
				<label for="needs-start-date">Start Date</label>
				<input type="text" class="form-control datepicker startDate" id="needs-start-date" />
			</div>
			<div class="col-md-4">
				<label for="needs-end-date">End Date</label>
				<input type="text" class="form-control datepicker endDate" id="needs-end-date" />
			</div>
			<div class="col-md-4 labelless-button">
				<button type="button" class="btn lastThreeMonths">Last 3 months</button>
				<button type="button" class="btn lastSixMonths">Last 6 months</button>
			</div>
		</div>
		<div class="form-group">
			<div class="col-md-6">
				<label for="needs-training-level">Training Level</label>
				<select class="form-control" id="needs-training-level">
					<option value="all">All</option>
					<option value="intern">Intern</option>
					<option value="ca-1">CA-1</option>
					<option value="ca-2">CA-2</option>
					<option value="ca-3">CA-3</option>
					<option value="fellow">Fellow</option>
				</select>
			</div>
			<div class="col-md-6 labelless-button">
				<button type="button" class="btn btn-primary" id="needs-evals-submit">Get report</button>
			</div>
		</div>
	</div>
</div>

<div class="container body-block">
	<h2></h2>
	<div class="col-md-4">
		<div class="form-group">
			<label for="evaluation-threshold">Show residents with fewer than
				<select class="form-control" id="evaluation-threshold">
					<option value="1">1</option>
					<option value="3">3</option>
					<option value="5">5</option>
					<option value="all">All</option>
				</select>
				evaluations
			</label>
		</div>
	</div>
</div>

<div class="container body-block">
	<h2>Milestones</h2>
	<table class="table table-striped table-bordered datatable">
		<thead>
			<tr>
				<th>Resident/Fellow</th>
				@foreach($milestones as $milestone)
					<th nowrap>{{ $milestone->title }}</th>
				@endforeach
			</tr>
		</thead>
	</table>

	<form id="needs-evals-tsv-form" style="text-align: center;" method="post" target="_blank" action="/report/needs-eval/tsv">
		{!! csrf_field() !!}
		<input type="hidden" name="startDate" id="needs-tsv-start-date" />
		<input type="hidden" name="endDate" id="needs-tsv-end-date" />
		<input type="hidden" name="trainingLevel" id="needs-tsv-training-level" />
		<button class="btn btn-default" type="submit">Export TSV</button>
	</form>
@stop

@section("script")
	<script>
		var what = [];
		$(document).ready(function(){
			$("#needs-evals-form").find(".lastThreeMonths").trigger("click");
			submitNeedsEvals();
		});

		$("#needs-evals-submit").click(submitNeedsEvals);

		$("#needs-evals-tsv-form").on("submit", function(){
			$("#needs-tsv-start-date").val($("#needs-start-date").val());
			$("#needs-tsv-end-date").val($("#needs-end-date").val());
			$("#needs-tsv-training-level").val($("#needs-training-level").val());
		});

		function submitNeedsEvals(){
			var hasNoEvaluationString = "<span class='glyphicon glyphicon-remove'></span>";
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.startDate = $("#needs-start-date").val();
			data.endDate = $("#needs-end-date").val();
			data.trainingLevel = $("#needs-training-level").val();

			var table = $(".datatable").DataTable({
				"ajax": {
					"url": "/report/needs-eval/get",
					"type": "post",
					"data": data
				},
				"paging": false,
				"scrollX": true,
				"scrollY": "700px",
				"scrollCollapse": true,
				"destroy": true,
				"columnDefs": [{
					"targets": 0,
					"cellType": "th"
				}],
				// I can't seem to get this to work idk why
				// "drawCallback": function(settings){
				// 	var api = this.api()
				// 	var columns = api.columns();
				// 	for(var i = 1; i < columns.eq(0).length; i++){
				// 		var column = api.column(i);
				// 		var unique = column.data().unique();
				// 		if(unique.length == 1)
				// 			column.visible(false);
				// 	}
				// }
			});
			new $.fn.DataTable.FixedColumns(table);
		}
	</script>
@stop

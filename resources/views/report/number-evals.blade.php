@extends("app")

@section("head")
	<style>
		.labelless-button {
			margin-top: 25px;
			text-align: center;
		}
	</style>
@stop

@section("body")
	<h2 class="header">Number of Evaluations</h2>
	<div id="number-evals-form" class="form-horizontal report report-options">
		<div class="form-group">
			<div class="col-md-4">
				<label for="number-start-date">Start Date</label>
				<input type="text" class="form-control datepicker startDate" id="number-start-date" />
			</div>
			<div class="col-md-4">
				<label for="number-end-date">End Date</label>
				<input type="text" class="form-control datepicker endDate" id="number-end-date" />
			</div>
			<div class="col-md-4 labelless-button">
				<button type="button" class="btn lastThreeMonths">Last 3 months</button>
				<button type="button" class="btn lastSixMonths">Last 6 months</button>
			</div>
		</div>
		<div class="form-group">
			<div class="col-md-6">
				<label for="number-training-level">Training Level</label>
				<select class="form-control" id="number-training-level">
					<option value="all">All</option>
					<option value="intern">Intern</option>
					<option value="ca-1">CA-1</option>
					<option value="ca-2">CA-2</option>
					<option value="ca-3">CA-3</option>
					<option value="fellow">Fellow</option>
				</select>
			</div>
			<div class="col-md-6 labelless-button">
				<button type="button" class="btn btn-primary" id="number-evals-submit">Submit</button>
			</div>
		</div>
	</div>
</div>
<div class="container body-block">
	<table id="number-evals-table" class="table table-striped datatable" width="100%">
		<thead>
			<tr>
				<th>Name</th>
				<th>Evaluations</th>
			</tr>
		</thead>
	</table>
@stop

@section("script")
	<script>
		$(document).ready(function(){
			$("#number-evals-form").find(".lastThreeMonths").trigger("click");
			submitNumberEvals();
		});

		$("#number-evals-submit").click(submitNumberEvals);

		function submitNumberEvals(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.startDate = $("#number-start-date").val();
			data.endDate = $("#number-end-date").val();
			data.trainingLevel = $("#number-training-level").val();

			var table = $("#number-evals-table").DataTable({
				"ajax": {
					"url": "#",
					"type": "post",
					"data": data
				},
				"order": [[1, "asc"]],
				"destroy": true
			});
		}
	</script>
@stop

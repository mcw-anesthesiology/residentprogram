@extends("app")

@section("head")
	<style>
		.img-graphs {
			text-align: center;
			page-break-after: always;
		}
		.img-graph {
			width: 90%;
		}
		th {
			text-align: left;
		}
		.pdf-form {
			text-align: center;
		}
	</style>
@stop

@section("body")
	<table class="table table striped">
		<thead>
			<tr>
				<th>Name</th>
				<th>Training Level</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{{ $specificSubject->last_name }}, {{ $specificSubject->first_name }}</td>
				<td>{{ ucfirst($specificSubject->training_level) }}</td>
			</tr>
		</tbody>
	</table>

	@foreach($reportData as $reportNum => $report)
<?php
	$reportNumString = "";
	if(count($reportData) > 1)
		$reportNumString = $reportNum + 1;

	$subjectReportEvals = [];
	foreach($reportData as $report){
		$subjectReportEvals = array_merge($report["subjectReportEvaluations"], $subjectReportEvals);
	}
?>
</div>
<div class="container body-block">
		@if(count($subjectReportEvals) > 0)
	<h2 class="sub-header">Evaluations included in report {{ $reportNumString }} ({{ ucfirst($report["trainingLevel"]) }}: {{ $report["startDate"]->toFormattedDateString() }} - {{ $report["endDate"]->toFormattedDateString() }})</h2>
	<table class="table table-striped table-bordered datatable" id="report-evaluations-table" width="100%">
		<thead>
			<tr>
				<th>#</th>
				<th>Evaluation date</th>
				<th>Faculty</th>
				<th>Evaluation form</th>
			</tr>
		</thead>
		<tbody>
			@foreach($subjectReportEvals as $reportEvaluation)
			<tr>
				<td><a href="/evaluation/{{ $reportEvaluation->evaluation_id }}">{{ $reportEvaluation->evaluation_id }}</a></td>
				<td>
					{{ Carbon\Carbon::parse($reportEvaluation->evaluation_date_start)->format("F Y") }}
					—
					{{ Carbon\Carbon::parse($reportEvaluation->evaluation_date_end)->format("F Y") }}
				</td>
				<td>{{ $reportEvaluation->last_name }}, {{ $reportEvaluation->first_name }}</td>
				<td>{{ $reportEvaluation->form_title }}</td>
			</tr>
			@endforeach
		</tbody>
	</table>
		@else
	<p class="lead">No evaluations found in report parameters.</p>
		@endif

</div>
<div class="container body-block">
		<h3 class="sub-header">Report {{ $reportNumString }}</h3>
		<div class="row">
			<div class="report-milestones col-md-6">
				<h4>Milestones</h4>
				<table class="table table-striped datatable report-table" width="100%">
					<thead>
						<tr>
							<th>Milestone</th>
							<th>Average</th>
							<th>Standard Deviation</th>
							<th>Number of Evaluations</th>
						</tr>
					</thead>
					<tbody>
					@foreach($report["milestones"] as $milestoneId => $milestoneTitle)
						<tr>
							<th>{{ $milestoneTitle }}</th>
						@if(!isset($report["subjectMilestoneEvals"][$specificSubject->id][$milestoneId]) || $report["subjectMilestoneEvals"][$specificSubject->id][$milestoneId] == 0)
							<td></td>
							<td></td>
							<td>0</td>
						@else
							<td>{{ round($report["subjectMilestone"][$specificSubject->id][$milestoneId], 2) }}</td>
							<td>{{ round($report["subjectMilestoneDeviations"][$specificSubject->id][$milestoneId], 2) }}</td>
							<td>{{ $report["subjectMilestoneEvals"][$specificSubject->id][$milestoneId] }}</td>
						@endif
						</tr>
					@endforeach
					</tbody>
				</table>
			</div>

			<div class="report-competencies col-md-6">
				<h4>Competencies</h4>
				<table class="table table-striped datatable report-table" width="100%">
					<thead>
						<tr>
							<th>Competency</th>
							<th>Average</th>
							<th>Standard Deviation</th>
							<th>Number of Evaluations</th>
						</tr>
					</thead>
					<tbody>
					@foreach($report["competencies"] as $competencyId => $competencyTitle)
						<tr>
							<th>{{ $competencyTitle }}</th>
						@if(!isset($report["subjectCompetencyEvals"][$specificSubject->id][$competencyId]) || $report["subjectCompetencyEvals"][$specificSubject->id][$competencyId] == 0)
							<td></td>
							<td></td>
							<td>0</td>
						@else
							<td>{{ round($report["subjectCompetency"][$specificSubject->id][$competencyId], 2) }}</td>
							<td>{{ round($report["subjectCompetencyDeviations"][$specificSubject->id][$competencyId], 2) }}</td>
							<td>{{ $report["subjectCompetencyEvals"][$specificSubject->id][$competencyId] }}</td>
						@endif
						</tr>
					@endforeach
					</tbody>
				</table>
			</div>
		</div>

		<div class="graphs"></div>
	@endforeach
</div>
<div class="container body-block">
	<div class="form-horizontal new-graphs-container">
		<div class="form-group graph-type-container">
			<label for="graph-type" class="col-sm-2 col-sm-offset-4">Graph type</label>
			<div class="col-sm-2">
				<select id="graph-type" class="form-control">
					<option value="radar">Radar</option>
					<option value="line">Line</option>
					<option value="bar">Bar</option>
				</select>
			</div>
		</div>
		<div class="form-group graph-layout-container">
			<label for="graph-layout" class="col-sm-2 col-sm-offset-4">Graph layout</label>
			<div class="col-sm-2">
				<input type="checkbox" id="graph-layout" data-on-text="Vertical" data-off-text="Horizontal"
					data-on-color="primary" data-off-color="primary" checked />
			</div>
		</div>
	</div>
<?php
	$subjectTextResponses = [];
	foreach($reportData as $report){
		$subjectTextResponses = array_merge($report["subjectTextResponses"], $subjectTextResponses);
	}
?>
	@if(count($subjectTextResponses) > 0)
		<h2 class="sub-header">Comments</h2>
		<table class="table table-striped table-bordered datatable text-responses-table" width="100%">
			<thead>
				<tr>
					<th>Evaluation Date</th>
					<th>Faculty</th>
					<th>Evaluation Form</th>
					<th>Comment</th>
				</tr>
			</thead>
			<tbody>
		@foreach($subjectTextResponses as $response)
				<tr>
					<td>
						{{ Carbon\Carbon::parse($response->evaluation_date_start)->format("F Y") }}
						—
						{{ Carbon\Carbon::parse($response->evaluation_date_end)->format("F Y") }}
					</td>
					<td>{{ $response->last_name }}, {{ $response->first_name }}</td>
					<td>{{ $response->form_title }}</td>
					<td>{{ stripslashes(str_replace(['\r', '\n'], ' ',$response->response)) }}</td>
				</tr>
		@endforeach
			</tbody>
		</table>
	@else
		<p class="lead">No text responses to show</p>
	@endif
@stop

@section("script")
	<script>
	@if($graphOption != "none")
		var graphOption = "{{ $graphOption }}";
		var reportData = {!! json_encode($reportData) !!};
	@endif
		$(document).ready(function(){
			$(".text-responses-table").DataTable({
				"order": [[0, "asc"]]
			});

			$("#report-evaluations-table").DataTable({
				order: [[0, "desc"]]
			});

			$(".report-table").DataTable({
				"order": [[0, "asc"]]
			});

			$("#graph-layout").bootstrapSwitch();

			if(graphOption == "average")
				drawAverageRadarGraphs();
			else if(graphOption == "all")
				drawAllRadarGraphs();
		});
	</script>
@stop

@extends("app")

@section("head")
	<link href="/css/bootstrap-switch.min.css" rel="stylesheet" />
	<link href="/css/report-chartjs.css" rel="stylesheet" />
<?php
	ob_start();
?>
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
<?php
	$html = ob_get_flush();
?>
@stop

@section("body")
<?php
	ob_start();
?>
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
				<td>{{ $specificSubject->training_level }}</td>
			</tr>
		</tbody>
	</table>

	@foreach($reportData as $report)
</div>
<div class="container body-block">
		<h3 class="sub-header">{{ $report["startDate"]->toFormattedDateString() }} - {{ $report["endDate"]->toFormattedDateString() }} {{ strtoupper($report["trainingLevel"]) }}</h3>
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

		<div class="img-graphs">
		@if(count($report["graphs"] > 0))
			<img class="img-graph" src="/graph/{{ $report['graphs'][0] }}" />
		@endif
		</div>
		<div class="graphs"></div>
	@endforeach
</div>
<div class="container body-block">
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
					<td>{{ Carbon\Carbon::parse($response->evaluation_date)->format("F Y") }}</td>
					<td>{{ $response->last_name }}, {{ $response->first_name }}</td>
					<td>{{ $response->form_title }}</td>
					<td>{{ stripslashes(str_replace(['\r', '\n'], ' ',$response->response)) }}</td>
				</tr>
		@endforeach
			</tbody>
		</table>
	@else
		<h4>No text responses to show</h4>
	@endif
<?php
	$html .= ob_get_flush();
?>
	<div class="form-horizontal new-graphs-container">
		<div class="form-group">
			<label for="new-graphs" class="col-sm-2 col-sm-offset-4">Interactive graphs</label>
			<div class="col-sm-2">
				<input type="checkbox" id="new-graphs" checked />
			</div>
		</div>
		<br />
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
					data-on-color="primary" data-off-color="primary" />
			</div>
		</div>
	</div>
	<form method="post" target="_blank" action="/report/pdf" class="pdf-form">
		{{ csrf_field() }}
		<input type="hidden" name="view" value="individual" />
		<input type="hidden" name="data" value="{{ json_encode($html) }}" />
		<button type="submit" class="btn" name="name"
			value="Individual Report {{ $specificSubject->last_name }}, {{ $specificSubject->first_name}}">Export PDF</button>
	</form>
@stop

@section("script")
	<script src="/js/mdn-round.js"></script>
	<script src="/js/underscore-min.js"></script>
	<script src="/js/Chart.js"></script>
	<script src="/js/bootstrap-switch.min.js"></script>
	<script>
	@if($graphOption != "none")
		var graphOption = "{{ $graphOption }}";
		var reportData = {!! json_encode($reportData) !!};
	@endif
		$(document).ready(function(){
			$(".text-responses-table").DataTable({
				"order": [[0, "asc"]],
				stateSave: true,
				"dom": "lfprtip",
			});

			$(".report-table").DataTable({
				"order": [[0, "asc"]],
				stateSave: true,
				"dom": "lfprtip",
			});

			$(".img-graphs").hide();

			$("#new-graphs").bootstrapSwitch();
			$("#graph-layout").bootstrapSwitch();

			if(graphOption == "average")
				drawAverageGraphs();
			else if(graphOption == "all")
				drawAllGraphs();
		});
	</script>
	<script src="/js/report-chartjs.js"></script>
@stop

@extends("app")

@section("head")
<?php
	ob_start();
?>
	<style>
		.graphs {
			text-align: center;
			page-break-after: always;
		}
		.graph {
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

		<div class="graphs">
		@if(count($report["graphs"] > 0))
			<img class="graph" src="/graph/{{ $report['graphs'][0] }}" />
		@endif
		</div>
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
					<td>{{ Carbon\Carbon::parse($response->evaluation_date)->toFormattedDateString() }}</td>
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

	<form method="post" target="_blank" action="/report/pdf" class="pdf-form">
		{{ csrf_field() }}
		<input type="hidden" name="view" value="individual" />
		<input type="hidden" name="data" value="{{ json_encode($html) }}" />
		<button type="submit" class="btn" name="name"
			value="Individual Report {{ $specificSubject->last_name }}, {{ $specificSubject->first_name}}">Export PDF</button>
	</form>
@stop

@section("script")
	<script>
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
		});
	</script>
@stop

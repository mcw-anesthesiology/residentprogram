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
		<img src="{{ url($profileUser->photo_path) }}" alt="{{ $profileUser->full_name }}" />
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
	<table class="table table-striped datatable" id="user-profile-evaluations" width="100%">
		<thead>
			<tr>
				<th>#</th>
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
				{data: "form.title"},
				{
					data: null,
					render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
					createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
				},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: "status", render: renderEvaluationStatus}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});
	</script>
@stop

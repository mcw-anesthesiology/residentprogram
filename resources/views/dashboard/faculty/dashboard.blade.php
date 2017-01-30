@extends("app")

@section("body")
	@include("dashboard.faculty.".$user->type)
@stop

@section("script")
	<script>
		var user = {!! $user->toJson() !!};

	@if($user->isType("admin"))
		var adminFacultyEvalsTable = $("#admin-faculty-evals-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						subject: ["full_name"],
						evaluator: ["full_name"],
						form: ["title"]
					},
					whereHas: {
						form: {
							type: "faculty"
						}
					}
				},
				dataSrc: ""
			},
			columns: [
				{data: "url"},
				{data: "subject.full_name"},
				{data: "form.title"},
				{data: "evaluator.full_name"},
				{
					data: null,
					render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
					createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
				},
				{data: null, render: function(eval){
					return "";
				}}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});
	@elseif($user->isType("faculty"))
		var facultyFacultyEvaluationsTable = $("#faculty-faculty-evaluations-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						form: ["title"]
					},
					whereHas: {
						form: {
							type: "faculty"
						}
					},
					subject_id: user.id
				},
				dataSrc: ""
			},
			columns: [
				{data: "url", render: renderSubjectEvalUrl},
				{data: "form.title"}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});
	@endif
	</script>
@stop

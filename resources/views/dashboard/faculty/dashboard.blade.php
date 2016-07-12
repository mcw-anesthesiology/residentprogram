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
						evaluator: ["full_name"]
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
				{data: "evaluator.full_name"},
				{data: "evaluation_date", render: renderDateCell, createdCell: createDateCell},
				{data: null, render: function(eval){
					return "";
				}}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$("td", row).addClass("view-evaluation");
			}
		});
	@elseif($user->isType("faculty"))
		var facultyFacultyEvaluationsTable = $("#faculty-faculty-evaluations-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
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
				{data: "url"},
				{data: "evaluation_date", render: renderDateCell, createdCell: createDateCell}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$("td", row).addClass("view-evaluation");
			}
		});
	@endif
	</script>
@stop

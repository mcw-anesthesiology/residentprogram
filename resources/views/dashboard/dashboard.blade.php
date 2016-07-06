@extends("app")

@section("body")
	@include("dashboard.type.".$user->type)

	<!-- Cancel Modal -->
	<div class="modal fade bs-cancel-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalCancel" aria-hidden="true">
	  <div class="modal-dialog modal-sm">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	          <h4 class="modal-title" id="myModalCancel">Cancel evaluation</h4>
	      </div>
	      <div class="modal-body">
	        Are you sure you want to cancel this evaluation?
	      </div>
	      <div class="modal-footer modal-cancel">
	      	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      	<button type="button" class="btn btn-danger" id="submit-cancel-eval" value="">Cancel evaluation</button>
	      </div>
	    </div>
	  </div>
	</div>
@stop

@section("script")
	<script>
		var user = {!! $user->toJson() !!};
	@if($user->type == "admin")
		var flaggedEvaluationsTable = $("#flagged-evaluations-table").DataTable({
			ajax: {
				url: "/flagged_evaluations",
				data: {
					with: {
						evaluation: true,
						"evaluation.evaluator": true,
						"evaluation.subject": true
					}
				},
				dataSrc: ""
			},
			columns: [
				{data: "evaluation.url"},
				{data: "evaluation.evaluator.full_name"},
				{data: "evaluation.subject.full_name"},
				{data: "requested_action", render: function(action){
					var flaggedActions = {!! json_encode(Setting::get("flaggedActions")) !!};
					return flaggedActions[action];
				}},
				{data: "reason"},
				{data: null, orderable: false, searchable: false, render: function(flaggedEval){
					return '<button type="button" class="remove-flag btn btn-primary btn-xs" '
						+ 'data-id="' + flaggedEval.id + '"><span class="glyphicon glyphicon-ok"></span> '
						+ 'Complete</button>';
				}}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$("td", row).addClass("view-evaluation");
			}
		});

		var traineeEvaluationsTable = $("#trainee-evaluations-table").DataTable({
			ajax: {
				url: "/evaluations?limit=20",
				data: {
					with: {
						subject: [
							"full_name"
						],
						evaluator: [
							"full_name"
						],
						form: [
							"title"
						],
					},
					whereHas: {
						form: {
							type: ["resident", "fellow"],
							evaluator_type: "faculty"
						}
					}
				},
				dataSrc: ""
			},
			columns: [
				{data: "url"},
				{data: "subject.full_name"},
				{data: "evaluator.full_name"},
				{data: "form.title"},
				{data: "evaluation_date", render: renderTableEvaluationDate, createdCell: createDateCell},
				{data: "request_date", render: renderTableDate, createdCell: createDateTimeCell},
				{data: "complete_date", render: renderTableDate, createdCell: createDateTimeCell},
				{data: "status", render: renderEvaluationStatus}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$("td", row).addClass("view-evaluation");
			},
			deferRender: true,
			initComplete: unlimitRestTableEvals
		});

		var selfEvaluationsTable = $("#self-evaluations-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						evaluator: [
							"full_name"
						],
						form: [
							"title"
						]
					},
					whereHas: {
						form: {
							evaluator_type: "self"
						}
					}
				},
				dataSrc: ""
			},
			columns: [
				{data: "url"},
				{data: "evaluator.full_name"},
				{data: "form.title"},
				{data: "evaluation_date", render: renderTableEvaluationDate, createdCell: createDateCell},
				{data: "complete_date", render: renderTableDate, createdCell: createDateTimeCell},
				{data: "status", render: renderEvaluationStatus},
				{data: null, orderable: false, searchable: false, render: function(eval){
					return ""; // FIXME
				}}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$("td", row).addClass("view-evaluation");
			}
		});

		var staffEvaluationsTable = $("#staff-evaluations-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						evaluator: [
							"full_name"
						],
						subject: [
							"full_name"
						],
						form: [
							"title"
						]
					},
					whereHas: {
						form: {
							evaluator_type: "staff"
						}
					}
				},
				dataSrc: ""
			},
			columns: [
				{data: "url"},
				{data: "subject.full_name"},
				{data: "evaluator.full_name"},
				{data: "form.title"},
				{data: "evaluation_date", render: renderTableEvaluationDate, createdCell: createDateCell},
				{data: "request_date", render: renderTableDate, createdCell: createDateTimeCell},
				{data: "complete_date", render: renderTableDate, createdCell: createDateTimeCell},
				{data: "status", render: renderEvaluationStatus}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$("td", row).addClass("view-evaluation");
			}
		});
	@elseif($user->type == "faculty")
		var pendingFacultyEvaluatorTable = $("#pending-faculty-evaluator-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						subject: [
							"full_name"
						],
						form: [
							"title"
						]
					},
					evaluator_id: user.id,
					status: "pending"
				},
				dataSrc: ""
			},
			columns: [
				{data: "url"},
				{data: "subject.full_name"},
				{data: "form.title"},
				{data: "request_date", render: renderTableDate, createdCell: createDateTimeCell},
				{data: null, orderable: false, searchable: false, render: function(eval){
					if(eval.requested_by_id === user.id)
						return '<button class="btn btn-danger btn-xs cancel-eval-button" '
							+ 'data-id="' + eval.id + '"><span class="glyphicon glyphicon-remove"></span> '
							+ 'Cancel</button>';

					return "";
				}}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$("td", row).addClass("view-evaluation");
			}
		});
	@elseif($user->type == "resident")

	@elseif($user->type == "staff")

	@endif

		var menteeTables = {};
		$(".mentee-evaluations-table").each(function(){
			var menteeId = $(this).data("id");
			menteeTables[menteeId] = $(this).DataTable({
				ajax: {
					url: "/evaluations",
					data: {
						with: {
							evaluator: [
								"full_name"
							],
							form: [
								"title"
							]
						},
						subject_id: menteeId,
						status: "complete"
					},
					dataSrc: ""
				},
				columns: [
					{data: "url"},
					{data: "evaluator.full_name", render: function(name){
						if(!name)
							return "Anonymous";
						return name;
					}},
					{data: "form.title"},
					{data: "evaluation_date", render: renderTableEvaluationDate, createdCell: createDateCell},
					{data: "request_date", render: renderTableDate, createdCell: createDateTimeCell},
					{data: "complete_date", render: renderTableDate, createdCell: createDateTimeCell}
				],
				order: [[0, "desc"]],
				createdRow: function(row){
					$("td", row).addClass("view-evaluation");
				}
			});
		});

		var watchedFormTables = {};
		$(".watched-form-table").each(function(){
			var formId = $(this).data("id");
			watchedFormTables[formId] = $(this).DataTable({
				ajax: {
					url: "/evaluations",
					data: {
						with: {
							subject: true,
							evaluator: true
						},
						form_id: formId,
						status: "complete"
					},
					dataSrc: ""
				},
				columns: [
					{data: "url"},
					{data: "subject.full_name"},
					{data: "evaluator.full_name"},
					{data: "evaluation_date", render: renderTableEvaluationDate, createdCell: createDateCell},
					{data: "complete_date", render: renderTableDate, createdCell: createDateTimeCell},
					{data: "status", render: renderEvaluationStatus},
					{data: null, orderable: false, searchable: false, render: function(eval){
						return "";
					}}
				],
				order: [[0, "desc"]],
				createdRow: function(row){
					$("td", row).addClass("view-evaluation");
				}
			});
		});

		$(".table").on("click", ".cancel-eval-button", function(event){
			var id = $(this).data("id");
			$(".modal-cancel #submit-cancel-eval").val(id);
			$(".bs-cancel-modal-sm").modal("toggle");
		});

		$("#submit-cancel-eval").click(function(event){
			event.preventDefault();
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";

			var evalId = $(this).val();

			var row = $("#cancel-" + data.id).parents("tr");

			$.ajax({
				url: "/evaluations/" + evalId + "/cancel",
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if(response == "success"){
					if(row.siblings().length == 0){
						var bodyBlock = row.parents(".body-block");
						bodyBlock.velocity("fadeOut", function(){
							bodyBlock.html("<h2>You have no pending evaluations</h2>");
							bodyBlock.velocity("fadeIn");
						});
					}
					else{
						row.velocity("fadeOut", function(){
							$(".datatable-pending").DataTable({
								retrieve: true
							}).row(row).remove().draw(false);
						});
					}
				}
				else
					alert(response);
			}).fail(function(){
				alert("Error removing evaluation.")
			});

			$(".bs-cancel-modal-sm").modal("toggle");
		});

		$(".table").on("click", ".remove-flag", function(event){
			event.stopPropagation();
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "DELETE";
			var flaggedEvalId = $(this).data("id");

			var row = $(this).parents("tr");

			$.ajax({
				url: "/flagged_evaluations/" + flaggedEvalId,
				method: "POST", // DELETE
				data: data
			}).done(function(response){
				if(response == "success")
					if(row.siblings().length == 0)
						row.parents(".body-block").velocity("fadeOut", function(){
							$(this).remove();
						});
					else
						row.velocity("fadeOut", function(){
							$(".datatable-flagged").DataTable({
								retrieve: true
							}).row(row).remove().draw(false);
						});
				else
					alert("Error: " + response);
			}).fail(function(){
				alert("Error removing flag");
			});
		});

		$(document).ready(function(){
			var data = {};
			data._token = "{{ csrf_token() }}";

			$(".datatable-flagged").DataTable({
				"ajax": {
					"url": "/dashboard/evaluations/flagged",
					"data": data,
					"type": "post"
				},
				"order": [[0, "desc"]],
				"createdRow": function(row, data, index){
					$("td", row).addClass("view-evaluation");
				}
			});

			$(".datatable-staff").DataTable({
				"ajax": {
					"url": "/dashboard/evaluations/staff",
					"data": data,
					"type": "post"
				},
				"order": [[0, "desc"]],
				"createdRow": function(row, data, index){
					$("td", row).addClass("view-evaluation");
				}
			});

			$(".datatable-all").DataTable({
				"ajax": "/dashboard/evaluations/20",
				"order": [[0, "desc"]],
				"createdRow": function(row, data, index){
					$("td", row).addClass("view-evaluation");
				},
				deferRender: true,
				"initComplete": unlimitTableEvals
			});

			data.type = "pending";
			$("#pending-evaluator-table").DataTable({
				ajax: {
					url: "/dashboard/evaluations/evaluator",
					data: data,
					type: "post"
				},
				order: [[0, "desc"]],
				createdRow: function(row){
					$("td", row).addClass("view-evaluation");
				}
			});

			data.type = "pending";
			$(".datatable-staff-pending").DataTable({
				"ajax": {
					"url": "dashboard/evaluations/staff",
					"data": data,
					"type": "post"
				},
				"order": [[0, "desc"]],
				responsive: {
					details: {
						type: false
					}
				},
				"createdRow": function(row, data, index){
					$("td", row).addClass("view-evaluation");
				}
			});

			data.type = "complete";
			$(".datatable-staff-complete").DataTable({
				"ajax": {
					"url": "dashboard/evaluations/staff",
					"data": data,
					"type": "post"
				},
				"order": [[0, "desc"]],
				responsive: {
					details: {
						type: false
					}
				},
				"createdRow": function(row, data, index){
					$("td", row).addClass("view-evaluation");
				}
			});

			data.type = "pending";
			$(".datatable-pending").DataTable({
				"ajax": {
					"url": "dashboard/evaluations",
					"data": data
				},
				"order": [[0, "desc"]],
				"createdRow": function(row, data, index){
					$("td", row).addClass("view-evaluation");
				}
			});

			data.type = "pending";
			$("#pending-self-table").DataTable({
				ajax: {
					url: "dashboard/evaluations/self",
					data: data,
					type: "post"
				},
				order: [[0, "desc"]],
				createdRow: function(row, data, index){
					$("td", row).addClass("view-evaluation");
				}
			});

			data.type = "complete";
			$(".datatable-complete").DataTable({
				"ajax": {
					"url": "dashboard/evaluations/20",
					"data": data,
				},
				"order": [[0, "desc"]],
				"createdRow": function(row, data, index){
					$("td", row).addClass("view-evaluation");
				},
				"initComplete": unlimitTableEvals
			});

			data.type = "mentor";
			$(".datatable-mentee").each(function(){
				data.mentee_id = $(this).data("id");
				$(this).DataTable({
					"ajax": {
						"url": "dashboard/evaluations/20",
						"data": data
					},
					"order": [[0, "desc"]],
					"createdRow": function(row, data, index){
						$("td", row).addClass("view-evaluation");
					},
					"initComplete": unlimitTableEvals
				});
			});

			data.type = "complete";
			$(".datatable-watched-form").each(function(){
				data.form_id = $(this).data("id");
				$(this).DataTable({
					ajax: {
						url: "/dashboard/evaluations/form",
						data: data,
						method: "POST"
					},
					order: [[0, "desc"]],
					createdRow: function(row){
						$("td", row).addClass("view-evaluation");
					}
				});
			});
		});
	</script>
@stop

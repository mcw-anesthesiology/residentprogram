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
	@if($user->isType("admin"))
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
				$(row).addClass("view-evaluation");
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
				{
					data: null,
					render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
					createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
				},
				{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: "status", render: renderEvaluationStatus},
				{data: null, orderable: false, searchable: false, render: function(eval){
					return ""; // FIXME
				}}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
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
	@elseif($user->isType("faculty"))
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
				{data: "url", render: renderEvaluatorEvalUrl},
				{data: "subject.full_name"},
				{data: "form.title"},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
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
				$(row).addClass("view-evaluation");
			}
		});

		var completeFacultyEvaluatorTable = $("#complete-faculty-evaluator-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						subject: ["full_name"],
						form: ["title"],
					},
					evaluator_id: user.id,
					status: "complete"
				},
				dataSrc: ""
			},
			columns: [
				{data: "url"},
				{data: "subject.full_name"},
				{data: "form.title"},
				{
					data: null,
					render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
					createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
				},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});
	@elseif($user->isType("resident"))
		var pendingResidentSubjectTable = $("#pending-resident-subject-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						evaluator: ["full_name"],
						form: ["title"]
					},
					subject_id: user.id,
					status: "pending",
					visibility: "visible"
				},
				dataSrc: ""
			},
			columns: [
				{data: "url"},
				{data: "evaluator.full_name", render: function(name){
					if(!name)
						return '<i>Anonymous</i>';

					return name;
				}},
				{data: "form.title"},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: null, render: function(eval){
					if(eval.requested_by_id === user.id)
						return '<button class="btn btn-danger btn-xs cancel-eval-button" '
							+ 'data-id="' + eval.id + '"><span class="glyphicon glyphicon-remove"></span> '
							+ 'Cancel</button>';

					return '';
				}}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});

		var pendingResidentEvaluatorTable = $("#pending-resident-evaluator-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						subject: ["full_name"],
						form: ["title"]
					},
					evaluator_id: user.id,
					status: "pending"
				},
				dataSrc: ""
			},
			columns: [
				{data: "url", render: renderEvaluatorEvalUrl},
				{data: "subject.full_name"},
				{data: "form.title"},
				{
					data: null,
					render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
					createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
				},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: null, render: function(eval){
					if(eval.requested_by_id === user.id)
						return '<button class="btn btn-danger btn-xs cancel-eval-button" '
							+ 'data-id="' + eval.id + '"><span class="glyphicon glyphicon-remove"></span> '
							+ 'Cancel</button>';

					return '';
				}}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});

		var completeResidentEvaluationsTable = $("#complete-resident-evaluations-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						evaluator: ["full_name"],
						form: ["title", "evaluator_type"]
					},
					whereHas: {
						form: {
							evaluator_type: "faculty"
						}
					},
					subject_id: user.id,
					status: "complete"
				},
				dataSrc: ""
			},
			columns: [
				{data: "url", render: renderSubjectEvalUrl},
				{data: "evaluator.full_name", render: function(name){
					if(!name)
						return '<i>Anonymous</i>';

					return name;
				}},
				{data: "form.title"},
				{
					data: null,
					render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
					createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
				},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});

		var completeResidentStaffEvaluationsTable = $("#complete-resident-staff-evaluations-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						evaluator: ["full_name"],
						form: ["title", "evaluator_type"]
					},
					whereHas: {
						form: {
							evaluator_type: "staff"
						}
					},
					subject_id: user.id
				},
				dataSrc: ""
			},
			columns: [
				{data: "url", render: renderSubjectEvalUrl},
				{data: "evaluator.full_name", render: function(name){
					if(!name)
						return '<i>Anonymous</i>';

					return name;
				}},
				{data: "form.title"},
				{
					data: null,
					render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
					createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
				},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});

		var completeResidentSelfEvaluationsTable = $("#complete-resident-self-evaluations-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						form: ["title", "evaluator_type"]
					},
					whereHas: {
						form: {
							evaluator_type: "self"
						}
					},
					evaluator_id: user.id,
					subject_id: user.id
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
				{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});
	@elseif($user->isType("staff"))
		var pendingStaffEvaluatorTable = $("#pending-staff-evaluator-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						form: ["title"],
						subject: ["full_name"]
					},
					evaluator_id: user.id,
					status: "pending"
				},
				dataSrc: ""
			},
			columns: [
				{data: "url", render: renderEvaluatorEvalUrl},
				{data: "subject.full_name"},
				{data: "form.title"},
				{
					data: null,
					render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
					createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
				},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});

		var completeStaffEvaluatorTable = $("#complete-staff-evaluator-table").DataTable({
			ajax: {
				url: "/evaluations",
				data: {
					with: {
						form: ["title"],
						subject: ["full_name"]
					},
					evaluator_id: user.id,
					status: "complete"
				},
				dataSrc: ""
			},
			columns: [
				{data: "url"},
				{data: "subject.full_name"},
				{data: "form.title"},
				{
					data: null,
					render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
					createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
				},
				{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell}
			],
			order: [[0, "desc"]],
			createdRow: function(row){
				$(row).addClass("view-evaluation");
			}
		});
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
							return '<i>Anonymous</i>';
						return name;
					}},
					{data: "form.title"},
					{
						data: null,
						render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
						createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
					},
					{data: "request_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
					{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell}
				],
				order: [[0, "desc"]],
				createdRow: function(row){
					$(row).addClass("view-evaluation");
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
					{
						data: null,
						render: renderDateRangeCell('evaluation_date_start', 'evaluation_date_end'),
						createdCell: createDateRangeCell('evaluation_date_start', 'evaluation_date_end')
					},
					{data: "complete_date", render: renderDateTimeCell, createdCell: createDateTimeCell},
					{data: "status", render: renderEvaluationStatus},
					{data: null, orderable: false, searchable: false, render: function(eval){
						return "";
					}}
				],
				order: [[0, "desc"]],
				createdRow: function(row){
					$(row).addClass("view-evaluation");
				}
			});
		});

		$(".table").on("click", ".cancel-eval-button", function(event){
			event.stopPropagation();
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

			var row = $(".cancel-eval-button[data-id='" + evalId + "']").parents("tr");

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
					appendAlert(response);
			}).fail(function(){
				appendAlert("Error removing evaluation.");
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
	</script>
@stop

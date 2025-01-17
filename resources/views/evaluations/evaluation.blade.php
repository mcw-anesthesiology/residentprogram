@extends("app")

@section("head")
	<style>
		#evaluation-controls {
			margin-bottom: 10px;
		}

		#evaluation-comment-alert {
			margin-top: 20px;
		}

		#flag-evaluation-requested-action-group label {
			font-weight: normal;
		}

		#flag-evaluation-requested-action-group input[type="radio"] {
			margin-left: 10px;
		}

		#evaluation-info-table {
			margin-bottom: 20px;
		}

		#evaluation-info-table td, #evaluation-info-table th {
			word-wrap: break-word;
		}

		.evaluation-date-container {
			font-size: 1.5em;
		}

		.subject-image {
			text-align: center;
		}

		.subject-image img {
			width: 300px;
		}

		.request-note-container {
			padding: 2em;
		}

		.evaluation-request-note div {
			padding: 2em;
			border-radius: 4px;
			background-color: rgba(0, 0, 0, 0.05);
			border: 1px solid rgba(0, 0, 0, 0.1);
		}

		.evaluation-comment-section {

		}

		hr {
			page-break-before: always;
		}

		.bottom-comment-container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.bottom-comment-container small {
			display: block;
			margin: 2em 0 0;
		}
	</style>
@stop

@section("blockless-body")
<div class="container body-block">
	<div id="evaluation-header">
	@if($evaluation->status == "pending" && $user->id == $evaluation->evaluator_id)
		<h1 class="header">Complete Evaluation</h1>
	@else
		<h1 class="header">View Evaluation</h1>
	@endif

		<div id="evaluation-controls" class="noprint">
	@if($evaluation->evaluator_id == $user->id)
			<button type="button"
					class="btn btn-info"
					data-toggle="modal"
					data-target="#edit-evaluation-modal"
					id="edit-evaluation"
		@if($evaluation->status != "pending")
					disabled
					title="Completed evaluations cannot be edited"
		@elseif($user->id != $evaluation->requested_by_id)
					disabled
					title="You can only edit evaluations you created"
		@endif
					>
				<span class="glyphicon glyphicon-edit"></span>
				Edit evaluation
			</button>
			<button type="button"
					class="btn btn-warning"
					data-toggle="modal"
					data-target="#flag-evaluation-modal"
					id="mark-evaluation">
				<span class="glyphicon glyphicon-flag"></span>
				Problem with evaluation?
			</button>
			<button type="button" v-if="canDecline" v-cloak
					class="btn btn-danger"
					@click="show.modals.decline = true">
				<span class="glyphicon glyphicon-remove"></span>
				Decline evaluation
			</button>

			<a tabindex="0" role="button" data-toggle="popover" data-trigger="focus" placement="left" title="Controls information" class="close" id="evaluation-controls-info">
				<span class="glyphicon glyphicon-info-sign"></span>
			</a>
	@elseif($user->isType("admin"))
			<button class="btn btn-info" data-toggle="modal" data-target="#edit-evaluation-modal" id="edit-evaluation"><span class="glyphicon glyphicon-edit"></span> Edit evaluation</button>
			<button class="btn btn-info" data-toggle="modal" data-target="#evaluation-hash-modal" id="edit-hash"><span class="glyphicon glyphicon-link"></span> Personalized completion link</Button>
	@endif
		</div>

		<bootstrap-modal v-if="show.modals.decline" v-cloak
				@close="show.modals.decline = false">
			<span slot="header" class="modal-title">Decline evaluation</span>

			<div class="form-group">
				<label class="containing-label">
					Decline reason
					<textarea class="form-control" v-model="decline.reason"
						placeholder="Please describe why you feel unable to complete this evaluation">
					</textarea>
					<small>Reason will be displayed to trainee.</small>
				</label>

				<alert-list v-model="decline.alerts"></alert-list>
			</div>

			<div slot="footer" class="text-right">
				<button type="button" class="btn btn-danger"
						@click="declineEvaluation">
					<span class="glyphicon glyphicon-remove"></span>
					Decline evaluation request
				</button>
				<button type="button" class="btn btn-default"
						@click="show.modals.decline = false">
					Cancel
				</button>
			</div>
		</bootstrap-modal>

		<div class="panel panel-default">
			<div class="panel-heading">
				<h2 class="panel-title">Evaluation Information</h2>
			</div>
			<table class="table" id="evaluation-info-table">
				<thead>
					<tr>
						<th>#</th>
@if($user->id != $evaluation->subject_id && $evaluation->form->evaluator_type != "self")
						<th>{{ ucfirst($evaluation->subject->type) }}</th>
@endif
@if($user->isType("admin"))
						<th>{{ ucfirst($evaluation->evaluator->type) }}</th>
@endif
@if($evaluation->status == "complete")
						<th>Evaluation Date</th>
@endif
@if(!$evaluation->isAnonymousToUser())
						<th>
							{{
								($user->id == $evaluation->requested_by_id && $user->id == $evaluation->evaluator_id)
									? 'Created'
									: 'Requested'
							}}
						</th>
	@if($evaluation->status == "complete")
						<th>Completed</th>
	@endif
@endif
						<th>Status</th>
@if($evaluation->subject->isType("resident"))
						<th>Training Level</th>
@endif
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ $evaluation->viewable_id }}</td>
@if($user->id != $evaluation->subject_id && $evaluation->form->evaluator_type != "self")
						<td>{!! $subjectString !!}</td>
@endif
@if($user->isType("admin"))
						<td>{!! $evaluatorString !!}</td>
@endif
@if($evaluation->status == "complete")
						<td>
							{{ $evaluation->evaluation_date_start->format("F Y") == $evaluation->evaluation_date_end->format("F Y")
								? $evaluation->evaluation_date_start->format("F Y")
								: $evaluation->evaluation_date_start->format("F Y") . ' — ' . $evaluation->evaluation_date_end->format("F Y")
							}}
						</td>
@endif
@if(!$evaluation->isAnonymousToUser())
						<td>{{ $evaluation->request_date }}</td>
	@if($evaluation->status == "complete")
						<td>{{ $evaluation->complete_date }}</td>
	@endif
@endif
						<td>{!! $statusLabel !!}</td>
@if(!$evaluation->subject->isType("faculty"))
						<td>{{ $evaluationTrainingLevel }}</td>
@endif
					</tr>
				</tbody>
			</table>
		</div>

@if($evaluation->comment)
	@if($evaluation->status == 'declined')
		<div class="well evaluation-comment-section">
			<h3 class="sub-header">Decline reason</h3>
			<p>
				{{ $evaluation->comment }}
			</p>
		</div>
	@elseif($evaluation->userFullDisclosure($user))
		<div class="well evaluation-comment-section">
			<h3 class="sub-header">Evaluation Comment</h3>
			<p>
				{{ $evaluation->comment }}
			</p>
		</div>
	@endif
@endif

@if($evaluation->subject->photo_path && $evaluation->subject_id != $user->id)
		<div class="subject-image">
			<img src="{{ url($evaluation->subject->photo_path) }}" />
		</div>
@endif

@if(!empty($evaluation->request_note))
		<div class="request-note-container">
			<p>
				<i>
					Note from requestor
	@if (!empty($evaluation->requestor))
					({{ $evaluation->requestor->first_name }} {{$evaluation->requestor->last_name}}):
	@endif
				</i>
			</p>

			<blockquote class="evaluation-request-note">
				<div>
					{!! $evaluation->request_note !!}
				</div>
			</blockquote>
		</div>
@endif

	</div>
</div>

<div class="container body-block">
	<div id="form">
	@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id)
			<form id="evaluation" role="form" method="post" action="#" @submit="handleSubmit">
				{!! csrf_field() !!}
	@endif
				<div class="well well-lg text-center evaluation-date-container">
					{{ $evaluation->evaluation_date_start->toFormattedDateString() }}
					—
					{{ $evaluation->evaluation_date_end->toFormattedDateString() }}
				</div>


				{!! App\Helpers\FormReader::read($evaluation->form->xml_path) !!}

				<hr />

				<beyond-milestones ref="beyondMilestones" :user="user" :evaluation="evaluation"></beyond-milestones>

	@if($evaluation->evaluator_id == $user->id && $evaluation->subject_id != $user->id)
		@verbatim
			<div class="well bottom-comment-container" v-cloak>
				<div v-if="comment.value || show.confidentialComment">
					<div class="form-group">
						<label class="containing-label">
							Confidential evaluation comment
							<textarea class="form-control" name="comment"
								rows="5" cols="80" v-model="comment.value"
							></textarea>
						</label>
					</div>
					<div class="text-center">
						<button type="button"
							class="btn btn-primary"
							@click="handleCommentSubmit"
						>
							Save
						</button>
						<button type="button"
							class="btn btn-default"
							v-if="show.confidentialComment && !comment.value"
							@click="show.confidentialComment = false"
						>
							Cancel
						</button>
						<confirmation-button v-else
							class="btn btn-danger"
							@click="clearComment"
						>
							<span class="glyphicon glyphicon-trash"></span>
							Remove comment
						</confirmation-button>
					</div>
				</div>
				<button v-else type="button"
					class="btn btn-primary"
					id="comment-evaluation"
					@click="show.confidentialComment = true"
				>
					<span class="glyphicon glyphicon-pencil"></span>
					Add confidential evaluation comment
				</button>

				<small>
					Add a comment only to be seen by administrators and program directors,
					not by the trainee.
				</small>

				<alert-list v-model="comment.alerts"></alert-list>
			</div>
		@endverbatim
	@endif

	@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id)
				<div class="submit-container text-center">
					<button type="submit" id="complete-form" name="evaluation_id"
						value="{{ $evaluation->viewable_id }}"
						class="btn btn-primary btn-lg"
					>
						{{ config('constants.COMPLETE_EVAL_TEXT') }}
					</button>
					<button type="submit" id="save-form" name="evaluation_id_saved"
						value="{{ $evaluation->viewable_id }}"
						class="btn btn-default btn-lg"
						formnovalidate
						@click="saveForm = true"
					>
						{{ config('constants.SAVE_EVAL_TEXT') }}
					</button>
				</div>
			</form>
	@endif
	</div>
</div>

	@if($evaluation->evaluator_id == $user->id || $user->isType("admin"))
	<!-- Evaluation comment modal -->
	<div class="modal fade" id="evaluation-comment-modal" tabindex="-1" role="dialog" aria-labelledby="evaluation-comment-label">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="evaluation-comment-label">Evaluation comment</h4>
				</div>
				<div class="modal-body">
					<p>
						Add explanatory comment or clarification about evaluation, not to be seen by {{ strtolower($subjectType) }}.
					</p>
					<div class="form-group">
						<label for="evaluation-comment">Comment</label>
						<textarea class="form-control" id="evaluation-comment">{{ $evaluation->comment }}</textarea>
					</div>
					<div class="alert" role="alert" id="evaluation-comment-alert">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" id="submit-evaluation-comment">Save comment</button>
				</div>
			</div>
		</div>
	</div>

		@if(($evaluation->status == "pending" && $user->id == $evaluation->requested_by_id) || $user->isType("admin"))
	<!-- Edit evaluation modal -->
	<div class="modal fade" id="edit-evaluation-modal" tabindex="-1" role="dialog" aria-labelledby="edit-evaluation-label">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<form method="POST" action="/evaluations/{{ $evaluation->viewable_id }}/edit" role="form" id="edit-evaluation-form">
					<input type="hidden" name="_method" value="PATCH" />
					{!! csrf_field() !!}
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="edit-evaluation-label">Edit evaluation</h4>
					</div>
					<div class="modal-body">
						<p>
							Modify subject or evaluation form.
						</p>
						<div class="form-group">
							<label for="evaluation-subject">{{ $subjectType }}</label>
							<select class="form-control edit-evaluation-select2" id="evaluation-subject" name="subject_id" style="width: 100%">
								<option value="">Select subject</option>
			@foreach($possibleSubjects as $possibleSubject)
								<option value="{{ $possibleSubject->id }}">{{ $possibleSubject->full_name }}</option>
			@endforeach
							</select>
						</div>
						<div class="form-group">
							<label for="evaluation-form">Evaluation form</label>
							<select class="form-control edit-evaluation-select2" id="evaluation-form" name="form_id" style="width: 100%" @if($evaluation->responses->count() != 0 || $evaluation->textResponses->count() != 0) disabled title="Cannot change form for evaluations with saved responses." @endif>
								<option value="">Select form</option>
			@foreach($possibleForms as $possibleForm)
								<option value="{{ $possibleForm->id }}">{{ $possibleForm->title }}</option>
			@endforeach
							</select>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<button type="submit" class="btn btn-info">Save changes</button>
					</div>
				</form>
			</div>
		</div>
	</div>
		@endif

	<!-- Flag evaluation modal -->
	<div class="modal fade" id="flag-evaluation-modal" tabindex="-1" role="dialog" aria-labelledby="flag-evaluation-label">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<form id="flag-evaluation-form" method="POST" action="/flagged_evaluations" role="form">
					{!! csrf_field() !!}
					<input type="hidden" name="evaluation_id" value="{{ $evaluation->viewable_id }}"  />
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="flag-evaluation-label">Flag evaluation</h4>
					</div>
					<div class="modal-body">
						<p>
							Request that this evaluation be removed or modified by an administrator.
						</p>
						<label>What should be done to the evaluation?</label>
						<div class="form-group" id="flag-evaluation-requested-action-group">
		@foreach($flaggedActions as $key => $text)
							<label>
								<input type="radio" name="requested_action" value="{{ $key }}" required /> {{ $text }}
							</label>
		@endforeach
						</div>
						<div class="form-group">
							<label for="flag-evaluation-reason">What's wrong?</label>
							<textarea class="form-control" id="flag-evaluation-reason" name="reason" required>@if($evaluation->flag){{ $evaluation->flag->reason }}@endif</textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<button type="submit" class="btn btn-warning">Flag evaluation</button>
					</div>
				</form>
			</div>
		</div>
	</div>

		@if($user->isType("admin"))
	<!-- Evaluation completion link modal -->
	<div class="modal fade" id="evaluation-hash-modal" tabindex="-1" role="dialog" aria-labelledby="evaluation-hash-label">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<form method="post" action="/evaluations/{{ $evaluation->id }}/hash">
					{!! csrf_field() !!}
					<input type="hidden" name="_method" value="PATCH" />
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="close"><span aria-hidden="true">&times;</span></button>
						<h3 id="evaluation-hash-label">Evaluation completion link</h3>
					</div>
					<div class="modal-body">
						<p id="evaluation-hash-body-text">
				@if(is_null($evaluation->completion_hash))
							There was no completion link sent. Would you like to create a new one?
				@elseif($evaluation->hash_expires < Carbon\Carbon::now())
							The link has expired. Would you like to resend it?
				@else
							A link has been sent, it expires <b>{{ $evaluation->hash_expires }}</b>. Are you sure you want to resend the completion link?
				@endif
						</p>
						<div class="form-group">
							<label for="evaluation-hash-expires-in">New link expires</label>
							<select class="form-control" name="hash_expires_in">
								<option value="30">30 days</option>
								<option value="60">60 days</option>
								<option value="90">90 days</option>
								<option value="never">Never expires</option>
							</select>
						</div>
						<button type="submit" name="action" value="new" class="btn btn-warning evaluation-hash-edit">
							Create and send new link
						</button>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							Cancel
						</button>
						<button type="submit" class="btn btn-danger evaluation-hash-edit" name="action" value="void">
							Void link
						</button>
						<button type="submit" class="btn btn-primary evaluation-hash-edit" name="action" value="resend">
							Resend link
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
		@endif
	@endif
@stop

@section("script")
	<script>
		var evaluationId = "{{ $evaluation->viewable_id }}";
		$(".evaluation-hash-edit").click(function() {
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.action = $(this).data("action");
			if (data.action == "new")
				data.hash_expires_in = $("#evaluation-hash-expires-in").val();
			$.ajax({
				url: "/evaluations/" + evaluationId + "/hash",
				method: "POST", // PATCH
				data: data
			}).done(function(response) {
				if (response === "success") {
					var newBody;
					switch(data.action) {
						case "new":
							$.getJSON("/evaluations/" + evaluationId, function(evaluation) {
								$("#evaluation-hash-body-text").html("A link has been sent, it expires <b>" + evaluation.hash_expires + "</b>. Are you sure you want to resend the completion link?");
							}).fail(function() {
								appendAlert("There was a problem retrieving the evaluation info, please let me know if this continues.");
							});
							break;
						case "resend":
							$("#evaluation-hash-body-text").append(" <br /><b>Link successfully resent</b>");
							break;
						case "void":
							$("#evaluation-hash-body-text").html("There was no completion link sent. Would you like to create a new one?");
							break;
					}
				}
				else{
					appendAlert("There was a problem modifying or sending the link", "#evaluation-hash-modal .modal-body");
				}

			}).fail(function() {
				appendAlert("There was a problem modifying or sending the link", "#evaluation-hash-modal .modal-body");
			});
		});

		@if ($evaluation->status == 'pending' && $user->id == $evaluation->evaluator_id)
			$('.question').each(function() {
				var question = this;
				var questionId = $(question).attr('id');
				var questionType = $(question).data('questionType');
				if (!($(question).data('required')) && (
					questionType === 'radio'
					|| questionType === 'radiononnumeric'
					|| questionType === 'checkbox'
				)) {

					var container = $(question).find('.question-description-toggle');

					if (!container || container.length === 0) {
						$(question).append('<div class="question-footer panel-footer"><div class="question-description-toggle"></div></div>');
						container = $(question).find('.question-description-toggle');
					}

					container.append(
						'<button type="button" class="reset-question btn btn-warning" data-id="' + questionId + '">'
							+ '<span class="glyphicon glyphicon-erase"></span>'
							+ ' Clear question'
						+ '</button>'
					);
				}
			});

			$('.reset-question').click(function() {
				var questionId = $(this).data('id');
				$('input[name="' + questionId + '"]').prop('checked', false);
			});
		@endif

		$(document).ready(function() {
			$('#form').on('click', '.toggle-descriptions', function(event) {
				$(event.target).parents('.question').find('.description').collapse('toggle');
			});

			@if ($evaluation->status == "complete" || $user->id == $evaluation->evaluator_id || $user->isType("admin"))
				@foreach($evaluation->responses as $response)
					if ($("input[name='{{ $response->question_id }}']").attr("type") == "radio")
						$("input[name='{{ $response->question_id }}'][value='{{ $response->response }}']").prop("checked", true);
					else if ($("input[name='{{ $response->question_id }}']").attr("type") == "number")
						$("input[name='{{ $response->question_id }}']").val({{ $response->response }});
				@endforeach

				@foreach($evaluation->textResponses as $response)
					if ($("textarea[name='{{ $response->question_id }}']").length > 0)
						$("textarea[name='{{ $response->question_id }}']").val("{!! str_replace(["\n", "\r"], ["\\n", "\\r"], addslashes($response->response)) !!}");
					if ($("input[name='{{ $response->question_id }}']").length > 0)
						$("input[name='{{ $response->question_id }}'][value='{{ str_replace(["\n", "\r"], ["\\n", "\\r"], addslashes($response->response)) }}']").prop("checked", true);
					if ($("input[name='{{ $response->question_id }}[]']").length > 0) {
						$("input[name='{{ $response->question_id }}[]'][value='{{ str_replace(["\n", "\r"], ["\\n", "\\r"], addslashes($response->response)) }}']").prop("checked", true);
					}
				@endforeach

				$('.question').each(function () {
					if ($(this).find('.question-option input:checked').length === 0) {
						$(this).find('input[data-n-a]').prop('checked', true);
					}
				});
			@endif

			@if ($evaluation->status == "complete" || $user->id != $evaluation->evaluator_id)
				$("#form input").prop("disabled", true);
				$("#form textarea").prop("readonly", true);
			@endif
			if ($("#form textarea").length > 0) {
				// $("#form textarea").width("90%");
				$("#form textarea").each(function() {
					$(this).height($(this)[0].scrollHeight);
					$(this).addClass("noprint");
					$(this).parent().append("<div class='print'>"+$(this).val()+"</div>");
				});
			}
			$("#form button").each(function() {
				$(this).addClass("noprint");
			});
	@if ($evaluation->evaluator_id == $user->id || $user->isType("admin"))
			$("#evaluation-controls-info").popover({
				placement: "left",
				html: "true",
				content: "<ul>" +
						"<li><b>Evaluation comment:</b> Add explanatory comment or clarification about evaluation, not to be seen by {{ strtolower($subjectType) }}</li>" +
						"<li><b>Edit evaluation:</b> If evaluation is incomplete, modify subject or evaluation form</li>" +
						"<li><b>Flag evaluation:</b> Request that this evaluation be removed or modified by an administrator</li>" +
					"</ul>"
			});

		@if ($evaluation->flag)
			$("#flag-evaluation-requested-action-group").find("input[name='requested_action'][value='{{ $evaluation->flag->requested_action }}']").prop("checked", true);
		@endif

			$(".edit-evaluation-select2").select2({
				placeholder: "Unchanged"
			});
	@endif
		});

	@if ($evaluation->evaluator_id == $user->id || $user->isType("admin"))
		$("#submit-evaluation-comment").click(function() {
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.comment = $("#evaluation-comment").val();
			var url = $(location).attr("href");
			var alert = $("#evaluation-comment-alert");

			alert.removeClass("alert-success alert-danger").addClass("alert-info");
			alert.html('<img src="/ajax-loader.gif" />');
			alert.velocity("fadeIn");

			$.ajax({
				url: "/evaluations/" + evaluationId + "/comment",
				method: "POST", // PATCH
				data: data
			}).done(function(response) {
				if (response === "success") {
					alert.removeClass("alert-danger alert-info").addClass("alert-success");
					alert.html("Comment saved!");
				}
				else{
					alert.removeClass("alert-success alert-info").addClass("alert-danger");
					alert.html("The comment cannot be saved at this time");
				}
			}).fail(function() {
				alert.removeClass("alert-success alert-info").addClass("alert-danger");
				alert.html("There was an error saving the comment");
			});
		});

		$("#evaluation-comment-modal").on("show.bs.modal", function() {
			$("#evaluation-comment-alert").hide();
		});

		$("#edit-evaluation-form").on("submit", function() {
			if ($("#evaluation-subject").val() == "" && $("#evaluation-form").val() == "") {
				alert("Please select something to change");
				return false;
			}
			return true;
		});

		var infoTableLayout = "horizontal";

		function resizeInfoTable() {
			if (infoTableLayout == "horizontal" && $(window).width() < 768) {
				var table = document.getElementById("evaluation-info-table");
				var headings = $(table).find("th").toArray();
				var data = $(table).find("td").toArray();
				while(table.firstChild)
					table.removeChild(table.firstChild);

				var tbody = document.createElement("tbody");
				for(var i = 0; i < headings.length || i < data.length; i++) {
					var tr = document.createElement("tr");
					$(tr).append(headings[i]);
					$(tr).append(data[i]);
					tbody.appendChild(tr);
				}
				table.appendChild(tbody);
				$(table).addClass("table-striped");
				infoTableLayout = "vertical";
			}

			if (infoTableLayout == "vertical" && $(window).width() >= 768) {
				var table = document.getElementById("evaluation-info-table");
				var headings = $(table).find("th").toArray();
				var data = $(table).find("td").toArray();
				while(table.firstChild)
					table.removeChild(table.firstChild);

				var thead = document.createElement("thead");
				var tbody = document.createElement("tbody");
				var tr = document.createElement("tr");
				var th, td, text;
				for(var i = 0; i < headings.length || i < data.length; i++) {
					$(tr).append(headings[i]);
				}
				thead.appendChild(tr);

				tr = document.createElement("tr");
				for(var i = 0; i < headings.length || i < data.length; i++) {
					$(tr).append(data[i]);
				}
				tbody.appendChild(tr);

				table.appendChild(thead);
				table.appendChild(tbody);
				$(table).removeClass("table-striped");
				infoTableLayout = "horizontal";
			}
		}

		$(document).ready(resizeInfoTable);

		$(window).resize(resizeInfoTable);
	@endif

		var propsData = {
			user: {!! $user->toJson() !!},
			evaluation: {!! $evaluation->toJson() !!}
		};

		createEvaluationPage('main', propsData);
	</script>
@stop

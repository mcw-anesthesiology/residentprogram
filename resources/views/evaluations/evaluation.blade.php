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

		#evaluation-date-info {
			float: none !important;
		}

		#evaluation-info-table {
			margin-bottom: 20px;
		}

		#evaluation-info-table td, #evaluation-info-table th {
			word-wrap: break-word;
		}

		.subject-image {
			text-align: center;
		}

		.subject-image img {
			width: 100%;
			max-width: 300px;
		}
	</style>
@stop

@section("body")
	<div>
	@if($evaluation->status == "pending" && $user->id == $evaluation->evaluator->id)
		<h2 class="header">Complete Evaluation</h2>
	@else
		<h2 class="header">View Evaluation</h2>
	@endif

		<div id="evaluation-controls" class="noprint">
	@if($evaluation->evaluator_id == $user->id)
			<button class="btn btn-primary" data-toggle="modal" data-target="#evaluation-comment-modal" id="comment-evaluation"><span class="glyphicon glyphicon-pencil"></span> Evaluation comment</button>
			<button class="btn btn-info" data-toggle="modal" data-target="#edit-evaluation-modal" id="edit-evaluation" @if($evaluation->status != "pending") disabled title="Completed evaluations cannot be edited" @elseif($user->id != $evaluation->requested_by_id) disabled title="You can only edit evaluations you created" @endif><span class="glyphicon glyphicon-edit"></span> Edit evaluation</button>
			<button class="btn btn-warning" data-toggle="modal" data-target="#flag-evaluation-modal" id="mark-evaluation"><span class="glyphicon glyphicon-flag"></span> Problem with evaluation?</button>
			<a tabindex="0" role="button" data-toggle="popover" data-trigger="focus" placement="left" title="Controls information" class="close" id="evaluation-controls-info">
				<span class="glyphicon glyphicon-info-sign"></span>
			</a>
	@elseif($user->type == "admin")
			<button class="btn btn-info" data-toggle="modal" data-target="#edit-evaluation-modal" id="edit-evaluation"><span class="glyphicon glyphicon-edit"></span> Edit evaluation</button>
			<Button class="btn btn-info" data-toggle="modal" data-target="#evaluation-hash-modal" id="edit-hash"><span class="glyphicon glyphicon-link"></span> Personalized completion link</Button>
	@endif
		</div>
	</div>

	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title">Evaluation Information</h3>
		</div>
		<div class="panel-body table-responsive">
			<table class="table" id="evaluation-info-table">
				<thead>
					<tr>
						<th>#</th>
	@if($user->id != $evaluation->subject_id)
						<th>{{ ucfirst($evaluation->subject->type) }}</th>
	@endif
	@if($user->isType("admin") || ($user->id != $evaluation->evaluator_id && $evaluation->visibility == "visible"))
						<th>{{ ucfirst($evaluation->evaluator->type) }}</th>
	@endif
	@if($evaluation->status == "complete")
						<th>Evaluation Date</th>
	@endif
	@if(!($evaluation->subject->isType("faculty") && $user->id == $evaluation->subject_id))
						<th>Requested</th>
						<th>Completed</th>
	@endif
						<th>Status</th>
	@if($evaluation->subject->isType("resident"))
						<th>Training Level</th>
	@endif
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ $evaluation->id }}</td>
	@if($user->id != $evaluation->subject_id)
						<td>{!! $subjectString !!}</td>
	@endif
	@if($user->isType("admin") || ($user->id != $evaluation->evaluator_id && $evaluation->visibility == "visible"))
						<td>{!! $evaluatorString !!}</td>
	@endif
	@if($evaluation->status == "complete")
						<td>{{ $evaluation->evaluation_date->format("F Y") }}</td>
	@endif
	@if(!($evaluation->subject->isType("faculty") && $user->id == $evaluation->subject_id))
						<td>{{ $evaluation->request_date }}</td>
						<td>{{ $evaluation->complete_date }}</td>
	@endif
						<td>{{ ucfirst($evaluation->status) }}</td>
	@if(!$evaluation->subject->isType("faculty"))
		@if($evaluation->training_level)
							<td>{{ strtoupper($evaluation->training_level) }}</td>
		@else
							<td>{{ strtoupper($evaluation->subject->training_level) }}</td>
		@endif
	@endif
					</tr>
				</tbody>
			</table>
	@if($evaluation->subject->photo_path && $evaluation->subject_id != $user->id)
			<div class="subject-image">
				<img src="/{{ $evaluation->subject->photo_path }}" />
			</div>
	@endif
		</div>
	@if($user->type == "admin" && $evaluation->comment)
		<div class="panel-footer">
			<h3 class="sub-header">Evaluation Comment</h3>
			<p>
				{{ $evaluation->comment }}
			</p>
		</div>
	@endif
	</div>

		<div id="form">
	@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id)
				<form id="evaluation" role="form" method="post" action="#">
					{!! csrf_field() !!}
					<label for="evaluation_date">What month is this evaluation for? </label>
		@if($evaluation->evaluation_date)
						<a tabindex="0" role="button" data-toggle="popover" data-trigger="focus" placement="left" title="Evaluation date" class="close" id="evaluation-date-info">
							<span class="glyphicon glyphicon-question-sign"></span>
						</a>
					<input type="text" class="form-control" readonly id="evaluation_date" name="evaluation_date" value="{{ $evaluation->evaluation_date->format("F") }}" />
		@else
					<select class="form-control" id="evaluation_date" name="evaluation_date">
<?php $month = Carbon\Carbon::parse("first day of this month"); ?>
			@for($i = 0; $i < 3; $i++, $month->subMonth())
						<option value="{{ $month->toDateString() }}">{{ $month->format("F") }}</option>
			@endfor
					</select>
		@endif
	@endif
					{!! App\Helpers\FormReader::read($evaluation->form->xml_path) !!}
	@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id)
					<div class="submit-container text-center">
						<button type="submit" id="complete-form" name="evaluation_id" value="{{ $evaluation->id }}" class="btn btn-primary btn-lg">Complete evaluation</button>
						<button type="submit" id="save-form" name="evaluation_id_saved" value="{{ $evaluation->id }}" class="btn btn-default btn-lg" formnovalidate>Save evaluation</button>
					</div>
				</form>
	@endif
		</div>
	</div>

	@if($evaluation->evaluator_id == $user->id || $user->type == "admin")
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

		@if(($evaluation->status == "pending" && $user->id == $evaluation->requested_by_id) || $user->type == "admin")
	<!-- Edit evaluation modal -->
	<div class="modal fade" id="edit-evaluation-modal" tabindex="-1" role="dialog" aria-labelledby="edit-evaluation-label">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<form method="post" action="{{ Request::url('/') }}/edit" role="form" id="edit-evaluation-form">
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
							<select class="form-control edit-evaluation-select2" id="evaluation-subject" name="evaluation_subject" style="width: 100%">
								<option value="">Select subject</option>
			@foreach($possibleSubjects as $possibleSubject)
								<option value="{{ $possibleSubject->id }}">{{ $possibleSubject->full_name }}</option>
			@endforeach
							</select>
						</div>
						<div class="form-group">
							<label for="evaluation-form">Evaluation form</label>
							<select class="form-control edit-evaluation-select2" id="evaluation-form" name="evaluation_form" style="width: 100%" @if($evaluation->responses->count() != 0 || $evaluation->textResponses->count() != 0) disabled title="Cannot change form for evaluations with saved responses." @endif>
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
				<form method="post" action="{{ Request::url('/') }}/flag" role="form">
					{!! csrf_field() !!}
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
						<select class="form-control" id="evaluation-hash-expires-in">
							<option value="30">30 days</option>
							<option value="60">60 days</option>
							<option value="90">90 days</option>
							<option value="never">Never expires</option>
						</select>
					</div>
					<button type="button" class="btn btn-warning evaluation-hash-edit" data-action="new">Create and send new link</button>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-danger evaluation-hash-edit" data-action="void">Void link</button>
					<button type="button" class="btn btn-primary evaluation-hash-edit" data-action="resend">Resend link</button>
				</div>
			</div>
		</div>
	</div>
		@endif
	@endif
@stop

@section("script")
	<script>
		$(".evaluation-hash-edit").click(function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.action = $(this).data("action");
			if(data.action == "new")
				data.hash_expires_in = $("#evaluation-hash-expires-in").val();
			$.post(window.location.href + "/hash", data)
				.done(function(response){
					if(response == "true"){
						var newBody;
						switch(data.action){
							case "new":
								$.getJSON(window.location.href + "/get", function(eval){
									$("#evaluation-hash-body-text").html("A link has been sent, it expires <b>" + eval.hash_expires + "</b>. Are you sure you want to resend the completion link?");
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

				}).fail(function(){
					appendAlert("There was a problem modifying or sending the link", "#evaluation-hash-modal .modal-body");
				});
		});

		$(document).ready(function(){
			@if($evaluation->status == "complete" || $user->id == $evaluation->evaluator_id || $user->type == "admin")
				@foreach($evaluation->responses as $response)
					if($("input[name='{{ $response->question_id }}']").attr("type") == "radio")
						$("input[name='{{ $response->question_id }}'][value='{{ $response->response }}']").prop("checked", true);
					else if($("input[name='{{ $response->question_id }}']").attr("type") == "number")
						$("input[name='{{ $response->question_id }}']").val({{ $response->response }});
				@endforeach

				@foreach($evaluation->textResponses as $response)
					if($("textarea[name='{{ $response->question_id }}']").length > 0)
						$("textarea[name='{{ $response->question_id }}']").val("{!! str_replace(["\n", "\r"], ["\\n", "\\r"], addslashes($response->response)) !!}");
					if($("input[name='{{ $response->question_id }}']").length > 0)
						$("input[name='{{ $response->question_id }}'][value='{{ str_replace(["\n", "\r"], ["\\n", "\\r"], addslashes($response->response)) }}']").prop("checked", true);
				@endforeach
			@endif

			@if($evaluation->status != "complete" && $user->id == $evaluation->evaluator_id && isset($evaluation->evaluation_date))
				$("#evaluation_date option[value='{{ $evaluation->evaluation_date->toDateString() }}']").prop("selected", true);
			@endif

			@if($evaluation->status == "complete" || $user->id != $evaluation->evaluator_id)
				$("#form input").prop("disabled", true);
				$("#form textarea").prop("readonly", true);
			@endif
			if($("#form textarea").length > 0){
				// $("#form textarea").width("90%");
				$("#form textarea").height($("#form textarea")[0].scrollHeight);
				$("#form textarea").addClass("noprint");
				$("#form textarea").parents("td").append("<div class='print'>"+$("#form textarea").val()+"</div>");
			}
			$("#form button").each(function(){
				$(this).addClass("noprint");
			});
	@if($evaluation->evaluator_id == $user->id || $user->type == "admin")
			$("#evaluation-controls-info").popover({
				placement: "left",
				html: "true",
				content: "<ul>" +
						"<li><b>Evaluation comment:</b> Add explanatory comment or clarification about evaluation, not to be seen by {{ strtolower($subjectType) }}</li>" +
						"<li><b>Edit evaluation:</b> If evaluation is incomplete, modify subject or evaluation form</li>" +
						"<li><b>Flag evaluation:</b> Request that this evaluation be removed or modified by an administrator</li>" +
					"</ul>"
			});

		@if($evaluation->flag)
			$("#flag-evaluation-requested-action-group").find("input[name='requested_action'][value='{{ $evaluation->flag->requested_action }}']").prop("checked", true);
		@endif

			$(".edit-evaluation-select2").select2({
				placeholder: "Unchanged"
			});
	@endif
		});

		$(".toggleDescriptions").click(function(){
			var questionName = $(this).data("id");
			var headerHeight = $("#main-navbar").height();
			var padding = 5;
			var scrollto = $(this).parents(".question").offset().top - padding - headerHeight;
			$("html, body").animate({scrollTop: scrollto});
			$("." + questionName + " .description").slideToggle();
			$("#" + questionName).toggleClass("expanded-descriptions");
		});

		var saveForm = false;
		$("#evaluation").submit(checkForm);

		function checkForm(event){
			//Checks the evaluation to make sure every question is answered before submitting the form
			if(saveForm)
				return true;

			var validForm = true;
			var alertText = "";
			$("#evaluation input:radio").each(function(){
				var name = $(this).attr("name");
				if($(this).attr("required") == "required" && $("input:radio[name="+name+"]:checked").length == 0){
					$(this).focus();
					alertText = "Please complete each required question";
					validForm = false;
				}
			});
			$("#evaluation textarea").each(function(){
				if($(this).attr("required") == "required" && this.value === ""){
					$(this).focus();
					alertText = "Please complete each required question";
					validForm = false;
				}
			});
			if(!validForm)
				alert(alertText);
			return validForm;
		}

		$("#complete-form").click(function(){
			saveForm = false;
		});

		$("#save-form").click(function(){
			saveForm = true;
		});

	@if($evaluation->evaluator_id == $user->id || $user->type == "admin")
		$("#submit-evaluation-comment").click(function(){
			var data = {};
			data.comment = $("#evaluation-comment").val();
			data._token = "{{ csrf_token() }}";
			var url = $(location).attr("href");
			var alert = $("#evaluation-comment-alert");

			alert.removeClass("alert-success alert-danger").addClass("alert-info");
			alert.html('<img src="/ajax-loader.gif" />');
			alert.fadeIn();

			$.post(url + "/comment", data, function(result){
				if(result == "true"){
					alert.removeClass("alert-danger alert-info").addClass("alert-success");
					alert.html("Comment saved!");
				}
				else{
					alert.removeClass("alert-success alert-info").addClass("alert-danger");
					alert.html("The comment cannot be saved at this time");
				}
			}).fail(function(){
				alert.removeClass("alert-success alert-info").addClass("alert-danger");
				alert.html("There was an error saving the comment");
			});
		});

		$("#evaluation-comment-modal").on("show.bs.modal", function(){
			$("#evaluation-comment-alert").hide();
		});

		$("#edit-evaluation-form").on("submit", function(){
			if($("#evaluation-subject").val() == "" && $("#evaluation-form").val() == ""){
				alert("Please select something to change");
				return false;
			}
			return true;
		});

		var infoTableLayout = "horizontal";

		function resizeInfoTable(){
			if(infoTableLayout == "horizontal" && $(window).width() < 768){
				var table = document.getElementById("evaluation-info-table");
				var headings = $(table).find("th").toArray();
				var data = $(table).find("td").toArray();
				while(table.firstChild)
					table.removeChild(table.firstChild);

				var tbody = document.createElement("tbody");
				for(var i = 0; i < headings.length || i < data.length; i++){
					var tr = document.createElement("tr");
					var th = document.createElement("th");
					var text = document.createTextNode(headings[i].innerHTML);
					th.appendChild(text);
					tr.appendChild(th);

					var td = document.createElement("td");
					text = document.createTextNode(data[i].innerHTML);
					td.appendChild(text);
					tr.appendChild(td);
					tbody.appendChild(tr);
				}
				table.appendChild(tbody);
				$(table).addClass("table-striped");
				infoTableLayout = "vertical";
			}

			if(infoTableLayout == "vertical" && $(window).width() >= 768){
				var table = document.getElementById("evaluation-info-table");
				var headings = $(table).find("th").toArray();
				var data = $(table).find("td").toArray();
				while(table.firstChild)
					table.removeChild(table.firstChild);

				var thead = document.createElement("thead");
				var tbody = document.createElement("tbody");
				var tr = document.createElement("tr");
				var th, td, text;
				for(var i = 0; i < headings.length || i < data.length; i++){
					th = document.createElement("th");
					text = document.createTextNode(headings[i].innerHTML);
					th.appendChild(text);
					tr.appendChild(th);
				}
				thead.appendChild(tr);

				tr = document.createElement("tr");
				for(var i = 0; i < headings.length || i < data.length; i++){
					td = document.createElement("td");
					text = document.createTextNode(data[i].innerHTML);
					td.appendChild(text);
					tr.appendChild(td);
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

		$("#evaluation-date-info").popover({
			html: true,
			content: "<p>Evaluation dates are now entered when an evaluation is requested or created. </p>" +
				"<p>If you don't want to complete this evaluation for this date, please request " +
				"an administrator change the date or remove the evaluation with the " +
				"<span class='text-warning'>Problem with evaluation?</span> button above.</p>"
		});
	@endif
	</script>
@stop
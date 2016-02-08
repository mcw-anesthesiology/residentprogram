@extends("app")

@section("head")
	<style>
		#needs-evals-milestones-table .glyphicon-ok,
		#needs-evals-competencies-table .glyphicon-ok {
			color: green !important;
		}
		#needs-evals-milestones-table .glyphicon-remove,
		#needs-evals-competencies-table .glyphicon-remove {
			color: red !important;
		}
		#needs-evals-milestones-table td,
		#needs-evals-competencies-table td {
			text-align: center;
		}
		#send-all-reminder-container {
			text-align: right;
		}

		#reminder-body {
			resize: vertical;
		}

		#reminder-body-rendered p + p {
			margin-top: 20px;
		}

		#loading-img {
			margin: auto;
			display: block;
		}

		.labelless-button {
			margin-top: 25px;
			text-align: center;
		}
	</style>
@stop

@section("body")
	<h2 class="header">Needs Evaluations</h2>
	<div id="needs-evals-form" class="form-horizontal report report-options">
		<div class="form-group">
			<div class="col-md-4">
				<label for="needs-start-date">Start Date</label>
				<input type="text" class="form-control datepicker startDate" id="needs-start-date" />
			</div>
			<div class="col-md-4">
				<label for="needs-end-date">End Date</label>
				<input type="text" class="form-control datepicker endDate" id="needs-end-date" />
			</div>
			<div class="col-md-4 labelless-button">
				<button type="button" class="btn lastThreeMonths">Last 3 months</button>
				<button type="button" class="btn lastSixMonths">Last 6 months</button>
			</div>
		</div>
		<div class="form-group">
			<div class="col-md-6">
				<label for="needs-training-level">Training Level</label>
				<select class="form-control" id="needs-training-level">
					<option value="all">All</option>
					<option value="intern">Intern</option>
					<option value="ca-1">CA-1</option>
					<option value="ca-2">CA-2</option>
					<option value="ca-3">CA-3</option>
					<option value="fellow">Fellow</option>
				</select>
			</div>
			<div class="col-md-6 labelless-button">
				<button type="button" class="btn btn-primary" id="needs-evals-submit">Get report</button>
			</div>
		</div>
	</div>
</div>

<div class="container body-block">
	<h2>Evaluations</h2>
	<div class="row">
		<div class="col-md-4">
			<div class="form-group">
				<label for="evaluation-threshold">Show residents with fewer than</label>
				<select class="form-control" id="evaluation-threshold">
					<option value="1">1</option>
					<option value="3" selected>3</option>
					<option value="5">5</option>
					<option value="all">All</option>
				</select>
			</div>
		</div>
		<div class="col-md-4 col-md-offset-4" id="send-all-reminder-container">
			<button class="btn btn-info labelless-button" id="send-all-reminders">
				<span class="glyphicon glyphicon-send"></span> Send all reminders
			</button>
		</div>
	</div>
	<div class="table-responsive">
		<table class="table table-striped datatable" id="needs-evals-table" width="100%">
			<thead>
				<tr>
					<th>Resident</th>
					<th>Completed evaluations</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>
</div>

<div class="modal fade" id="send-reminder-modal" tabindex="-1" role="dialog" aria-labelledby="send-reminder-label" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title" id="send-reminder-label">Send reminders</h4>
			</div>
			<div class="modal-body" id="send-reminder-modal-body">
				<div class="form-group">
					<label for="reminder-to">To</label>
					<input type="email" class="form-control" id="reminder-to" readonly />
					<input type="hidden" id="reminder-id" />
				</div>
				<div class="form-group">
					<label for="reminder-subject">Subject</label>
					<input type="text" class="form-control" id="reminder-subject" />
				</div>
				<div class="form-group">
					<label for="reminder-body">Body</label>
					<textarea class="form-control" id="reminder-body" rows="15"></textarea>
					<div tabindex="0" class="form-control" id="reminder-body-rendered"></div>
				</div>
				<div id="send-reminder-modal-body-info">
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-info" id="send-reminder">Send reminder</button>
			</div>
		</div>
	</div>
</div>

<div class="container body-block">
	<h2>Competencies</h2>
	<button type="button" id="get-needs-competencies" class="btn btn-primary">Get needed competencies report</button>
	<table class="table table-striped table-bordered datatable" id="needs-evals-competencies-table">
		<thead>
			<tr>
				<th>Resident/Fellow</th>
	@foreach($competencies as $competency)
				<th nowrap>{{ $competency->title }}</th>
	@endforeach
			</tr>
		</thead>
	</table>

	<form id="needs-evals-competencies-tsv-form" style="text-align: center;" method="post" target="_blank" action="/report/needs-eval/competencies/tsv">
		{!! csrf_field() !!}
		<input type="hidden" name="startDate" id="needs-competencies-tsv-start-date" />
		<input type="hidden" name="endDate" id="needs-competencies-tsv-end-date" />
		<input type="hidden" name="trainingLevel" id="needs-competencies-tsv-training-level" />
		<button class="btn btn-default" type="submit">Export TSV</button>
	</form>
</div>

<div class="container body-block">
	<h2>Milestones</h2>
	<button type="button" id="get-needs-milestones" class="btn btn-primary">Get needed milestones report</button>
	<table class="table table-striped table-bordered datatable" id="needs-evals-milestones-table">
		<thead>
			<tr>
				<th>Resident/Fellow</th>
	@foreach($milestones as $milestone)
				<th nowrap>{{ $milestone->title }}</th>
	@endforeach
			</tr>
		</thead>
	</table>

	<form id="needs-evals-milestones-tsv-form" style="text-align: center;" method="post" target="_blank" action="/report/needs-eval/milestones/tsv">
		{!! csrf_field() !!}
		<input type="hidden" name="startDate" id="needs-milestones-tsv-start-date" />
		<input type="hidden" name="endDate" id="needs-milestones-tsv-end-date" />
		<input type="hidden" name="trainingLevel" id="needs-milestones-tsv-training-level" />
		<button class="btn btn-default" type="submit">Export TSV</button>
	</form>
@stop

@section("script")
	<script>
		var what = [];
		$(document).ready(function(){
			$("#needs-evals-form").find(".lastThreeMonths").trigger("click");
			submitNeedsEvals();
		});

		$("#evaluation-threshold").change(getNeedsEvaluations);

		$("#needs-evals-submit").click(submitNeedsEvals);
		$("#get-needs-competencies").click(getNeedsCompetencies);
		$("#get-needs-milestones").click(getNeedsMilestones);

		$("#needs-evals-milestones-tsv-form").on("submit", function(){
			$("#needs-tsv-start-date").val($("#needs-start-date").val());
			$("#needs-tsv-end-date").val($("#needs-end-date").val());
			$("#needs-tsv-training-level").val($("#needs-training-level").val());
		});

		$("#needs-evals-table").on("click", ".send-user-reminder", openSendUserReminderModal);

		function openSendUserReminderModal(){
			var userId = $(this).data("id");
			var lastName = $(this).data("last");
			var firstName = $(this).data("first");
			var userName = lastName + ", " + firstName;
			var userEmail = $(this).data("email");
			var startDate = moment($("#needs-start-date").val());
			var endDate = moment($("#needs-end-date").val());
			var evalsCompleted = parseInt($(this).data("count"));
			var evalsRequired = parseInt($("#evaluation-threshold").val());
			var evalsLeft = evalsRequired - evalsCompleted;
			var evaluationString = (evalsLeft === 1) ? "evaluation" : "evaluations";
			var dateFormat = "MMMM D, YYYY";

			$("#reminder-id").val(userId);
			$("#reminder-to").val(userName + " <" + userEmail + ">");

			$("#reminder-subject").val("Please request evaluations!");

			var bodyText = "Hello Dr. " + lastName + "\n"
				+ "\n"
				+ "You have " + evalsCompleted + " evaluations completed for between "
				+ startDate.format(dateFormat) + " and " + endDate.format(dateFormat) + ".\n\n"
				+ "**You are required to have " + evalsRequired + " evaluations completed for this period.** "
				+ "Please request at least " + evalsLeft + " "
				+ "more " + evaluationString + " as soon as possible.\n"
				+ "\n"
				+ "If you have any issues or questions about the system, please contact "
				+ "{{ config("app.admin_email") }}.\n"
				+ "\n"
				+ "Thank you!";

			$("#reminder-body").val(bodyText);

			var bodyHeight = 300;
			$("#reminder-body-rendered").height(bodyHeight);

			$("#reminder-body").hide();
			$("#reminder-body-rendered").show();
			markupReminderBody();

			$("#send-reminder-modal-body-info").empty();
			$("#send-reminder").off("click", sendNeedsEvaluationReminder);
			$("#send-reminder").off("click", sendAllNeedsEvaluationReminders);
			$("#send-reminder").click(sendNeedsEvaluationReminder);
			$("#send-reminder-modal").modal("show");
		}

		$("#send-all-reminders").click(openSendAllRemindersModal);

		function openSendAllRemindersModal(){
			var startDate = moment($("#needs-start-date").val());
			var endDate = moment($("#needs-end-date").val());
			var evalsRequired = parseInt($("#evaluation-threshold").val());
			var dateFormat = "MMMM D, YYYY";
			var table = $("#needs-evals-table").DataTable({
				retrieve: true
			});
			var numRemindedUsers = table.data().length;

			$("#reminder-to").val(numRemindedUsers + " residents");

			$("#reminder-subject").val("Please request evaluations!");

			var bodyText = "Hello Dr. [[Name]]\n"
				+ "\n"
				+ "You have [[# Completed]] evaluations completed for between "
				+ startDate.format(dateFormat) + " and " + endDate.format(dateFormat) + ".\n\n"
				+ "**You are required to have " + evalsRequired + " evaluations completed for this period.** "
				+ "Please request at least [[# Needed]] "
				+ "more evaluations as soon as possible.\n"
				+ "\n"
				+ "If you have any issues or questions about the system, please contact "
				+ "{{ config("app.admin_email") }}.\n"
				+ "\n"
				+ "Thank you!";

				$("#reminder-body").val(bodyText);

				var bodyHeight = 300;
				$("#reminder-body-rendered").height(bodyHeight);

				$("#reminder-body").hide();
				$("#reminder-body-rendered").show();
				markupReminderBody();

				$("#send-reminder-modal-body-info").empty();
				appendAlert("Warning: This will resend any reminders "
					+ "you may have already sent. If you want to be sure to not resend any "
					+ "reminders please send them individually.", "#send-reminder-modal-body-info", "warning");
				$("#send-reminder").off("click", sendNeedsEvaluationReminder);
				$("#send-reminder").off("click", sendAllNeedsEvaluationReminders);
				$("#send-reminder").click(sendAllNeedsEvaluationReminders);
				$("#send-reminder-modal").modal("show");
		}

		$("#reminder-body-rendered").mouseenter(showReminderBody);
		$("#reminder-body-rendered").focusin(focusReminderBody);

		function showReminderBody(){
			$("#reminder-body-rendered").hide();
			$("#reminder-body").show();
		}

		function focusReminderBody(){
			showReminderBody();
			$("#reminder-body").focus()
		}

		$("#reminder-body").mouseleave(function(){
			if(!$(this).is(document.activeElement))
				unfocusReminderBody();
		});
		$("#reminder-body").focusout(unfocusReminderBody);

		function unfocusReminderBody(){
			$("#reminder-body").hide();
			markupReminderBody();
			$("#reminder-body-rendered").show();
		}

		function markupReminderBody(){
			var name = "<span class='label label-info'>Name</span>";
			var numCompleted = "<span class='label label-info'># Completed</span>";
			var numNeeded = "<span class='label label-info'># Needed</span>";

			var bodyText = marked($("#reminder-body").val());
			bodyText = bodyText.replace(/\[\[Name\]\]/g, name);
			bodyText = bodyText.replace(/\[\[# Completed\]\]/g, numCompleted);
			bodyText = bodyText.replace(/\[\[# Needed\]\]/g, numNeeded);
			$("#reminder-body-rendered").html(bodyText);
		}

		function sendNeedsEvaluationReminder(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.id = $("#reminder-id").val();
			data.subject = $("#reminder-subject").val();
			data.body = $("#reminder-body-rendered").html();

			$("#send-reminder-modal-body-info").append("<img id='loading-img' src='/ajax-loader.gif' />");

			$.post("/report/needs-eval/send-reminder", data, function(response){
				$("#loading-img").remove();
				if(response === "success"){
					setReminderButtonsSent(data.id);
					$("#send-reminder-modal").modal("hide");
				}
				else{
					appendAlert("Error sending reminder", "#send-reminder-modal-body-info");
				}
			}).fail(function(){
				appendAlert("Error sending reminder", "#send-reminder-modal-body-info");
				$("#loading-img").remove();
			});
		}

		function sendAllNeedsEvaluationReminders(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.startDate = $("#needs-start-date").val();
			data.endDate = $("#needs-end-date").val();
			data.trainingLevel = $("#needs-training-level").val();
			data.evalsRequired = $("#evaluation-threshold").val();
			data.subject = $("#reminder-subject").val();
			data.body = $("#reminder-body-rendered").html();

			var numRows = $("#needs-evals-table").DataTable({
				retrieve: true
			}).data().length;

			$("#send-reminder-modal-body-info").append("<img id='loading-img' src='/ajax-loader.gif' />");

			$.post("/report/needs-eval/send-all-reminders", data, function(remindedUsers){
				$("#loading-img").remove();
				for(var i = 0; i < remindedUsers.length; i++){
					setReminderButtonsSent(remindedUsers);
				}
				if(remindedUsers.length == numRows){
					$("#send-reminder-modal-body-info").empty();
					$("#send-reminder-modal").modal("hide");
				} else if(remindedUsers.length > 0){
					appendAlert(remindedUsers.length + " evals sent out of " + numRows, "#send-reminder-modal-body-info");
				} else {
					appendAlert("Error sending reminders", "#send-reminder-modal-body-info");
				}
			}).fail(function(response){
				appendAlert("Error sending reminder", "#send-reminder-modal-body");
				$("#loading-img").remove();
			});
		}

		function submitNeedsEvals(){
			getNeedsEvaluations();
			var startDate = $("#needs-start-date").val();
			var endDate = $("#needs-end-date").val();
			var trainingLevel = $("#needs-training-level").val();
			$("#needs-competencies-tsv-start-date").val(startDate);
			$("#needs-competencies-tsv-end-date").val(endDate);
			$("#needs-competencies-tsv-training-level").val(trainingLevel);

			$("#needs-milestones-tsv-start-date").val(startDate);
			$("#needs-milestones-tsv-end-date").val(endDate);
			$("#needs-milestones-tsv-training-level").val(trainingLevel);

			$("#needs-evals-milestones-table").DataTable({
				retrieve: true,
				scrollX: true
			}).clear();
			$("#needs-evals-competencies-table").DataTable({
				retrieve: true,
				scrollX: true
			}).clear();
		}

		function getNeedsEvaluations(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.startDate = $("#needs-start-date").val();
			data.endDate = $("#needs-end-date").val();
			data.trainingLevel = $("#needs-training-level").val();
			data.evalThreshold = $("#evaluation-threshold").val();

			var table = $("#needs-evals-table").DataTable({
				"ajax": {
					"url": "/report/needs-eval/get",
					"type": "post",
					"data": data
				},
				"destroy": true
			});
		}

		function setReminderButtonsSent(dataIds){
			var buttonColumn = 2;
			if(!Array.isArray(dataIds))
				dataIds = [dataIds];

			var table = $("#needs-evals-table").DataTable({
				retrieve: true
			});
			for(var i = 0; i < dataIds.length; i++){
				for(var row = 0; row < table.data().length; row++){
					var button = table.cell(row, buttonColumn).data();
					console.log(button);
					if(button.indexOf("data-id='"+dataIds[i]+"'") != -1){
						button = $($.parseHTML(button));
						button.removeClass("btn-info send-user-reminder");
						button.addClass("btn-success user-reminder-sent");
						button.prop("disabled", true);
						button.html("<span class='glyphicon glyphicon-ok'></span> "
							+ "Reminder sent!");
						table.cell(row, buttonColumn).data(button.get(0).outerHTML);
					}
				}
			}
			table.draw(false);
		}

		function getNeedsCompetencies(){
			var hasNoEvaluationString = "<span class='glyphicon glyphicon-remove'></span>";
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.startDate = $("#needs-start-date").val();
			data.endDate = $("#needs-end-date").val();
			data.trainingLevel = $("#needs-training-level").val();

			var table = $("#needs-evals-competencies-table").DataTable({
				"ajax": {
					"url": "/report/needs-eval/competencies/get",
					"type": "post",
					"data": data
				},
				"paging": false,
				"scrollX": true,
				"scrollY": "700px",
				"scrollCollapse": true,
				"destroy": true,
				"columnDefs": [{
					"targets": 0,
					"cellType": "th"
				}]
			});
			new $.fn.DataTable.FixedColumns(table);
		}

		function getNeedsMilestones(){
			var hasNoEvaluationString = "<span class='glyphicon glyphicon-remove'></span>";
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.startDate = $("#needs-start-date").val();
			data.endDate = $("#needs-end-date").val();
			data.trainingLevel = $("#needs-training-level").val();

			var table = $("#needs-evals-milestones-table").DataTable({
				"ajax": {
					"url": "/report/needs-eval/milestones/get",
					"type": "post",
					"data": data
				},
				"paging": false,
				"scrollX": true,
				"scrollY": "700px",
				"scrollCollapse": true,
				"destroy": true,
				"columnDefs": [{
					"targets": 0,
					"cellType": "th"
				}]
			});
			new $.fn.DataTable.FixedColumns(table);
		}
	</script>
@stop

@extends("app")

@section("head")
	<style>
		#send-email-body {
			resize: vertical;
		}

		#send-email-body-rendered p + p {
			margin-top: 20px;
		}

		#send-email-ids-container {
			margin-top: 5px;
		}

		#send-email-ids-well {
			max-height: 300px;
			overflow-y: scroll;
		}

		#send-email-ids-list {
			-webkit-column-count: 3;
    		-moz-column-count: 3;
            column-count: 3;
		}

		#send-email-ids-list li {
			display: inline-block;
		}

		#send-email-replacements {
			cursor: pointer;
		}

		.popover-content ul {
			padding-left: 20px;
		}
	</style>
@stop

@section("body")
	<h1>Manage Alumni
		<button type="button" class="btn btn-success btn-sm" id="add-alum-button"><span class="glyphicon glyphicon-plus"></span> Add alumni</button>
		<button type="button" class="btn btn-info btn-sm" id="send-many-emails-button"><span class="glyphicon glyphicon-send"></span> Send group email</button>
	</h1>
	<div class="alumni-list table-responsive">
		<table class="table table-striped datatable" id="alumni-table" width="100%">
			<thead>
				<th>Name</th>
				<th>Email</th>
				<th>Graduated</th>
				<th></th>
			</thead>
		</table>
	</div>

	<div class="modal fade" id="alum-modal" tabindex="-1" role="dialog" aria-labelledby="alum-modal-title" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<form class="form" id="alum-form" role="form" method="POST" action="/alumni/">
					{!! csrf_field() !!}
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title" id="alum-modal-title">Add alum</h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="alum-first-name">First name</label>
							<input type="text" class="form-control" id="alum-first-name" name="first_name" placeholder="First name" required />
						</div>
						<div class="form-group">
							<label for="alum-last-name">Last name</label>
							<input type="text" class="form-control" id="alum-last-name" name="last_name" placeholder="Last name" required />
						</div>
						<div class="form-group">
							<label for="alum-email">Email</label>
							<input type="email" class="form-control" id="alum-email" name="email" placeholder="Email" />
							<small>Not required, but can't send update requests without one</small>
						</div>
						<div class="form-group graduation-date-container">
							<label for="alum-graduation-date">Graduation date</label>
							<input type="text" class="form-control" id="alum-graduation-date" name="graduation_date" placeholder="Graduation date (YYYY-MM-DD)" />
						</div>
						<div class="form-group">
							<label for="alum-country">Country</label>
							<select class="form-control crs-country" id="alum-country" data-region-id="alum-state" data-default-value="{{ 'United States' }}" name="country"></select>
						</div>
						<div class="form-group">
							<label for="alum-address">Address</label>
							<input type="text" class="form-control" id="alum-address" name="address" placeholder="Address" />
						</div>
						<div class="form-group">
							<label for="alum-city">City</label>
							<input type="text" class="form-control" id="alum-city" name="city" placeholder="City" />
						</div>
						<div class="form-group">
							<label for="alum-state">State / Region</label>
							<select class="form-control" id="alum-state" name="state" data-default-value="{{ 'Wisconsin' }}"></select>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="submit" class="btn btn-success">Add alum</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- Send individual email -->
	<div class="modal fade" id="send-email-modal" tabindex="-1" role="dialog" aria-labelledby="send-email-label" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" id="send-email-label">Send emails</h4>
				</div>
				<div class="modal-body" id="send-email-modal-body">
					<div class="form-group">
						<label for="send-email-to">To</label>
						<div class="to-container" id="send-email-to-container">
							<input type="text" class="form-control to" id="send-email-to" readonly />
							<span class="input-group-btn collapse ids-list-button-container" id="send-email-ids-list-button-container">
								<button type="button" class="btn btn-default" id="send-email-ids-list-button">Resident List <span class="caret"></span></button>
							</span>
						</div>
						<input type="hidden" class="id" id="send-email-id" />
						<div class="collapse ids-container" id="send-email-ids-container">
							<div class="well row" id="send-email-ids-well">
								<ul class="ids-list" id="send-email-ids-list"></ul>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="send-email-subject">Subject</label>
						<input type="text" class="form-control subject" id="send-email-subject" />
					</div>
					<div class="form-group">
						<label for="send-email-body">Body</label>
						<textarea class="form-control body" id="send-email-body" rows="15"></textarea>
						<div tabindex="0" class="form-control body-rendered" id="send-email-body-rendered"></div>
						<small>Supports <a href="http://daringfireball.net/projects/markdown/basics" target="_blank">markdown</a> (except inline HTML).</small>
						<small><a id="send-email-replacements" data-toggle="popover">Available replacements</a></small>
					</div>
					<div id="send-email-modal-body-info">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-info send" id="send-email-send">Send email</button>
				</div>
			</div>
		</div>
	</div>
@stop

@section("script")
	<script>
		var replacements = [
			"Name",
			"First name",
			"Last name",
			"Update link",
			"Unsub link"
		];
		var alumniTable = $("#alumni-table").DataTable({
			ajax: {
				url: "/alumni",
				data: {

				},
				dataSrc: ""
			},
			columns: [
				{data: "full_name"},
				{data: "email"},
				{data: "graduation_date", createdCell: createDateCell, render: function(graduationDate, type){
					if(type === "sort" || type === "type")
						return graduationDate ? moment(graduationDate).valueOf() : "";

					return graduationDate ? moment(graduationDate).format("Y") : "";
				}},
				{data: null, orderable: false, searchable: false, render: function(alum, type){
					if(!alum)
						return "";

					var buttonClass = "disabled";
					var buttonExtra = "disabled";
					var sendLinkClass = "";
					var emailClass = "";
					var buttonTitle;
					if(alum.do_not_contact){
						buttonTitle = "Unsubscribed";
					} else if(!alum.email) {
						buttonTitle = "No email";
					} else {
						buttonClass = "";
						buttonExtra = "";
						sendLinkClass = "alumni-send-link-button";
						emailClass = "alumni-email-button";
						buttonTitle = "";
					}
					var alumData = 'data-id="' + alum.id + '" data-email="' + alum.email + '" '
						+ 'data-last-name="' + alum.last_name + '" data-first-name="' + alum.first_name + '" '
						+ 'data-graduation-date="' + alum.graduation_date + '" data-country="' + alum.country + '" '
						+ 'data-address="' + alum.address + '" data-city="' + alum.city + '" data-state="' + alum.state + '"';

					var emailButton = '<button type="button" class="btn btn-xs btn-info ' + buttonClass + ' ' + emailClass + '"'
						+ 'title="' + buttonTitle + '" ' + alumData + '><span class="glyphicon glyphicon-send"></span> '
						+ 'Email</button>';

					var editButton = '<button type="button" class="edit-alum-button btn btn-xs btn-info" ' + alumData + '>'
						+ '<span class="glyphicon glyphicon-pencil"></span> Edit</button>';


					return emailButton + " " + editButton;
				}}
			],
			order: [[2, 'desc']],
			createdRow: function(row, data, index){
				$(row).addClass("alum");
			}
		});

		$("#alum-graduation-date").remove();
		addDateSelectors("graduation_date", "alum-graduation-", ".graduation-date-container", 5, true);

		$("#add-alum-button").click(function(){
			var modal = $("#alum-modal");
			var form = $("#alum-form");
			form.data("action", "add").attr("action", "/alumni/");
			form.find("input[name='_method']").remove();
			form.find("button[type='submit']").text("Add alum");
			$("#alum-modal-title").text("Add alum");
			form[0].reset();
			var currentYear = moment().year();
			$("#alum-graduation-date-year").val(currentYear)
			$("#alum-graduation-date-month").val(5);
			$("#alum-graduation-date-day").val(30).change();
			$("#alum-country").val("United States");
			$("#alum-state").val("Wisconsin");
			modal.modal("show");
		});

		$("#alumni-table").on("click", ".edit-alum-button", function(){
			var alumId = $(this).data("id");
			var modal = $("#alum-modal");
			var form = $("#alum-form");
			var button = $(this);
			form.data("action", "edit").attr("action", "/alumni/" + alumId);
			form.append('<input type="hidden" name="_method" value="PATCH" />');
			form.find("button[type='submit']").text("Edit alum");
			form[0].reset();
			$("#alum-modal-title").text("Edit alum");
			$("#alum-first-name").val(button.data("firstName"));
			$("#alum-last-name").val(button.data("lastName"));
			$("#alum-email").val(button.data("email"));
			var graduationDate = moment(button.data("graduationDate"));
			if(!graduationDate.isValid())
				graduationDate = moment().month(5).date(30);
			$("#alum-graduation-date-day").val(graduationDate.date());
			$("#alum-graduation-date-month").val(graduationDate.month());
			$("#alum-graduation-date-year").val(graduationDate.year());
			if(!button.data("graduationDate"))
				$("#alum-graduation-date-unknown").prop("checked", true).change();
			$("#alum-graduation-date-year").change();
			$("#alum-country").val(button.data("country"));
			$("#alum-address").val(button.data("address"));
			$("#alum-city").val(button.data("city"));
			$("#alum-state").val(button.data("state"));
			modal.modal("show");
		});

		$("#alum-form").submit(function(event){
			event.preventDefault();
			var addEditAction = $(this).data("action");
			var submitButton = $(this).find("button[type='submit']");
			submitButton.prop("disabled", true).addClass("disabled");

			var formData = $(this).serialize();
			var target = $(this).attr("action");
			var method = $(this).attr("method");
			$.ajax({
				url: target,
				method: method,
				data: formData
			}).done(function(response){
				if(response == "success"){
					$("#alum-modal").modal("hide");
					alumniTable.ajax.reload();
				} else {
					appendAlert("There was a problem " + addEditAction + "ing the alum. If this continues, please let me know at jmischka@mcw.edu", "#alum-modal .modal-header");
				}
				submitButton.prop("disabled", false).removeClass("disabled");
			}).fail(function(err){
				appendAlert("There was a problem " + addEditAction + "ing the alum. If this continues, please let me know at jmischka@mcw.edu", "#alum-modal .modal-header");
				submitButton.prop("disabled", false).removeClass("disabled");
			});
		});

		$("#send-email-replacements").popover({
			placement: "top",
			html: true,
			trigger: "hover",
			content: function(){
				var content = '<ul>';
				for(var i = 0; i < replacements.length; i++){
					content += '<li>' + replacements[i] + '</li>';
				}
				content += '</ul>';
				return content;
			}
		});

		$("#alumni-table").on("click", ".alumni-email-button", function(event){
			var alum = {
				id: $(this).data("id"),
				last_name: $(this).data("lastName"),
				first_name: $(this).data("firstName"),
				full_name: $(this).data("lastName") + ", " + $(this).data("firstName"),
				email: $(this).data("email")
			};

			var subjectText = "Please keep in touch!";
			var bodyText = "Hello Dr. " + alum.last_name + "\n" // FIXME
				+ "\n"
				+ "We want to keep in touch with you! Please use the link below to "
				+ "give us your updated contact information so we can send you newsletters "
				+ "and stuff.\n"
				+ "\n"
				+ "[[Update link]]\n"
				+ "\n"
				+ "[[Unsub link]]";

			openSendEmailModal(alum, $("#send-email-modal"), subjectText, bodyText,
				sendEmail, sendManyEmails, "alumni", replacements);
		});

		$("#send-many-emails-button").click(function(){
			var alumniData = alumniTable.rows().data();
			var alumni = [];
			for(var i = 0; i < alumniData.length; i++){
				alumni[i] = alumniData[i];
				alumni[i].send = !alumni[i].do_not_contact;
			}

			var subjectText = "Please keep in touch!";
			var bodyText = "Hello Dr. [[Last name]]\n" // FIXME
				+ "\n"
				+ "We want to keep in touch with you! Please use the link below to "
				+ "give us your updated contact information so we can send you newsletters "
				+ "and stuff.\n"
				+ "\n"
				+ "[[Update link]]\n"
				+ "\n"
				+ "[[Unsub link]]";

			openSendEmailModal(alumni, $("#send-email-modal"), subjectText, bodyText,
				sendEmail, sendManyEmails, "alumni", replacements);
		});

		$("#send-email-ids-list-button").click(function(){
			var container = $("#send-email-ids-container");
			container.css("display") === "none"
				? container.velocity("slideDown")
				: container.velocity("slideUp");
		});

		function sendEmail(){
			$("#send-email-send").prop("disabled", true).addClass("disabled");
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.body = $("#send-email-body-rendered").html();
			data.subject = $("#send-email-subject").val();
			var alumId = $("#send-email-id").val();
			var alumEmail = $("#send-email-email").val();

			$.ajax({
				url: "/alumni/" + alumId + "/email",
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if(response === "success"){
					$("#send-email-modal").modal("hide");
					appendAlert("Email sent!", "#alert-container", "success");
				} else {
					appendAlert(response, "#send-email-modal .modal-header");
				}
			}).fail(function(err){
				appendAlert("There was an error sending email to " + alumEmail + ".", "#send-email-modal .modal-header");
			}).always(function(){
				$("#send-email-send").prop("disabled", false).removeClass("disabled");
			});
		}

		function sendManyEmails(){
			$("#send-email-send").prop("disabled", true).addClass("disabled");
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.body = $("#send-email-body-rendered").html();
			data.subject = $("#send-email-subject").val();
			data.alumni = [];
			$(".send-all-id:checked").each(function(){
				var alum = {
					id: $(this).val(),
					email: $(this).data("email")
				};
				data.alumni.push(alum);
			});

			$.ajax({
				url: "/alumni/email",
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if(response.error.length === 0){
					$("#send-email-modal").modal("hide");
					appendAlert("" + response.success.length + " emails sent successfully", "#alert-container", "success");
				}
				else {
					appendAlert("" + response.error.length + " emails sent unsuccessfully. Alumni unsuccessfully emailed are still checked.", "#send-email-modal .modal-header");
					for(var i = 0; i < response.success.length; i++){
						$(".send-all-id[value='" + response.success[i].id + "']").prop("checked", false).change();
					}
				}
			}).fail(function(err){
				appendAlert("There was a problem sending emails", "#send-email-modal .modal-header");
			}).always(function(){
				$("#send-email-send").prop("disabled", false).removeClass("disabled");
			});
		}
	</script>
@stop

@extends("app")

@section("body")
	<h1>Manage Alumni <button type="button" class="btn btn-success btn-xs" data-toggle="modal" data-target="#add-alum-modal">Add alumni</button></h1>
	<div class="alumni-list">
		<table class="table table-striped datatable" id="alumni-table">
			<thead>
				<th>Name</th>
				<th>Email</th>
				<th>Graduation year</th>
				<th></th>
			</thead>
		</table>
	</div>

	<div class="modal fade" id="add-alum-modal" tabindex="-1" role="dialog" aria-labelledby="add-alum-modal-title" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<form class="form" id="add-alum-form" role="form" method="post" action="/manage/alumni/add">
					{!! csrf_field() !!}
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title" id="add-alum-modal-title">Add alum</h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="add-alum-first-name">First name</label>
							<input type="text" class="form-control" id="add-alum-first-name" name="first_name" placeholder="First name" required />
						</div>
						<div class="form-group">
							<label for="add-alum-last-name">Last name</label>
							<input type="text" class="form-control" id="add-alum-last-name" name="last_name" placeholder="Last name" required />
						</div>
						<div class="form-group">
							<label for="add-alum-email">Email</label>
							<input type="email" class="form-control" id="add-alum-email" name="email" placeholder="Email" />
							<small>Not required, but can't send update requests without one</small>
						</div>
						<div class="form-group graduation-date-container">
							<label for="add-alum-graduation-date">Graduation date</label>
							<input type="text" class="form-control" id="add-alum-graduation-date" name="graduation_date" placeholder="Graduation date (YYYY-MM-DD)" />
						</div>
						<div class="form-group">
							<label for="add-alum-country">Country</label>
							<select class="form-control crs-country" id="add-alum-country" data-region-id="add-alum-state" data-default-value="{{ 'United States' }}" name="country"></select>
						</div>
						<div class="form-group">
							<label for="add-alum-address">Address</label>
							<input type="text" class="form-control" id="add-alum-address" name="address" placeholder="Address" />
						</div>
						<div class="form-group">
							<label for="add-alum-city">City</label>
							<input type="text" class="form-control" id="add-alum-city" name="city" placeholder="City" />
						</div>
						<div class="form-group">
							<label for="add-alum-state">State / Region</label>
							<select class="form-control" id="add-alum-state" name="state" data-default-value="{{ 'Wisconsin' }}"></select>
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
						<label for="email-to">To</label>
						<div id="email-to-container">
							<input type="text" class="form-control" id="email-to" readonly />
							<span class="input-group-btn collapse" id="email-ids-list-button-container">
								<button type="button" class="btn btn-default" id="email-ids-list-button">Resident List <span class="caret"></span></button>
							</span>
						</div>
						<input type="hidden" id="email-id" />
						<div class="collapse" id="email-ids-container">
							<div class="well row" id="email-ids-well">
								<ul id="email-ids-list"></ul>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="email-subject">Subject</label>
						<input type="text" class="form-control" id="email-subject" />
					</div>
					<div class="form-group">
						<label for="email-body">Body</label>
						<textarea class="form-control" id="email-body" rows="15"></textarea>
						<div tabindex="0" class="form-control" id="email-body-rendered"></div>
						<small>Supports <a href="http://daringfireball.net/projects/markdown/basics" target="_blank">markdown</a> (except inline HTML)</small>
					</div>
					<div id="send-email-modal-body-info">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-info" id="send-email">Send email</button>
				</div>
			</div>
		</div>
	</div>
@stop

@section("script")
	<script>
		$("#add-alum-graduation-date").remove();
		addDateSelectors("graduation_date", "add-alum-graduation-", ".graduation-date-container", 5, true);

		$("#add-alum-form").submit(function(event){
			event.preventDefault();
			var submitButton = $(this).find("button[type='submit']");
			submitButton.prop("disabled", true).addClass("disabled");

			var formData = $(this).serialize() + "&ajax=true";
			var target = $(this).prop("action");
			$.post(target, formData, function(response){
				if(response == "successful"){
					$("#add-alum-modal").modal("hide");
				} else {
					appendAlert(response, "#add-alum-modal .modal-header");
				}
				submitButton.prop("disabled", false).removeClass("disabled");
			}).fail(function(err){
				appendAlert("There was a problem adding the alum. If this continues, please let me know at jmischka@mcw.edu", "#add-alum-modal .modal-header");
				submitButton.prop("disabled", false).removeClass("disabled");
			});
		});

		$("#alumni-table").on("click", ".alumni-send-link-button", function(event){
			var button = $(this);
			button.prop("disabled", true).addClass("disabled");
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.id = button.data("id");
			data.ajax = true;

			var email = button.data("email");

			$.post("/manage/alumni/send-link", data, function(response){
				if(response === "successful"){
					button.removeClass("btn-info").addClass("btn-success");
					button.html("Email sent! <span class='glyphicon glyphicon-ok'></span>");
				} else {
					appendAlert(response, ".top-alert-container");
					button.removeClass("btn-info").addClass("btn-danger");
					button.html("Email failed. <span class='glyphicon glyphicon-remove'></span>");
				}
			}).fail(function(err){
				appendAlert("There was an error sending email to " + email + ".", ".top-alert-container");
				button.removeClass("btn-info").addClass("btn-danger");
				button.html("Email failed. <span class='glyphicon glyphicon-remove'></span>");
			});
		});

		$("#alumni-table").DataTable({
			ajax: {
				url: "/manage/alumni/get",
				type: "GET"
			},
			order: [[2, 'desc']],
			createdRow: function(row, data, index){
				$(row).addClass("alum");
			}
		});
	</script>
@stop

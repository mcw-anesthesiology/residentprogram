@extends("app")

@section("body")
	<h1>Manage Alumni <button type="button" class="btn btn-success btn-xs" data-toggle="modal" data-target="#add-alum-modal">Add alumni</button></h1>
	<div class="">

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
@stop

@section("script")
	<script>
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
	</script>
@stop

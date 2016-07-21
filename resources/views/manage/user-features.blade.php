@extends("app")

@section("body")
	<h1>User features
		<button type="button" class="btn btn-sm btn-success" id="add-user-feature-button">
			<span class="glyphicon glyphicon-plus"></span>
			Grant user feature
		</button>
	</h1>
	<div class="table-responsive">
		<table class="table table-striped" id="user-features-table" width="100%">
			<thead>
				<tr>
					<th>#</th>
					<th>Feature</th>
					<th>User</th>
					<th>Type</th>
					<th>Training level</th>
					<th>Secondary training level</th>
					<th></th>
				</tr>
			</thead>
		</table>
	</div>

	<div class="modal fade" id="add-edit-user-feature-modal" role="dialog" aria-labelledby="add-edit-user-feature-modal-title" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	        <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="add-edit-user-feature-modal-title">Grant feature</h4>
	        </div>
	        <div class="modal-body">
				<div class="row">
					<div class="col-xs-12">
						<div class="form-group">
							<label for="user-feature-feature">Feature</label>
							<select class="form-control" id="user-feature-feature" name="feature">
								<option value="CASE_LOG">Case Log</option>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<form role="form" class="user-feature-form user-id-form" action="/user_features" method="post">
							{!! csrf_field() !!}
							<input type="hidden" name="feature" />
							<div class="form-group">
								<label for="user-feature-id">User</label>
								<select class="form-control select2" id="user-feature-id" name="user_id" data-placeholder="Select user" required>
	@foreach($userTypeLabels as $userType => $userTypeLabel)
									<optgroup label="{{ $userTypeLabel }}">
		@foreach($featureUsers[$userType] as $featureUser)
										<option value="{{ $featureUser->id }}">{{ $featureUser->full_name }}</option>
		@endforeach
									</optgroup>
	@endforeach
								</select>
							</div>
							<button type="submit" class="btn btn-success center-block"><span class="glyphicon glyphicon-plus"></span> Grant to user</button>
						</form>
					</div>
					<div class="col-md-6">
						<form role="form" class="user-feature-form user-types-form" action="/user_features" method="post">
							{!! csrf_field() !!}
							<input type="hidden" name="feature" />
							<div class="form-group">
								<label for="user-feature-type">Type</label>
								<select class="form-control" id="user-feature-type" name="user_type" required>
	@foreach($userTypes as $userType => $userTypeLabel)
									<option value="{{ $userType }}">{{ $userTypeLabel }}</option>
	@endforeach
								</select>
							</div>
							<div class="form-group">
								<label for="user-feature-training-level">Training level</label>
								<select class="form-control" id="user-feature-training-level" name="user_training_level" placeholder="Optional">
									<option value="">Select a training level (optional)</option>
	@foreach($residentTrainingLevels as $trainingLevel => $trainingLevelLabel)
									<option value="{{ $trainingLevel }}">{{ $trainingLevelLabel }}</option>
	@endforeach
								</select>
							</div>
							<div class="form-group">
								<label for="user-feature-secondary-training-level">Secondary training level</label>
								<input type="text" class="form-control" id="user-feature-secondary-training-level" name="user_secondary_training_level" placeholder="Optional" />
							</div>
							<button type="submit" class="btn btn-success center-block"><span class="glyphicon glyphicon-plus"></span> Grant to group</button>
						</form>
					</div>
				</div>
	        </div>
	    </div>
	  </div>
	</div>
@stop

@section("script")
	<script>
		var featureNames = {!! json_encode(config("constants.FEATURE_NAMES")) !!};
		var userFeaturesTable = $("#user-features-table").DataTable({
			ajax: {
				url: "/user_features",
				data: {
					with: {
						user: ["full_name"]
					}
				},
				dataSrc: ""
			},
			columns: [
				{data: "id"},
				{data: "feature", render: function(feature){
					return featureNames[feature];
				}},
				{data: "user.full_name", render: function(userName){
					return userName ? userName : "";
				}},
				{data: "user_type", render: function(type){
					if(type)
						return ucfirst(type);
					return "";
				}},
				{data: "user_training_level", render: renderTrainingLevel},
				{data: "user_secondary_training_level", render: renderSecondaryTrainingLevel},
				{data: null, render: function(userFeature){
					var buttons = createEditAndDeleteButtons(userFeature, "user-feature");
					return buttons[1];
				}}
			],
			order: [[0, "desc"]]
		});

		$("#add-user-feature-button").click(function(){
			$("#add-edit-user-feature-modal").modal("show");
		});

		$("#user-feature-type").change(function(){
			var type = $(this).val();
			$("#user-feature-training-level, #user-feature-secondary-training-level")
				.prop("disabled", (type !== "resident"));
		});

		$(".user-feature-form").submit(function(event){
			event.preventDefault();
			var form = $(this);
			var feature = $("#user-feature-feature").val();
			form.find("input[name='feature']").val(feature);

			var button = form.find("button[type='submit']");
			var data = form.serializeArray();
			var action = form.attr("action");

			button.prop("disabled", true).addClass("disabled");
			$.ajax({
				url: action,
				method: "POST",
				data: data
			}).done(function(response){
				if(response === "success")
					userFeaturesTable.ajax.reload();
				else
					appendAlert("There was a problem saving the feature.");
			}).fail(function(err){
				appendAlert("There was a problem saving the feature.");
			}).always(function(){
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		$("#user-features-table").on("click", ".delete-user-feature-button", confirmDeletion);

		$("#user-features-table").on("click", ".delete-user-feature-button.confirm-delete", function(){
			var userFeatureId = $(this).data("id");
			var button = $(this);
			button.prop("disabled", true).addClass("disabled");
			$.ajax({
				url: "/user_features/" + userFeatureId,
				method: "POST", // DELETE
				data: {
					_token: "{{ csrf_token() }}",
					_method: "DELETE"
				}
			}).done(function(response){
				if(response === "success")
					userFeaturesTable.ajax.reload();
				else
					appendAlert("There was a problem deleting the feature.");
			}).fail(function(err){
				appendAlert("There was a problem deleting the feature.");
			}).always(function(){
				if(button)
					button.prop("disabled", false).removeClass("disabled");
			});
		});
	</script>
@stop

@extends("app")

@section("body")
	<h1>User features
		<button type="button" class="btn btn-sm btn-success" id="add-user-feature-button">
			<span class="glyphicon glyphicon-plus"></span>
			Add user feature
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

	<div class="modal fade" id="add-edit-user-feature-modal" tabindex="-1" role="dialog" aria-labelledby="add-edit-user-feature-modal-title" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
		  <form role="form" id="add-edit-user-feature-form" method="post" action="/user_features">
			<input type="hidden" name="_method" value="PATCH" disabled />
			{!! csrf_field() !!}
	        <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="add-edit-user-feature-modal-title"></h4>
	        </div>
	        <div class="modal-body">
				<section class="user-id-group">
					<div class="form-group">
						<label for="user-feature-id">User</label>
						<select id="user-feature-id" name="user_id">
	@foreach($userTypes as $userType => $userTypeLabel)
							<optgroup label="{{ $userTypeLabel }}">
		@foreach($featureUsers[$userType] as $featureUser)
								<option value="{{ $featureUser->id }}">{{ $featureUser->full_name }}</option>
		@endforeach
							</optgroup>
	@endforeach
						</select>
					</div>
				</section>
				<hr />
				<section class="user-types-group">

				</section>
	        </div>
	        <div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="submit" class="btn"></button>
	        </div>
		  </form>
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
				{data: "user.full_name"},
				{data: "user_type", render: function(type){
					if(type)
						return ucfirst(type);
					return "";
				}},
				{data: "user_training_level", render: renderTrainingLevel},
				{data: "user_secondary_training_level", render: renderSecondaryTrainingLevel},
				{data: null, render: function(userFeature){
					var buttons = createEditAndDeleteButtons(userFeature, "user-feature");
					return buttons.join(" ");
				}}
			],
			order: [[0, "desc"]]
		});

		$("#add-user-feature-button").click(function(){

		});

		$("#user-features-table").on("click", ".edit-user-feature-button", function(){
			// TODO
		});

		$("#user-feature-table").on("click", ".delete-user-feature-button", confirmDeletion);

		$("#user-features-table").on("click", ".delete-user-feature-button.confirm-delete", function(){
			// TODO
		});
	</script>
@stop

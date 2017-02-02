@extends("app")

@section("head")
	<style>
		#milestone-levels-container .form-group label {
			width: 100%;
		}

		#milestone-levels-container .form-group label input,
		#milestone-levels-container .form-group label textarea {
			font-weight: normal;
		}
	</style>
@stop

@section("blockless-body")
<div class="container body-block">
	<div class="row">
		<h2 class="sub-header">
			Milestones
			<button class="btn btn-success btn-xs"
					data-toggle="modal" data-target="#add-milestone-modal"
					data-id="Milestone" id="add-milestone-button">
				<span class="glyphicon glyphicon-plus"></span>
				Add New
			</button>
		</h2>
    	<data-table id="milestones-table"
			:thead="milestonesThead" :config="milestonesConfig"></data-table>
	</div>
	
	<alert-list v-model="milestoneAlerts"></alert-list>
	
	<show-hide-button class="btn btn-info"
		v-model="show.milestoneOrder" text="order milestones"></show-hide-button>
	
	<div v-cloak v-if="show.milestoneOrder" class="panel panel-default">
		<div class="panel-heading">
			Order milestones
		</div>
		<div class="panel-body">
			<ordering-list v-model="orderedMilestones" :items="milestones">
				<template scope="milestone">
					@{{ milestone.title }}
				</template>
			</ordering-list>
		</div>
	</div>
</div>
<div class="container body-block">
	<div class="row">
		<h2 class="sub-header">
			Competencies
			<button class="btn btn-success btn-xs" data-toggle="modal"
					data-target="#add-competency-modal" data-id="Competency"
					id="add-competency-button">
				<span class="glyphicon glyphicon-plus"></span>
				Add New
			</button>
		</h2>
		<data-table id="competencies-table"
			:thead="competenciesThead" :config="competenciesConfig"></data-table>
	</div>
	
	<alert-list v-model="competencyAlerts"></alert-list>
	
	<show-hide-button class="btn btn-info"
		v-model="show.competencyOrder" text="order competencies"></show-hide-button>
	
	<div v-cloak v-if="show.competencyOrder" class="panel panel-default">
		<div class="panel-heading">
			Order competencies
		</div>
		<div class="panel-body">
			<ordering-list v-model="orderedCompetencies" :items="competencies">
				<template scope="competency">
					@{{ competency.title }}
				</template>
			</ordering-list>
		</div>
	</div>
</div>

	<!-- Add Milestone Modal -->
	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="add-milestone-modal-title" aria-hidden="true" id="add-milestone-modal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="add-milestone-modal-title">Add Milestone</h4>
	      </div>
	      <form class="form" id="add-milestone-form" method="POST" action="/milestones" data-type="milestone">
			{!! csrf_field() !!}
	        <div class="modal-body">
	          <div class="form-group">
	            <label for="milestone-title">Milestone Title</label>
	            <input type="text" class="form-control" id="milestone-title" name="title" placeholder="Title" required>
	          </div>
			  <div class="form-group">
				<label for="milestone-type">Milestone Type</label>
				<input type="text" class="form-control" id="milestone-type" name="type" list="milestone-type-list" placeholder="Type" value="resident" required />
				<datalist id="milestone-type-list">
	@foreach($milestoneTypes as $milestoneType)
					<option value="{{ $milestoneType }}" />
	@endforeach
				</datalist>
			  </div>
			  <div class="form-group">
				<label for="milestone-training-level">Subspecialty (optional)</label>
				<input type="text" class="form-control" id="milestone-training-level" name="training_level" list="milestone-training-level-list" placeholder="Subspecialty (optional)" />
				<datalist id="milestone-training-level-list">
	@foreach($milestoneTrainingLevels as $milestoneTrainingLevel)
					<option value="{{ $milestoneTrainingLevel }}" />
	@endforeach
				</datalist>
			  </div>
	          <div class="form-group">
	            <label for="milestone-description">Milestone Description</label>
	            <input type="text" class="form-control" id="milestone-description" name="description" placeholder="Description" required>
	          </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="submit" class="btn btn-success">Add</button>
	        </div>
	      </form>
	    </div>
	  </div>
	</div>

	<!-- Edit Milestone Modal -->
	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="edit-milestone-modal-title" aria-hidden="true" id="edit-milestone-modal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="edit-milestone-modal-title">Edit Milestone</h4>
	      </div>
	      <form id="edit-milestone-form" method="POST" action="/milestones/" data-type="milestone">
			{!! csrf_field() !!}
			<input type="hidden" name="_method" value="PATCH" />
	        <div class="modal-body">
	          <div class="form-group">
	            <label for="edit-milestone-title">Milestone Title</label>
	            <input type="text" class="form-control" id="edit-milestone-title" name="title" placeholder="Title" required />
	          </div>
			  <div class="form-group">
				<label for="edit-milestone-type">Milestone Type</label>
				<input type="text" class="form-control" id="edit-milestone-type" name="type" list="milestone-type-list" placeholder="Type" value="resident" required />
			  </div>
			  <div class="form-group">
				<label for="edit-milestone-training-level">Subspecialty</label>
				<input type="text" class="form-control" id="edit-milestone-training-level" name="training_level" list="milestone-training-level-list" />
			  </div>
	          <div class="form-group">
	            <label for="edit-milestone-description">Milestone Description</label>
	            <input type="text" class="form-control" id="edit-milestone-description" name="description" placeholder="Description" required />
	          </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="submit" class="btn btn-success">Edit</button>
	        </div>
	      </form>
	    </div>
	  </div>
	</div>

	<!-- Delete Milestone Modal -->
	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="delete-milestone-modal-title" aria-hidden="true" id="delete-milestone-modal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="delete-milestone-modal-title">Delete Milestone</h4>
	      </div>
	      <form id="delete-milestone-form" method="post" action="/milestones/" data-type="milestone">
			{!! csrf_field() !!}
			<input type="hidden" name="_method" value="DELETE" />
	        <div class="modal-body">
	          Are you sure you want to delete this milestone? This cannot be undone.
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
	          <button type="submit" class="btn btn-danger">Delete</button>
	        </div>
	      </form>
	    </div>
	  </div>
	</div>

	<!-- Milestone Levels Modal -->
	<div class="modal fade" id="milestone-levels-modal" tabindex="-1" role="dialog" aria-labelledby="milestone-levels-title" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<form id="milestone-levels-form" method="POST" action="/milestones/{id}/levels">
					{!! csrf_field() !!}
					<input type="hidden" name="_method" value="PATCH" />
					<input type="hidden" id="milestone-levels-id" name="id" />
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title" id="milestone-levels-title">Milestone levels</h4>
					</div>
					<div class="modal-body">
						<div id="milestone-levels-container">
						</div>
						<button type="button" id="append-milestone-level" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span> Add level</button>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="submit" class="btn btn-primary">Save levels</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- Add Competency Modal -->
	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="add-competency-modal-title" aria-hidden="true" id="add-competency-modal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="add-competency-modal-title">Add Competency</h4>
	      </div>
	      <form id="add-competency-form" method="POST" action="/competencies" data-type="competency">
			{!! csrf_field() !!}
	        <div class="modal-body">
	          <div class="form-group">
	            <label for="add-competency-title">Competency Title</label>
	            <input type="text" class="form-control" id="add-competency-title" name="title" placeholder="Title" required>
	          </div>
	          <div class="form-group">
	            <label for="add-competency-description">Competency Description</label>
	            <input type="text" class="form-control" id="add-competency-description" name="description" placeholder="Description" required>
	          </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="submit" class="btn btn-success">Add</button>
	        </div>
	      </form>
	    </div>
	  </div>
	</div>

	<!-- Edit Competency Modal -->
	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="edit-competency-modal-title" aria-hidden="true" id="edit-competency-modal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="edit-competency-modal-title">Edit Competency</h4>
	      </div>
	      <form id="edit-competency-form" method="post" action="/competencies/" data-type="competency">
			{!! csrf_field() !!}
			<input type="hidden" name="_method" value="PATCH" />
	        <div class="modal-body modal-EditC">
	          <div class="form-group">
	            <label for="edit-competency-title">Competency Title</label>
	            <input type="text" class="form-control" id="edit-competency-title" name="title" placeholder="Title" required>
	          </div>
	          <div class="form-group">
	            <label for="edit-competency-description">Competency Description</label>
	            <input type="text" class="form-control" id="edit-competency-description" name="description" placeholder="Description" required>
	          </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="submit" class="btn btn-success">Edit</button>
	        </div>
	      </form>
	    </div>
	  </div>
	</div>

	<!-- Delete Competency Modal -->
	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="delete-competency-modal-title" aria-hidden="true" id="delete-competency-modal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="delete-competency-modal-title">Edit Competency</h4>
	      </div>
	      <form id="delete-competency-form" method="post" action="/competencies/" data-type="competency">
			{!! csrf_field() !!}
			<input type="hidden" name="_method" value="DELETE" />
	        <div class="modal-body">
				Are you sure you want to delete this competency? This cannot be undone.
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
	          <button type="submit" class="btn btn-danger">Delete</button>
	        </div>
	      </form>
	    </div>
	  </div>
	</div>
@stop

@section("script")
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManageMilestonesCompetencies('main');
	</script>
	<script>
		var levelHtml = '<div class="row milestone-level">' +
							'<button type="button" class="close remove-milestone-level">&times;</button>' +
							'<div class="form-group">' +
								'<label> Name' +
									'<input type="text" class="form-control level-name" placeholder="Level name" />' +
								'</label>' +
							'</div>' +
							'<div class="form-group">' +
								'<label> Description' +
									'<textarea class="form-control level-description" placeholder="Level description"></textarea>' +
								'</label>' +
							'</div>' +
						'</div>' +
						'<hr />';

		$(document).on("click", ".edit-milestone-button", function(){
			$("#edit-milestone-form").attr("action", "/milestones/" + $(this).data("id"));
			$("#edit-milestone-title").val($(this).data("title"));
			$("#edit-milestone-type").val($(this).data("type"));
			$("#edit-milestone-training-level").val($(this).data("trainingLevel"));
			$("#edit-milestone-description").val($(this).data("description"));
			$("#edit-milestone-modal").modal("show");
		});

		$(document).on("click", ".edit-competency-button", function(){
			$("#edit-competency-form").attr("action", "/competencies/" + $(this).data("id"));
			$("#edit-competency-title").val($(this).data("title"));
			$("#edit-competency-description").val($(this).data("description"));
			$("#edit-competency-modal").modal("show");
		});

		$(document).on("click", ".delete-milestone-button", function(){
			$("#delete-milestone-form").attr("action", "/milestones/" + $(this).data("id"));
			$("#delete-milestone-modal").modal("show");
		});

		$(document).on("click", ".delete-competency-button", function(){
			$("#delete-competency-form").attr("action", "/competencies/" + $(this).data("id"));
			$("#delete-competency-modal").modal("show");
		});

		$(document).on("submit", "#add-milestone-form, #edit-milestone-form, #delete-milestone-form, "
				+ "#add-competency-form, #edit-competency-form, #delete-competency-form", function(event){
			event.preventDefault();
			var form = $(this);
			var modal = $(this).parents(".modal");
			var button = $(this).find("button[type='submit']");
			button.prop("disabled", true).addClass("disabled");
			$.ajax({
				url: $(this).attr("action"),
				method: "POST", // or PATCH
				data: $(this).serialize()
			}).done(function(response){
				if(response === "success"){
					var tableSelector;
					switch(form.data("type")){
						case "milestone":
							tableSelector = "#milestones-table";
							break;
						case "competency":
							tableSelector = "#competencies-table";
							break;
					}
					if(tableSelector)
						$(tableSelector).DataTable({
							retrieve: true
						}).ajax.reload();
						
					modal.modal("hide");
				}
				else
					appendAlert("There was a problem, nothing was added, edited, or deleted.", modal.find(".modal-header"));
			}).fail(function(){
				appendAlert("There was a problem, nothing was added, edited, or deleted.", modal.find(".modal-header"));
			}).always(function(){
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		$(document).on("click", ".edit-milestone-levels-button", function(){
			// TODO: Open modal and show a loading bar or something
			var button = $(this);
			button.prop("disabled", true).addClass("disabled");
			var milestoneId = $(this).data("id");
			var milestoneTitle = $(this).data("title");
			$.get("/milestones/" + milestoneId).then(function(milestone){
				$("#milestone-levels-id").val(milestoneId);
				$("#milestone-levels-title").text(milestoneTitle + " levels");
				$("#milestone-levels-container").empty();

				if(milestone.levels.length > 0){
					for(var i = 0; i < milestone.levels.length; i++){
						appendMilestoneLevel(milestone.levels[i].name, milestone.levels[i].description);
					}
				}
				else {
					appendMilestoneLevel();
				}

				$("#milestone-levels-modal").modal("show");
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		$(document).on("keyup", "#milestone-levels-container .level-name, .level-description", function(){
			var level = $(this).parents(".milestone-level");
			var sibling = $(this).parents(".form-group").siblings(".form-group").find(".level-name, .level-description");
			if(($(this).val() && !sibling.val()) || !$(this).val() && sibling.val()){
				if(!level.hasClass("has-error")){
					level.addClass("has-error");
					level.append("<span class='help-block'>Please complete both fields, or neither, or remove the level.</span>");
				}
			}
			else if(level.hasClass("has-error")){
				level.removeClass("has-error");
				level.find(".help-block").remove();
			}
		});

		$(document).on("click", "#milestone-levels-container .remove-milestone-level", function(event){
			$(this).parent().remove();
		});

		$(document).on("click", "#append-milestone-level", function(){
			appendMilestoneLevel();
		});

		$(document).on("submit", "#milestone-levels-form", function(event){
			event.preventDefault();
			var submitButton = $(this).find("button[type='submit']");
			submitButton.prop("disabled", true).addClass("disabled");

			var milestoneId = $("#milestone-levels-id").val();

			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.levels = [];

			var incompleteLevels = [];
			$("#milestone-levels-container").children(".milestone-level").each(function(){
				var name = $(this).find(".level-name").val();
				var description = $(this).find(".level-description").val();

				if(name && description){
					data.levels.push({
						name: name,
						description: description
					});
				}
				else if(!name && !description){

				}
				else if(!name){
					incompleteLevels.push($(this).find(".level-name"));
				}
				else if(!description){
					incompleteLevels.push($(this).find(".level-description"));
				}
			});

			if(incompleteLevels.length > 0){
				appendAlert("Please complete all levels, remove or leave entirely blank any incomplete fields.", "#milestone-levels-modal .modal-header");
				incompleteLevels[0].focus();
				submitButton.prop("disabled", false).removeClass("disabled");
				return;
			}

			var action = $(this).attr("action");
			$.ajax({
				url: "/milestones/" + milestoneId + "/levels",
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if(response === "success"){
					$("#milestone-levels-modal").modal("hide");
				}
				else {
					appendAlert(response, "#milestone-levels-modal .modal-header");
				}
				submitButton.prop("disabled", false).removeClass("disabled");
			}).fail(function(err){
				appendAlert("There was a problem saving the levels.", "#milestone-levels-modal .modal-header");
				submitButton.prop("disabled", false).removeClass("disabled");
			});
		});

		function appendMilestoneLevel(levelName, levelDesc){
			var levelNumber = parseInt($("#milestone-levels-container").children().last().data("levelNumber"), 10);
			levelNumber++;

			var newLevelHtml = $.parseHTML(levelHtml);
			if(levelName)
				$(newLevelHtml).find(".level-name").val(levelName);
			if(levelDesc)
				$(newLevelHtml).find(".level-description").val(levelDesc);

			$("#milestone-levels-container").append(newLevelHtml);
		}
	</script>
@stop

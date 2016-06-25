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

@section("body")
	<div class="row">
		<h2 class="sub-header">Milestones  <button class="addMSModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-addMS-modal" data-id="Milestone" id="addMSBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
    	<div class="table-responsive">
        	<table class="table table-striped datatable-milestones">
        		<thead>
            		<tr>
		            	<th>Title</th>
						<th>Type</th>
						<th>Subspecialty</th>
		            	<th>Description</th>
		            	<th>Action</th>
            		</tr>
        		</thead>
			</table>
		</div>
	</div>
</div>
<div class="container body-block">
	<div class="row">
		<h2 class="sub-header">Competencies  <button class="addCModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-addC-modal" data-id="Competency" id="addCBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="table-responsive">
			<table class="table table-striped datatable-competencies">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>

	<!-- Add Milestone Modal -->
	<div class="modal fade bs-addMS-modal" tabindex="-1" role="dialog" aria-labelledby="modalAddMS" aria-hidden="true" id="addMSModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="myModalAddMS">Add Milestone</h4>
	      </div>
	      <form id="add-milestone-form" method="post" action="/manage/milestones/add">
			{!! csrf_field() !!}
	        <div class="modal-body modal-addMS">
	          <div class="form-group">
	            <label for="milestone_title">Milestone Title</label>
	            <input type="text" class="form-control" id="milestone_title" name="title" placeholder="Title" required>
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
	            <label for="milestone_description">Milestone Description</label>
	            <input type="text" class="form-control" id="milestone_description" name="description" placeholder="Description" required>
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
	<div class="modal fade bs-editMS-modal" tabindex="-1" role="dialog" aria-labelledby="modalAddMS" aria-hidden="true" id="editMSModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="myModalEditMS">Edit Milestone</h4>
	      </div>
	      <form id="edit-milestone-form" method="post" action="/manage/milestones/edit">
			{!! csrf_field() !!}
			<input type="hidden" id="milestone_id" name="id" value="" />
	        <div class="modal-body modal-addMS">
	          <div class="form-group">
	            <label for="milestone_title">Milestone Title</label>
	            <input type="text" class="form-control" id="milestone_title" name="title" placeholder="Title" required />
	          </div>
			  <div class="form-group">
				<label for="milestone-type">Milestone Type</label>
				<input type="text" class="form-control" id="milestone-type" name="type" list="milestone-type-list" placeholder="Type" value="resident" required />
			  </div>
			  <div class="form-group">
				<label for="milestone-training-level">Subspecialty</label>
				<input type="text" class="form-control" id="milestone-training-level" name="training_level" list="milestone-training-level-list" />
			  </div>
	          <div class="form-group">
	            <label for="milestone_description">Milestone Description</label>
	            <input type="text" class="form-control" id="milestone_description" name="description" placeholder="Description" required />
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
	<div class="modal fade bs-deleteMS-modal" tabindex="-1" role="dialog" aria-labelledby="modalAddMS" aria-hidden="true" id="deleteMSModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="myModalDeleteMS">Delete Milestone</h4>
	      </div>
	      <form id="delete-milestone-modal" method="post" action="/manage/milestones/delete">
			<input type="hidden" id="milestone_id" name="id" value="" />
			{!! csrf_field() !!}
	        <div class="modal-body modal-addMS">
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
				<form id="milestone-levels-form" method="POST" action="/manage/milestones/levels">
					{!! csrf_field() !!}
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
	<div class="modal fade bs-addC-modal" tabindex="-1" role="dialog" aria-labelledby="modalAddC" aria-hidden="true" id="addCModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="myModalAddC">Add Competency</h4>
	      </div>
	      <form id="add-competency-form" method="post" action="/manage/competencies/add">
			{!! csrf_field() !!}
	        <div class="modal-body modal-addC">
	          <div class="form-group">
	            <label for="competency_title">Competency Title</label>
	            <input type="text" class="form-control" id="competency_title" name="title" placeholder="Title" required>
	          </div>
	          <div class="form-group">
	            <label for="competency_description">Competency Description</label>
	            <input type="text" class="form-control" id="competency_description" name="description" placeholder="Description" required>
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
	<div class="modal fade bs-editC-modal" tabindex="-1" role="dialog" aria-labelledby="modalEditC" aria-hidden="true" id="editCModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="myModalEditC">Edit Competency</h4>
	      </div>
	      <form id="edit-competency-form" method="post" action="/manage/competencies/edit">
			<input type="hidden" id="competency_id" name="id" value="" />
			{!! csrf_field() !!}
	        <div class="modal-body modal-EditC">
	          <div class="form-group">
	            <label for="competency_title">Competency Title</label>
	            <input type="text" class="form-control" id="competency_title" name="title" placeholder="Title" required>
	          </div>
	          <div class="form-group">
	            <label for="competency_description">Competency Description</label>
	            <input type="text" class="form-control" id="competency_description" name="description" placeholder="Description" required>
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
	<div class="modal fade bs-deleteC-modal" tabindex="-1" role="dialog" aria-labelledby="modalDeleteC" aria-hidden="true" id="deleteCModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="myModalDeleteC">Edit Competency</h4>
	      </div>
	      <form id="delete-competency-form" method="post" action="/manage/competencies/delete">
			<input type="hidden" id="competency_id" name="id" value="" />
			{!! csrf_field() !!}
	        <div class="modal-body modal-deleteC">
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

		$(".datatable-milestones").on("click", ".editMilestone", function(){
			var milestoneId = $(this).data("id");
			var siblings = $(this).parent().siblings();
			var milestoneTitle = siblings[0].innerHTML;
			var milestoneType = siblings[1].innerHTML;
			var milestoneTrainingLevel = siblings[2].innerHTML;
			var milestoneDescription = siblings[3].innerHTML;

			$("#editMSModal").find("#milestone_id").val(milestoneId);
			$("#editMSModal").find("#milestone_title").val(milestoneTitle);
			$("#editMSModal").find("#milestone-type").val(milestoneType);
			$("#editMSModal").find("#milestone-training-level").val(milestoneTrainingLevel);
			$("#editMSModal").find("#milestone_description").val(milestoneDescription);
		});

		$(".datatable-competencies").on("click", ".editCompetency", function(){
			var competency_id = $(this).data("id");
			var competency_title = $(this).parent().siblings()[0].innerHTML;
			var competency_description = $(this).parent().siblings()[1].innerHTML;

			$("#editCModal").find("#competency_id").val(competency_id);
			$("#editCModal").find("#competency_title").val(competency_title);
			$("#editCModal").find("#competency_description").val(competency_description);
		});

		$(".datatable-milestones").on("click", ".deleteMilestone", function(){
			var milestone_id = $(this).data("id");
			$("#deleteMSModal").find("#milestone_id").val(milestone_id);
		});

		$(".datatable-competencies").on("click", ".deleteCompetency", function(){
			var competency_id = $(this).data("id");
			$("#deleteCModal").find("#competency_id").val(competency_id);
		});

		$("#add-milestone-form, #edit-milestone-form").on("submit", function(event){
			event.preventDefault();
			addEditAjax(this, ".datatable-milestones");
		});
		$("#add-competency-form, #edit-competency-form").on("submit", function(event){
			event.preventDefault();
			addEditAjax(this, ".datatable-competencies");
		});

		$(".datatable-milestones").on("click", ".edit-milestone-levels", function(){
			// TODO: Open modal and show a loading bar or something
			var button = $(this);
			button.prop("disabled", true).addClass("disabled");
			var milestoneId = $(this).data("milestoneId");
			var milestoneTitle = $(this).data("milestoneTitle");
			$.get("/manage/milestone/" + milestoneId + "/levels").then(function(levels){
				$("#milestone-levels-id").val(milestoneId);
				$("#milestone-levels-title").text(milestoneTitle + " levels");
				$("#milestone-levels-container").empty();

				if(levels.length > 0){
					for(var i = 0; i < levels.length; i++){
						appendMilestoneLevel(levels[i].name, levels[i].description);
					}
				}
				else {
					appendMilestoneLevel();
				}

				$("#milestone-levels-modal").modal("show");
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		$("#milestone-levels-container").on("keyup", ".level-name, .level-description", function(){
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

		$("#milestone-levels-container").on("click", ".remove-milestone-level", function(event){
			$(this).parent().remove();
		});

		$("#append-milestone-level").click(function(){
			appendMilestoneLevel();
		});

		$("#milestone-levels-form").submit(function(event){
			event.preventDefault();
			var submitButton = $(this).find("button[type='submit']");
			submitButton.prop("disabled", true).addClass("disabled");

			var data = {};
			data.id = $("#milestone-levels-id").val();
			data._token = "{{ csrf_token() }}";
			data.ajax = true;
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
			$.post(action, data).done(function(response){
				if(response === "true"){
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

		function addEditAjax(form, table){
			var data = $(form).serialize() + "&ajax=true";
			var modal = $(form).parents(".modal");
			$.post($(form).prop("action"), data, function(response){
				if(response == "true"){
					modal.modal("hide");
					$(table).DataTable({
						retrieve: true
					}).ajax.reload();
				}
				else{
					appendAlert(response, modal.find(".modal-body"));
				}
			});
		}

		$("#delete-competency-form").on("submit", function(event){
			event.preventDefault();
			var id = $(this).find("#competency_id").val();
			var row = $("#delete-competency-button-" + id).parents("tr");
			deleteAjax(this, ".datatable-competencies", row);
		});

		$("#delete-milestone-form").on("submit", function(event){
			event.preventDefault();
			var id = $(this).find("#milestone_id").val();
			var row = $("#delete-milestone-button-" + id).parents("tr");
			deleteAjax(this, ".datatable-milestones", row);
		});

		function deleteAjax(form, table, row){
			var data = $(form).serialize() + "&ajax=true";
			var modal = $(form).parents(".modal");
			$.post($(form).prop("action"), data, function(response){
				if(response == "true"){
					modal.modal("hide");
					row.velocity("fadeOut", function(){
						$(table).DataTable({
							retrieve: true
						}).row(row).remove().draw(false);
					});
				}
				else{
					appendAlert(response, modal.find(".modal-body"));
				}
			});
		}

		$(document).ready(function(){
			$(".datatable-milestones").DataTable({
				"ajax": {
					"url": "/manage/milestones/get"
				},
				"dom": "lfprtip",
				stateSave: true
			});

			$(".datatable-competencies").DataTable({
				"ajax": {
					"url": "/manage/competencies/get"
				},
				"dom": "lfprtip",
				stateSave: true
			});
		});
	</script>
@stop

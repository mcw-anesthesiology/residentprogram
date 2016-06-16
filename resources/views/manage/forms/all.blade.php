@extends("app")

@section("head")
	<style>
		#edit-form-visibility-group label {
			font-weight: normal;
			margin-left: 20px;
		}

		.visibility-edit {
			margin: 5px;
		}
	</style>
@stop

@section("body")
	<div class="row">
		<h2 class="sub-header">Evaluation forms <button class="addModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="Form" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add new</button></h2>
		<div class="table-responsive">
			<table class="table table-striped" id="resident-forms">
				<thead>
					<tr>
						<th>Title</th>
						<th>Evaluator type</th>
						<th>Created</th>
						<th>Status</th>
						<th>Subject visibility</th>
						<th>View</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header">Fellow-specific evaluation forms <button class="addModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="Form" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add new</button></h2>
		<div class="table-responsive">
			<table class="table table-striped" id="fellow-forms">
				<thead>
					<tr>
						<th>Title</th>
						<th>Evaluator type</th>
						<th>Created</th>
						<th>Status</th>
						<th>Subject visibility</th>
						<th>View</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>

<div class="container body-block">
	<div class="row">
		<h2 class="sub-header">Faculty evaluation forms <button class="addModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="Form" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add new</button></h2>
		<div class="table-responsive">
			<table class="table table-striped" id="faculty-forms">
				<thead>
					<tr>
						<th>Title</th>
						<th>Evaluator type</th>
						<th>Created</th>
						<th>Status</th>
						<th>Subject visibility</th>
						<th>View</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>


	<!-- Add Modal -->
	<div class="modal fade bs-add-modal" tabindex="-1" role="dialog" aria-labelledby="modalAdd" aria-hidden="true" id="addModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title" id="myModalAdd">Evaluation Builder</h4>
	      </div>
	      <form action="/manage/forms/add" method="get">
	        <div class="modal-body modal-add">
	      <!--
	          <div class="form-group">
	            <label for="evaluationForm">Please select a form to duplicate and modify</label>
	            <select class="form-control">
	        <?php
	      //  while(!is_null($formsRow)){
	      //  echo "<option value=\"{$formsRow["formId"]}\">{$formsRow["title"]}</option>";
	      //  $formsRow = $forms->fetch_assoc();
	      //  }
	        ?>
	            </select>
	            <br />
	              <div class="span7 text-center">
	        <button type="submit" class="btn btn-success">Choose</button>
	        </div>
	          </div>

	          <div class="select-or">
	            <hr class="hr-or">
	            <span class="span-or">or</span>
	          </div>
	      -->
	          <div class="form-group">
	      <div class="span7 text-center">
	        <button type="submit" class="btn btn-success">Create new evaluation form</button>
	      </div>
	          </div>

	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        </div>
	      </form>
	    </div>
	  </div>
	</div>

	<!-- Edit modal -->
	<div class="modal fade bs-edit-modal" tabindex="-1" role="dialog" aria-labelledby="edit-form-modal-title" aria-hidden="true" id="edit-form-modal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h3 class="modal-title" id="edit-form-modal-title">Edit form</h3>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="edit-form-title">Title</label>
						<input type="text" class="form-control" id="edit-form-title" />
						<input type="hidden" id="edit-form-id" />
						<input type="hidden" id="edit-form-type" />
					</div>
					<label>Subject visibilty</label>
					<div class="form-group" id="edit-form-visibility-group">
						<label><input type="radio" name="visibility" value="visible" /> Visible</label><br />
						<label><input type="radio" name="visibility" value="anonymous" /> Anonymous</label><br />
						<label><input type="radio" name="visibility" value="hidden" /> Hidden</label>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-info" data-dismiss="modal" id="edit-modal-submit">Save form</button>
				</div>
			</div>
		</div>
	</div>
@stop

@section("script")
	<script>
		$("#edit-modal-submit").click(function(){
			var formId = $("#edit-form-id").val();
			var formType = $("#edit-form-type").val();
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.title = $("#edit-form-title").val();
			data.visibility = $("#edit-form-modal input[name='visibility']:checked").val();
			data.action = "edit";
			$.post("/manage/forms/"+formId, data, function(response){
				if(response == "true"){
					$("#"+formType+"-forms").DataTable({
						"retrieve": true
					}).ajax.reload();
				}
				else{
					alert("Sorry, the form cannot be edited at this time");
				}
			}).fail(function(){
				alert("There was a problem editing the form.");
			});
		});

		$(document).on("click", ".edit-form-button", function(){
			var formId = $(this).data("id");
			var formType = $(this).data("type");
			var formTitle = $(this).data("title");
			var visibility = $(this).data("visibility");

			$("#edit-form-id").val(formId);
			$("#edit-form-type").val(formType);
			$("#edit-form-title").val(formTitle);
			$("#edit-form-modal input[value='" + visibility + "']").prop("checked", true);
		});

		$(document).on("click", ".disableEval", function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.action = "disable";
			var formId = $(this).data('id');
			var span = $(this).parent();
			var status = $(this).parents("tr").find(".status");
			$.ajax({
				type: "post",
				url: "/manage/forms/"+formId,
				data: data,
				success: function(response){
					if (response == "true"){
						span.velocity("fadeOut", function(){
							$(this).html("<button type='button' class='enableEval btn btn-success btn-xs' data-id='" + formId + "'><span class='glyphicon glyphicon-ok'></span> Enable</button>");
							$(this).velocity("fadeIn");
						});
						status.velocity("fadeOut", function(){
							$(this).html("<span class='badge badge-disabled'>inactive</span>");
							$(this).velocity("fadeIn");
						});
					}
				}
			});
		});

		$(document).on("click", ".enableEval", function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.action = "enable";
			var formId = $(this).data('id');
			var span = $(this).parent();
			var status = $(this).parents("tr").find(".status");
			$.ajax({
				type: "post",
				url: "/manage/forms/"+formId,
				data: data,
				success: function(response){
					if (response == "true"){
						span.velocity("fadeOut", function(){
							$(this).html("<button type='button' class='disableEval btn btn-danger btn-xs' data-id='" + formId + "'><span class='glyphicon glyphicon-remove'></span> Disable</button>");
							$(this).velocity("fadeIn");
						});
						status.velocity("fadeOut", function(){
							$(this).html("<span class='badge badge-complete'>active</span>");
							$(this).velocity("fadeIn");
						});
					}
				}
			});
		});

		$("body").popover({
			html: true,
			selector: ".visibility",
			trigger: "focus",
			placement: "auto top",
			title: "Subject visibility",
			content: function(){
				var formId = $(this).data("id");
				return "<button type='button' class='visibility-edit btn btn-info' data-form='" + formId + "' data-visibility='visible'>Visible <span class='glyphicon glyphicon-eye-open'></span></button> " +
				"<button type='button' class='visibility-edit btn' data-form='" + formId + "' data-visibility='anonymous'>Anonymous <span class='glyphicon glyphicon-eye-close'></span></button> " +
				"<button type='button' class='visibility-edit btn btn-default' data-form='" + formId + "' data-visibility='hidden'>Hidden <span class='glyphicon glyphicon-eye-close'></span></button> ";
			}
		});

		$("body").on("click", ".visibility-edit", function(){
			var formId = $(this).data("form");
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.action = "visibility";
			data.visibility = $(this).data("visibility");
			$.post("/manage/forms/" + formId, data, function(response){
				if(response == "true"){
					$(".edit-form-button[data-id='" + formId + "']").data("visibility", data.visibility);
					var button = $(".visibility[data-id='" + formId + "']");
					button.velocity("fadeOut", function(){
						switch(data.visibility){
							case "visible":
								button.removeClass("visibility-anonymous visibility-hidden btn-default");
								button.addClass("visibility-visible btn-info");
								button.html("Visible <span class='glyphicon glyphicon-eye-open'></span>");
								break;
							case "anonymous":
								button.removeClass("visibility-visible visibility-hidden btn-info btn-default");
								button.addClass("visibility-anonymous");
								button.html("Anonymous <span class='glyphicon glyphicon-eye-close'></span>");
								break;
							case "hidden":
								button.removeClass("visibility-anonymous visibility-visible btn-info");
								button.addClass("visibility-hidden btn-default");
								button.html("Hidden <span class='glyphicon glyphicon-eye-close'></span>");
								break;
						}
						button.velocity("fadeIn");
					});
				}
			});
		});

		$(document).ready(function(){
			$("#resident-forms").DataTable({
				"ajax": "/manage/forms/get/resident"
			});
			$("#faculty-forms").DataTable({
				"ajax": "/manage/forms/get/faculty"
			});
			$("#fellow-forms").DataTable({
				"ajax": "/manage/forms/get/fellow"
			});
		});
	</script>
@stop

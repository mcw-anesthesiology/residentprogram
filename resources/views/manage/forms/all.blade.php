@extends("app")

@section("body")
	<div class="row">
		<h2 class="sub-header">Evaluation forms <button class="addModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="Form" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add new</button></h2>
		<div class="table-responsive">
			<table class="table table-striped" id="resident-forms">
				<thead>
					<tr>
						<th>Title</th>
						<th>Created</th>
						<th>Status</th>
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
		<h2 class="sub-header">Fellow evaluation forms <button class="addModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="Form" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add new</button></h2>
		<div class="table-responsive">
			<table class="table table-striped" id="fellow-forms">
				<thead>
					<tr>
						<th>Title</th>
						<th>Created</th>
						<th>Status</th>
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
						<th>Created</th>
						<th>Status</th>
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
@stop

@section("script")
	<script>
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
						span.fadeOut(function(){
							$(this).html("<button type='button' class='enableEval btn btn-success btn-xs' data-id='" + formId + "'><span class='glyphicon glyphicon-ok'></span> Enable</button>");
							$(this).fadeIn();
						});
						status.fadeOut(function(){
							$(this).html("<span class='badge badge-disabled'>inactive</span>");
							$(this).fadeIn();
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
						span.fadeOut(function(){
							$(this).html("<button type='button' class='disableEval btn btn-danger btn-xs' data-id='" + formId + "'><span class='glyphicon glyphicon-remove'></span> Disable</button>");
							$(this).fadeIn();
						});
						status.fadeOut(function(){
							$(this).html("<span class='badge badge-complete'>active</span>");
							$(this).fadeIn();
						});
					}
				}
			});
		});

		$(document).ready(function(){
			$("#resident-forms").DataTable({
				"ajax": "/manage/forms/get/resident",
				"dom": "lfprtip",
				stateSave: true
			});
			$("#faculty-forms").DataTable({
				"ajax": "/manage/forms/get/faculty",
				"dom": "lfprtip",
				stateSave: true
			});
			$("#fellow-forms").DataTable({
				"ajax": "/manage/forms/get/fellow",
				"dom": "lfprtip",
				stateSave: true
			});
		});
	</script>
@stop

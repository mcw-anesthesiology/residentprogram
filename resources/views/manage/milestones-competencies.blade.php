@extends("app")

@section("body")
	<div class="row">
		<h2 class="sub-header">Milestones  <button class="addMSModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-addMS-modal" data-id="Milestone" id="addMSBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
      	<div class="table-responsive">
        	<table class="table table-striped datatable-milestones">
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

	<!-- Milestone Error Modal -->
    <div class="modal fade bs-milestone-error-modal" tabindex="-1" role="dialog" aria-labelledby="modalError" aria-hidden="true" id="errorMSModal">
        <div class="modal-dialog">
            <div class="modal-content">
				<div class="modal-header alert alert-danger">
					<h3><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Request Error</h3>
				</div>
				<div class="modal-body">
					<p>There was an error adding the milestone. Please try again.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
            </div>
        </div>
	</div>


	<!-- Competency Error Modal -->
    <div class="modal fade bs-competency-error-modal" tabindex="-1" role="dialog" aria-labelledby="modalError" aria-hidden="true" id="errorCModal">
        <div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header alert alert-danger">
					<h3><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Request Error</h3>
				</div>
				<div class="modal-body">
					<p>There was an error adding the competency. Please try again.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
            </div>
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
	      <form method="post" action="/manage/milestones/add">
			{!! csrf_field() !!}
	        <div class="modal-body modal-addMS">
	          <div class="form-group">
	            <label for="milestone_title">Milestone Title</label>
	            <input type="text" class="form-control" id="milestone_title" name="milestone_title" placeholder="Title" required>
	          </div>
	          <div class="form-group">
	            <label for="milestone_description">Milestone Description</label>
	            <input type="text" class="form-control" id="milestone_description" name="milestone_description" placeholder="Description" required>
	          </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="submit" class="btn btn-success" value="">Add</button>
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
	      <form method="post" action="/manage/milestones/edit">
			  {!! csrf_field() !!}
	        <div class="modal-body modal-addMS">
	          <div class="form-group">
	            <label for="milestone_title">Milestone Title</label>
	            <input type="text" class="form-control" id="milestone_title" name="milestone_title" placeholder="Title" required>
	          </div>
	          <div class="form-group">
	            <label for="milestone_description">Milestone Description</label>
	            <input type="text" class="form-control" id="milestone_description" name="milestone_description" placeholder="Description" required>
	          </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="submit" class="btn btn-success" id="submit" name="milestone_id" value="">Edit</button>
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
	      <form method="post" action="/manage/milestones/delete">
			  {!! csrf_field() !!}
	        <div class="modal-body modal-addMS">
	          Are you sure you want to delete this milestone? This cannot be undone.
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
	          <button type="submit" class="btn btn-danger" id="submit" name="milestone_id" value="">Delete</button>
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
	      <form method="post" action="/manage/competencies/add">
			  {!! csrf_field() !!}
	        <div class="modal-body modal-addC">
	          <div class="form-group">
	            <label for="competency_title">Competency Title</label>
	            <input type="text" class="form-control" id="competency_title" name="competency_title" placeholder="Title" required>
	          </div>
	          <div class="form-group">
	            <label for="competency_description">Competency Description</label>
	            <input type="text" class="form-control" id="competency_description" name="competency_description" placeholder="Description" required>
	          </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="submit" class="btn btn-success" value="">Add</button>
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
	      <form method="post" action="/manage/competencies/edit">
			  {!! csrf_field() !!}
	        <div class="modal-body modal-EditC">
	          <div class="form-group">
	            <label for="competency_title">Competency Title</label>
	            <input type="text" class="form-control" id="competency_title" name="competency_title" placeholder="Title" required>
	          </div>
	          <div class="form-group">
	            <label for="competency_description">Competency Description</label>
	            <input type="text" class="form-control" id="competency_description" name="competency_description" placeholder="Description" required>
	          </div>
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	          <button type="submit" class="btn btn-success" id="submit" name="competency_id" value="">Edit</button>
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
	      <form method="post" action="/manage/competencies/delete">
			  {!! csrf_field() !!}
	        <div class="modal-body modal-deleteC">
				Are you sure you want to delete this competency? This cannot be undone.
	        </div>
	        <div class="modal-footer">
	          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
	          <button type="submit" class="btn btn-danger" id="submit" name="competency_id" value="">Delete</button>
	        </div>
	      </form>
	    </div>
	  </div>
	</div>
@stop

@section("script")
	<script>
		$(".datatable-milestones").on("click", ".editMilestone", function(){
			var milestone_id = $(this).data("id");
			var milestone_title = $(this).parent().siblings()[0].innerHTML;
			var milestone_description = $(this).parent().siblings()[1].innerHTML;

			$("#editMSModal").find("#submit").val(milestone_id);
			$("#editMSModal").find("#milestone_title").val(milestone_title);
			$("#editMSModal").find("#milestone_description").val(milestone_description);
		});

		$(".datatable-competencies").on("click", ".editCompetency", function(){
			var competency_id = $(this).data("id");
			var competency_title = $(this).parent().siblings()[0].innerHTML;
			var competency_description = $(this).parent().siblings()[1].innerHTML;

			$("#editCModal").find("#submit").val(competency_id);
			$("#editCModal").find("#competency_title").val(competency_title);
			$("#editCModal").find("#competency_description").val(competency_description);
		});

		$(".datatable-milestones").on("click", ".deleteMilestone", function(){
			var milestone_id = $(this).data("id");
			$("#deleteMSModal").find("#submit").val(milestone_id);
		});

		$(".datatable-competencies").on("click", ".deleteCompetency", function(){
			var competency_id = $(this).data("id");
			$("#deleteCModal").find("#submit").val(competency_id);
		});

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

@extends("app")

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
	      <form method="post" action="/manage/milestones/add">
			{!! csrf_field() !!}
	        <div class="modal-body modal-addMS">
	          <div class="form-group">
	            <label for="milestone_title">Milestone Title</label>
	            <input type="text" class="form-control" id="milestone_title" name="milestone_title" placeholder="Title" required>
	          </div>
			  <div class="form-group">
				<label for="milestone-type">Milestone Type</label>
				<input type="text" class="form-control" id="milestone-type" name="milestone_type" list="milestone-type-list" placeholder="Type" value="resident" required />
				<datalist id="milestone-type-list">
	@foreach($milestoneTypes as $milestoneType)
					<option value="{{ $milestoneType }}" />
	@endforeach
				</datalist>
			  </div>
			  <div class="form-group">
				<label for="milestone-training-level">Subspecialty (optional)</label>
				<input type="text" class="form-control" id="milestone-training-level" name="milestone_training_level" list="milestone-training-level-list" placeholder="Subspecialty (optional)" />
				<datalist id="milestone-training-level-list">
	@foreach($milestoneTrainingLevels as $milestoneTrainingLevel)
					<option value="{{ $milestoneTrainingLevel }}" />
	@endforeach
				</datalist>
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
	            <input type="text" class="form-control" id="milestone_title" name="milestone_title" placeholder="Title" required />
	          </div>
			  <div class="form-group">
				<label for="milestone-type">Milestone Type</label>
				<input type="text" class="form-control" id="milestone-type" name="milestone_type" list="milestone-type-list" placeholder="Type" value="resident" required />
			  </div>
			  <div class="form-group">
				<label for="milestone-training-level">Subspecialty</label>
				<input type="text" class="form-control" id="milestone-training-level" name="milestone_training_level" list="milestone-training-level-list" />
			  </div>
	          <div class="form-group">
	            <label for="milestone_description">Milestone Description</label>
	            <input type="text" class="form-control" id="milestone_description" name="milestone_description" placeholder="Description" required />
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
			var milestoneId = $(this).data("id");
			var siblings = $(this).parent().siblings();
			var milestoneTitle = siblings[0].innerHTML;
			var milestoneType = siblings[1].innerHTML;
			var milestoneTrainingLevel = siblings[2].innerHTML;
			var milestoneDescription = siblings[3].innerHTML;

			$("#editMSModal").find("#submit").val(milestoneId);
			$("#editMSModal").find("#milestone_title").val(milestoneTitle);
			$("#editMSModal").find("#milestone-type").val(milestoneType);
			$("#editMSModal").find("#milestone-training-level").val(milestoneTrainingLevel);
			$("#editMSModal").find("#milestone_description").val(milestoneDescription);
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

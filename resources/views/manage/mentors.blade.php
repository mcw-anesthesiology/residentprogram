@extends("app")

@section("body")
	<div class="row">
		<h2 class="sub-header">Mentorships <button class="btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
		<div class="table-responsive">
			<table class="table table-striped datatable" id="mentorships-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Mentor</th>
						<th>Mentee</th>
						<th>Created</th>
						<th>Action</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>

<!-- Add Modal -->
  <div class="modal fade bs-add-modal" role="dialog" aria-labelledby="modalAdd" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalAdd">Add Mentorship</h4>
        </div>
        <form method="post" action="/manage/mentors/add" id="add-mentorship-form">
			{{ csrf_field() }}
        <div class="modal-body">
          <div class="form-group">
            <label for="faculty">Faculty</label>
            <select class="form-control select2" id="faculty" name="mentor_id" style="width: 100%">
            @foreach($faculty as $facultyMember)
                <option value="{{ $facultyMember->id }}">{{ $facultyMember->last_name }}, {{ $facultyMember->first_name }}</option>
            @endforeach
            </select>
          </div>
          <div class="form-group">
            <label for="resident">Resident</label>
            <select class="form-control select2" id="resident" name="mentee_id" style="width: 100%">
		@foreach(array_keys($residentGroups) as $residentGroupLabel)
			@if(count($residentGroups[$residentGroupLabel]) > 0)
				<optgroup label="{{ $residentGroupLabel }}">
				@foreach($residentGroups[$residentGroupLabel] as $resident)
					<option value="{{ $resident->id }}">{{ $resident->full_name }}</option>
				@endforeach
				</optgroup>
			@endif
		@endforeach
            </select>
          </div>
        </div>
        <div class="modal-footer modal-disable">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success">Add mentorship</button>
        </div>
      </form>
      </div>
    </div>
  </div>

<!-- Remove Modal -->
    <div class="modal fade bs-remove-modal" tabindex="-1" role="dialog" aria-labelledby="modalRemove" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalRemove">Disable Mentorship</h4>
          </div>
          <div class="modal-body">
            You have selected to <b>remove</b> this mentorship, are you sure?
          </div>
          <div class="modal-footer modal-disable">
            <form method="post" action="/manage/mentors/delete" id="remove-mentorship-form">
				{{ csrf_field() }}
				<input type="hidden" id="mentorship-id" name="mentorship_id" value="" />
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-danger">Delete mentorship</button>
            </form>
          </div>
        </div>
      </div>
    </div>
@stop

@section("script")
	<script>
		$("table").on("click", ".removeMentorship", function(){
			var mentorshipId = $(this).data("id");
			$("#mentorship-id").val(mentorshipId);
		});

		$("#add-mentorship-form").submit(function(event){
			event.preventDefault();
			var data = $(this).serialize() + "&ajax=true";
			var modal = $(this).parents(".modal");
			$.post($(this).prop("action"), data, function(response){
				if(response === "true"){
					modal.modal("hide");
					$("#mentorships-table").DataTable({
						retrieve: true
					}).ajax.reload();
				}
				else{
					appendAlert(response, modal.find(".modal-body"));
				}
			});
		});

		$("#remove-mentorship-form").submit(function(event){
			event.preventDefault();
			var mentorshipId = $("#mentorship-id").val();
			var data = $(this).serialize() + "&ajax=true";
			var modal = $(this).parents(".modal");
			var row = $("button[data-id='" + mentorshipId + "']").parents("tr");
			$.post($(this).prop("action"), data, function(response){
				if(response === "true"){
					modal.modal("hide");
					row.fadeOut(function(){
						$("#mentorships-table").DataTable({
							retrieve: true
						}).row(row).remove().draw(false);
					});
				}
				else{
					appendAlert(response, modal.find(".modal-body"));
				}
			});
		});

		$(document).ready(function(){
		  $(".datatable").each(function(){
			  $(this).dataTable({
				"ajax": "/manage/mentors/get",
				"order": [[0, "desc"]],
				"dom": "lfprtip",
				stateSave: true
			  });
		  });
		});
	</script>
@stop

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
        <form method="POST" action="/mentorships" id="add-mentorship-form">
			<input type="hidden" name="status" value="active" />
			{{ csrf_field() }}
        <div class="modal-body">
          <div class="form-group">
            <label for="faculty">Faculty</label>
            <select class="form-control select2" id="faculty" name="mentor_id" style="width: 100%">
            @foreach($mentors as $potentialMentor)
                <option value="{{ $potentialMentor->id }}">{{ $potentialMentor->last_name }}, {{ $potentialMentor->first_name }}</option>
            @endforeach
            </select>
          </div>
          <div class="form-group">
            <label for="resident">Trainee</label>
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
@stop

@section("script")
	<script>
		var mentorshipsDatatable = $("#mentorships-table").DataTable({
			ajax: {
				url: "/mentorships",
				data: {
					with: {
						mentor: true,
						mentee: true
					}
				},
				dataSrc: "",
			},
			columns: [
				{data: "id"},
				{data: "mentor.full_name"},
				{data: "mentee.full_name"},
				{data: "created_at", render: renderDateTimeCell, createdCell: createDateTimeCell},
				{data: null, orderable: false, render: function(data, type){
					return '<button class="delete-mentorship-button btn btn-danger btn-xs"'
						+ 'data-toggle="modal" data-target=".bs-remove-modal" '
						+ 'data-id="' + data.id + '">'
						+ '<span class="glyphicon glyphicon-remove"></span> Remove</button>';
				}}
			],
			order: [[0, "desc"]]
		});

		$("#mentorships-table").on("click", ".delete-mentorship-button", function(){
			$("#mentorships-table .confirm-delete-mentorship-button")
				.removeClass("confirm-delete-mentorship-button")
				.html('<span class="glyphicon glyphicon-remove"></span> Delete');
			$(this).addClass("confirm-delete-mentorship-button")
				.html('<span class="glyphicon glyphicon-alert"></span> Confirm delete');
		});

		$("#add-mentorship-form").submit(function(event){
			event.preventDefault();
			var data = $(this).serialize();
			var action = $(this).prop("action");
			var method = $(this).attr("method");
			var modal = $(this).parents(".modal");
			var button = modal.find("button[type='submit']");
			button.prop("disabled", true).addClass("disabled");
			$.ajax({
				url: action,
				method: method,
				data: data
			}).done(function(response){
				mentorshipsDatatable.ajax.reload();
			}).fail(function(response){
				appendAlert(response, modal.find(".modal-header"));
			}).always(function(response) {
				button.prop("disabled", false).removeClass("disabled");
			});
		});

		$("#mentorships-table").on("click", ".confirm-delete-mentorship-button", function(event){
			event.preventDefault();
			var mentorshipId = $(this).data("id");
			var data = {
				_token: "{{ csrf_token() }}",
				_method: "DELETE"
			};

			var row = $(this).parents("tr");
			var button = $(this);
			button.prop("disabled", true).addClass("disabled");
			$.ajax({
				method: "POST", // DELETE
				url: "/mentorships/" + mentorshipId,
				data: data
			}).done(function(response){
				if(response === "success")
					row.velocity("fadeOut", function(){
						mentorshipsDatatable.row(row).remove().draw(false);
					});
				else
					appendAlert(response, "#alert-container");
			}).fail(function(response){
				appendAlert(response, "#alert-container");
			}).always(function(response) {
				button.prop("disabled", false).removeClass("disabled");
			});
		});
	</script>
@stop

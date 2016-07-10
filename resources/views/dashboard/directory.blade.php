@extends("app")

@section("body")
	<h1>Pager Directory</h1>
	<div class="table-responsive">
		<table class="table table-striped datatable" id="pager-directory" width="100%">
			<thead>
				<tr>
					<th>Last Name</th>
					<th>First Name</th>
					<th>Pager</th>
	@if($user->isType("admin"))
					<th></th>
	@endif
				</tr>
			</thead>
		</table>
	</div>
	<div class="text-center">
		<a href="/directory_entries/csv?download=true" class="btn btn-default">Download for iPage (CSV)</a>
	</div>

	<!-- Edit entry modal -->
	<div class="modal fade" id="edit-entry-modal" tabindex="-1" role="dialog" aria-labelledby="edit-entry-label" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" id="edit-entry-label">Edit directory entry</h4>
				</div>
				<div class="modal-body">
					<input type="hidden" id="entry-id" />
					<div class="form-group">
						<label for="entry-first">First name</label>
						<input type="text" class="form-control" id="entry-first" />
					</div>
					<div class="form-group">
						<label for="entry-last">Last name</label>
						<input type="text" class="form-control" id="entry-last" />
					</div>
					<div class="form-group">
						<label for="entry-pager">Pager</label>
						<input type="tel" class="form-control" id="entry-pager" />
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-info" id="submit-edit-entry">Edit entry</button>
				</div>
			</div>
		</div>
	</div>
@stop

@section("script")
	<script>
		var directoryTable = $("#pager-directory").DataTable({
			ajax: {
				url: "/directory_entries",
				dataSrc: ""
			},
			columns: [
				{data: "last_name"},
				{data: "first_name"},
				{data: "pager"},
	@if($user->isType("admin"))
				{data: null, render: function(directoryEntry){
					var editButton = '<button class="btn btn-xs btn-info edit-directory-entry" '
						+ 'data-id="' + directoryEntry.id + '" data-first="' + directoryEntry.first_name + '" '
						+ 'data-last="' + directoryEntry.last_name + '" data-pager="' + directoryEntry.pager + '">'
						+ '<span class="glyphicon glyphicon-edit"></span> Edit</button>';

					var deleteButton = '<button class="btn btn-xs btn-danger remove-directory-entry" '
						+ 'data-id="' + directoryEntry.id + '">'
						+ '<span class="glyphicon glyphicon-remove"></span> Delete</button>';

					return editButton + " " + deleteButton;
				}}
	@endif
			],
			order: [[0, "asc"]]
		});


	@if($user->isType("admin"))

		$("#pager-directory").on("click", ".remove-directory-entry", function(){
			var entryId = $(this).data("id");
			var row = $(this).parents("tr");

			$.ajax({
				url: "/directory_entries/" + entryId,
				method: "POST", // DELETE
				data: {
					_token: "{{ csrf_token() }}",
					_method: "DELETE"
				}
			}).done(function(response){
				if(response === "success"){
					row.velocity("fadeOut", function(){
						directoryTable.row(row).remove().draw(false);
					});
				}
				else
					console.log(response);
			}).fail(function(){
				console.log("Error removing entry");
			});
		});

		$("#pager-directory").on("click", ".edit-directory-entry", function(){
			var id = $(this).data("id");
			var firstName = $(this).data("first");
			var lastName = $(this).data("last");
			var pager = $(this).data("pager");
			$("#entry-id").val(id);
			$("#entry-first").val(firstName);
			$("#entry-last").val(lastName);
			$("#entry-pager").val(pager);
			$("#edit-entry-modal").modal("show");
		});

		$("#submit-edit-entry").click(function(){
			var entryId = $("#entry-id").val();
			var data = {
				_token: "{{ csrf_token() }}",
				_method: "PATCH",
				first_name: $("#entry-first").val(),
				last_name: $("#entry-last").val(),
				pager: $("#entry-pager").val()
			};

			$.ajax({
				url: "/directory_entries/" + entryId,
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if(response === "success"){
					directoryTable.ajax.reload();
					$("#edit-entry-modal").modal("hide");
				}
				else
					appendAlert(response, "#edit-entry-modal .modal-body");
			}).fail(function(){
				appendAlert("Error editing entry", "#edit-entry-modal .modal-body");
			});
		});
	@endif
	</script>
@stop

@extends("app")

@section("head")
	<style>
		#download-directory-csv {
			display: block;
			margin: auto;
		}
	</style>
@stop

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
	<div class="form-group">
		<form method="get" action="/directory/csv">
			<button type="submit" class="btn" id="download-directory-csv">Download for iPage (CSV)</button>
		</form>
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
			ajax: "/directory/get"
		});

		$("#pager-directory").on("click", ".remove-directory-entry", function(){
			var data = {};
			data.id = $(this).data("id");
			data._token = "{{ csrf_token() }}";
			var row = $(this).parents("tr");

			$.post("/directory/delete", data, function(response){
				if(response === "success"){
					row.fadeOut(function(){
						directoryTable.row(row).remove().draw();
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
			var data = {};
			data._token = "{{ csrf_token() }}";
			data.id = $("#entry-id").val();
			data.first_name = $("#entry-first").val();
			data.last_name = $("#entry-last").val();
			data.pager = $("#entry-pager").val();

			$.post("/directory/edit", data, function(response){
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
	</script>
@stop

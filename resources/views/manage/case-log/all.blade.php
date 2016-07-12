@extends("app")

@section("body")

	@include("manage.case-log.locations")
</div>

<div class="container body-block">
	@include("manage.case-log.anesthesia-analgesia-types")
</div>

<div class="container body-block">
	@include("manage.case-log.blockade-sites")
</div>

@stop

@section("script")
	<script>
		var locationsTable = $("#locations-table").DataTable({
			ajax: {
				url: "/locations",
				dataSrc: ""
			},
			columns: [
				{data: "id"},
				{data: "name"},
				{data: null, render: function(location){
					var editButton = '<button type="button" class="btn btn-xs btn-info edit-location-button" '
						+ 'data-id="' + location.id + '" data-name="' + location.name + '">'
						+ '<span class="glyphicon glyphicon-edit"></span> Edit</button>';

					var deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-location-button" '
						+ 'data-id="' + location.id + '">'
						+ '<span class="glyphicon glyphicon-remove"></span> Delete</button>';

					return editButton + ' ' + deleteButton;
				}}
			],
			order: [[0, "desc"]]
		});

		var anesthesiaAnalgesiaTypesTable = $("#anesthesia-analgesia-types-table").DataTable({
			ajax: {
				url: "/anesthesia_analgesia_types",
				dataSrc: ""
			},
			columns: [
				{data: "id"},
				{data: "name"},
				{data: null, render: function(aaType){
					var editButton = '<button type="button" class="btn btn-xs btn-info edit-aa-type-button" '
						+ 'data-id="' + aaType.id + '" data-name="' + aaType.name + '">'
						+ '<span class="glyphicon glyphicon-edit"></span> Edit</button>';

					var deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-aa-type-button" '
						+ 'data-id="' + aaType.id + '">'
						+ '<span class="glyphicon glyphicon-remove"></span> Delete</button>';

					return editButton + ' ' + deleteButton;
				}}
			],
			order: [[0, "desc"]]
		});

		var blockadeSitesTable = $("#blockade-sites-table").DataTable({
			ajax: {
				url: "/blockade_sites",
				dataSrc: ""
			},
			columns: [
				{data: "id"},
				{data: "name"},
				{data: null, render: function(blockadeSite){
					var editButton = '<button type="button" class="btn btn-xs btn-info edit-blockade-site-button" '
						+ 'data-id="' + blockadeSite.id + '" data-name="' + blockadeSite.name + '">'
						+ '<span class="glyphicon glyphicon-edit"></span> Edit</button>';

					var deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-blockade-site-button" '
						+ 'data-id="' + blockadeSite.id + '">'
						+ '<span class="glyphicon glyphicon-remove"></span> Delete</button>';

					return editButton + ' ' + deleteButton;
				}}
			],
			order: [[0, "desc"]]
		});
	</script>
@stop

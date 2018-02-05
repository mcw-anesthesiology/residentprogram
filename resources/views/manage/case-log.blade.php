@extends("app")

@push("stylesheets")
	<link rel="stylesheet" href="{{ elixir('css/vue-manage.css') }}" />
	<style>
		.case-log-details-schema-schema {
			resize: vertical;
			white-space: pre;
			word-wrap: normal;
			overflow: auto;
		}
	</style>
@endpush

@section("blockless-body")
<div class="container body-block">
	<h1>Manage Case Log</h1>
	<div class="table-responsive">
		<h2>Locations
			<button type="button" class="btn btn-sm btn-success"
					@click="addLocation">
				<span class="glyphicon glyphicon-plus"></span>
				Add
			</button>
		</h2>

		<add-edit-location v-if="locationBeingEdited"
			v-bind="locationBeingEdited"
			@submit="handleLocationSubmit"
			@close="locationBeingEdited = null">
		</add-edit-location>

		<component-list v-if="locations"
				:items="locations"
				:fields="['id', 'name']"
				:paginate="false"
				reloadable
				@reload="fetchLocations">
			<template slot-scope="location">
				<div class="row component-list-item">
					<div class="col-sm-2">
						<small>#</small>
						@{{ location.id }}
					</div>
					<div class="col-sm-6">
						<small>Name</small>
						@{{ location.name }}
					</div>
					<div class="col-sm-4">
						<button type="button" class="btn btn-sm btn-info"
								@click="editLocation(location)">
							<span class="glyphicon glyphicon-edit"></span>
							Edit
						</button>
						<confirmation-button class="btn btn-sm btn-danger"
								@click="deleteLocation(location)">
							<span class="glyphicon glyphicon-remove"></span>
							Delete
						</confirmation-button>
					</div>
				</div>
			</template>
		</component-list>
	</div>

	<alert-list v-model="alerts"></alert-list>
</div>

<div class="container body-block">


	<json-schema-editor v-for="(schemas, detailsType) of detailsSchemas"
		:key="detailsType"
		:past-values="schemas"
		schema-id="https://www.residentprogram.com/schemas/case-log-details.json"
		:schema-urls="[
			'/schemas/case-log-details.json',
			'/schemas/questionnaire.json'
		]"
		:name="detailsType"
		:closeable="false"
		@submit="handleSchemaSubmit(detailsType, arguments[0])">
	</json-schema-editor>
</div>
@stop

@push("modals")
	<div class="modal fade" id="add-edit-case-log-modal" tabindex="-1" role="dialog" aria-labelledby="add-edit-case-log-modal-title" aria-hidden="true">
	  <div class="modal-dialog">
		<div class="modal-content">
		  <form role="form" method="post" id="add-edit-case-log-form">
			{!! csrf_field() !!}
			<input type="hidden" name="_method" value="PATCH" disabled />
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="add-edit-case-log-modal-title"></h4>
			</div>
			<div class="modal-body">
				<div class="form-group">
					<label for="add-edit-case-log-name">Name</label>
					<input type="text" class="form-control" name="name" id="add-edit-case-log-name" placeholder="Name" />
				</div>
				<div class="form-group">
					<label for="add-edit-case-log-type">Type</label>
					<select class="form-control" name="type" id="add-edit-case-log-type" placeholder="Select type">
						<option value="" disabled selected>Select type</option>
						<option value="neuraxial">Neuraxial</option>
						<option value="peripheral">Peripheral</option>
					</select>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button type="submit" class="btn btn-primary"></button>
			</div>
		  </form>
		</div>
	  </div>
	</div>
@endpush

@push("scripts")
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		var propsData = {
			detailsSchemas: {!! $schemas->toJson() !!}
		};

		createManageCaseLogs('main', propsData);
	</script>
@endpush

@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-manage.css') }}" />
@endpush

@section('blockless-body')
@verbatim
<div class="container body-block">
	<h1>Program administrators</h1>

	<alert-list v-model="alerts"></alert-list>

	<router-link to="add" class="btn btn-success">
		<span class="glyphicon glyphicon-plus"></span>
		Add
	</router-link>

	<router-view :program-administrators="programAdministrators"
		@alert="alerts.push"
		@reload="fetchProgramAdministrators">
	</router-view>

	<component-list v-if="programAdministrators"
				 :items="programAdministrators"
				 :fields="programAdministratorFields">
		<template slot="header">
			<div class="row">
				<div class="col-sm-3">
					<span>User</span>
				</div>
				<div class="col-sm-2">
					<span>Type</span>
				</div>
				<div class="col-sm-3">
					<span>Training level</span>
				</div>
				<div class="col-sm-3">
					<span>Secondary training level</span>
				</div>
			</div>
		</template>
		<template slot-scope="pa">
			<div class="row">
				<div class="col-sm-3">
					<span>{{ pa.user.full_name }}</span>
				</div>
				<div class="col-sm-2">
					<span>{{ ucfirst(pa.type) }}</span>
				</div>
				<div class="col-sm-3">
					<span>{{ renderTrainingLevel(pa.training_level) }}</span>
				</div>
				<div class="col-sm-3">
					<span>{{ renderSecondaryTrainingLevel(pa.secondary_training_level) }}</span>
				</div>
				<div class="col-sm-1">
					<router-link :to="`edit/${pa.id}`" class="btn btn-sm btn-info">
						<span class="glyphicon glyphicon-pencil"></span>
						Edit
					</router-link>
				</div>
			</div>
		</template>
	</component-list>
</div>
@endverbatim
@endsection

@push('scripts')
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManageProgramAdministrators('main');
	</script>
@endpush

@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-manage.css') }}" />
	<style>
		.component-list-header {
			border-bottom: 1px solid #888;
		}

		.component-item-heading {
			font-weight: bold;
			font-size: 1.1em;
		}
	</style>
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

	<router-view :program-administrators="programs"
		@alert="alerts.push"
		@reload="fetchPrograms">
	</router-view>

	<component-list v-if="programs"
				 :items="programs"
				 :fields="programFields"
				 reloadable
				 @reload="fetchPrograms">
		<template slot="header">
			<div class="row component-list-header">
				<div class="col-xs-3">
					<span class="component-item-heading">Name</span>
				</div>
				<div class="col-xs-2">
					<span class="component-item-heading">Type</span>
				</div>
				<div class="col-xs-2">
					<span class="component-item-heading">Training level</span>
				</div>
				<div class="col-xs-2">
					<span class="component-item-heading">Secondary training level</span>
				</div>
			</div>
		</template>
		<template slot-scope="program">
			<program-list-item :program="program" @alert="alerts.push" />
		</template>
	</component-list>
</div>
@endverbatim
@endsection

@push('scripts')
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManagePrograms('main');
	</script>
@endpush

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
		<template slot-scope="pa">
			<div class="component-list-item">
				<div class="row">
					<div class="col-xs-3">
						<span>{{ pa.name }}</span>
					</div>
					<div class="col-xs-2">
						<span>{{ ucfirst(pa.type) }}</span>
					</div>
					<div class="col-xs-2">
						<span>{{ renderTrainingLevel(pa.training_level) }}</span>
					</div>
					<div class="col-xs-2">
						<span>{{ renderSecondaryTrainingLevel(pa.secondary_training_level) }}</span>
					</div>
					<div class="col-xs-3">
						<router-link :to="`edit/${pa.id}`" class="btn btn-sm btn-info">
							<span class="glyphicon glyphicon-pencil"></span>
							Edit
						</router-link>
						<confirmation-button class="btn btn-sm btn-danger" @click="handleDelete(pa.id)">
							<span class="glyphicon glyphicon-remove"></span>
							Delete
						</confirmation-button>
					</div>
				</div>
				<div class="row">

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
		createManagePrograms('main');
	</script>
@endpush

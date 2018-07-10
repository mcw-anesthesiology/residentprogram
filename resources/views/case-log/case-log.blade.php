@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-case-log.css') }}" />
	<style>
		#case-log-table tr {
			cursor: pointer;
		}
	</style>
@endpush

@section('blockless-body')
<div class="container body-block">
	<h1>Case Log</h1>

	<start-end-date v-model="dates" all-time clearable></start-end-date>

	<component-list v-if="isAdmin"
			:fields="caseLogFields"
			:items="groupedCaseLogs"
			v-cloak>
		<template slot-scope="user">
			<li>
				<div class="panel panel-default">
					<div class="panel-heading">
						<span class="panel-title">
							@{{ user.full_name }}
						</span>
					</div>
					<div class="panel-body">
						<case-logs :case-logs="user.caseLogs"
							:locations="locations"
							removable
							@delete="deleteCaseLog">
						</case-logs>
					</div>
				</div>
			</li>
		</template>
	</component-list>
	<div v-else v-cloak>
		<case-logs
			:case-logs="caseLogs"
			:locations="locations"
			editable
			removable
			@delete="deleteCaseLog">
		</case-logs>
	</div>

	<router-link to="/new" class="btn btn-primary center-block">
		Add entry
	</router-link>

</div>

	<router-view
		form-title="RAAPS"
		:case-logs="caseLogs"
		:schema="detailsSchema.schema"
		:details-schema-id="detailsSchema.id"
		:locations="locations"
		help-class="is-required"
		@alert="alerts.push(arguments[0])"
		@close="$router.push('/')"
		@submit="handleEditorSubmit">
	</router-view>

<div class="container">
	<alert-list v-model="alerts"></alert-list>
</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-case-log.js') }}"></script>
	<script>
		var propsData = {
			user: {!! $user->toJson() !!},
			detailsSchema: {!! $detailsSchema->toJson() !!},
			locations: {!! $locations->toJson() !!}
		};

		createCaseLog('main', propsData);

	</script>
@endpush

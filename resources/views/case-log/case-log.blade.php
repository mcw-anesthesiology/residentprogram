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
	<div class="row">
		<div class="col-md-4 col-md-offset-8">
			<label class="containing-label" v-cloak>
				Report on
				<select class="form-control" id="case-log-details-report-name">
					<option v-for="subsection of subsections">
						@{{ subsection.name }}
					</option>
				</select>
			</label>
		</div>
	</div>
	<section id="case-log-stats-container"></section>

	<component-list v-if="isAdmin"
			:fields="caseLogFields"
			:items="groupedCaseLogs"
			v-cloak>
		<template scope="user">
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
		<case-logs :case-logs="caseLogs"
			:locations="locations">
		</case-logs>
	</div>

	@if($canLog)
	<show-hide-button class="btn btn-primary center-block"
			v-model="show.addCaseLog" v-cloak>
		entry
		<template slot="true">
			Cancel add
		</template>
		<template slot="false">
			Add
		</template>
		<template slot="glyph"></template>
	</show-hide-button>
	@endif

	<alert-list v-model="alerts"></alert-list>
</div>

	@if($canLog)
	<component v-if="show.addCaseLog" :is="editorComponent"
		title="RAAPS"
		:details-schema="detailsSchema"
		:locations="locations"
		@alert="alerts.push(arguments[0])"
		@submit="handleEditorSubmit">
	</component>
	@endif

@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
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

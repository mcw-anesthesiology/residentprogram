@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<h1>
			Manage merit forms
			<button type="button" class="btn btn-success"
					@click="addMerit">
				<span class="glyphicon glyphicon-plus"></span>
				Add form
			</button>
		</h1>
		<div v-if="merit" v-cloak>
			<div class="form-group">
				<label class="containing-label control-label">
					Form name
					<input class="form-control input-lg" type="text"
						:readonly="merit.id" :value="merit.name"
						@input="merit = Object.assign({}, merit, {name: $event.target.value})" />
				</label>
			</div>
			<json-schema-editor :current-value="merit.form"
				schema-url="/schemas/merit-report.json" name="merit form"
				@submit="handleMeritSubmit"
				@close="merit = null"></json-schema-editor>
		</div>
		
		<component-list :fields="formFields" :items="meritForms" v-cloak>
			<template scope="item">
				<merit-report-list-item v-bind="item" @click="merit = item">
				</merit-report-list-item>
			</template>
		</component-list>
		
		<alert-list v-model="alerts"></alert-list>
	</div>
	
	<div class="container body-block" v-cloak>
		<h2>Report forms</h2>
		<div v-for="(reportName, reportType) of meritReportTypes" class="row">
			<div class="col-sm-4">
				<h3>@{{ reportName }}</h3>
			</div>
			<div class="col-sm-8">
				<label class="containing-label">
					Form
					<select-two class="form-control"
							:value="meritReportTypeForms[reportType]"
							@input="handleReportTypeInput(reportType, arguments[0])">
						<option v-for="form of meritForms" :value="form.id">
							@{{ form.name }}
						</option>
					</select-two>
				</label>
			</div>
		</div>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		var propsData = {
			meritReportTypes: {!! json_encode(config('constants.MERIT_REPORT_TYPES')) !!}
		};
		
		var vm = createManageMerit('main', propsData);
	</script>
@endpush

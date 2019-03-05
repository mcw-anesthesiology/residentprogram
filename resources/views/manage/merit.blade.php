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
			<div class="form-group">
				<label class="containing-label">
					Report slug
					<input type="text" class="form-control"
						:value="merit.report_slug"
						@input="merit = Object.assign({}, merit, {report_slug: $event.target.value})" />
				</label>
			</div>
			<json-schema-editor :past-values="pastMeritForms"
				schema-id="https://www.residentprogram.com/schemas/merit-report.json"
				:schema-urls="['/schemas/merit-report.json', '/schemas/questionnaire.json']"
				name="merit form"
				@submit="handleMeritSubmit"
				@close="merit = null"></json-schema-editor>
		</div>

		<ul v-cloak>
			<merit-form-list-item v-for="forms of groupedMeritForms"
				:key="forms[0].name" :forms="forms"
				@click="editMeritForm(forms)"
				@delete="removeMeritForms(forms)">
			</merit-form-list-item>
		</ul>

		<alert-list v-model="alerts"></alert-list>
	</div>

	<div class="container body-block" v-cloak v-if="currentForms">
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
							:options="currentFormOptions"
							@input="handleReportTypeInput(reportType, arguments[0])">
					</select-two>
				</label>
			</div>
		</div>
	</div>
@stop

@push('scripts')
	<script>
		var propsData = {
			meritReportTypes: {!! json_encode(config('constants.MERIT_REPORT_TYPES')) !!}
		};

		var vm = createManageMerit('main', propsData);
	</script>
@endpush

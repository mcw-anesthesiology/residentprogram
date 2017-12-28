@extends("app")

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir("css/vue-reports.css") }}" />
	<style>
		.report-type-option {
			margin: 0 1em;
		}

		@media print {
			.reports-selector {
				display: none;
			}
		}
	</style>
@endpush

@section("blockless-body")
	<div>
		<div class="container body-block reports-selector">
			<fieldset>
				<legend>Report type</legend>
				<div class="form-inline" v-cloak>
					<router-link v-for="type of reportTypes" :key="type"
							:to="`/${type}`"
							class="report-type-option btn btn-default"
							active-class="disabled">
						@{{ kebabCaseToWords(type) }}
					</router-link>
				</div>
			</fieldset>
		</div>

		<router-view :users="users" :grouped-users="groupedUsers"></router-view>
	</div>
@stop

@section("script")
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-reports.js') }}"></script>
	<script>
		var vm = createReports('main');
	</script>
@stop

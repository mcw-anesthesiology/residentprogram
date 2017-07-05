@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-merit-reports.css') }}" />
	<style>
		.root-checklist {
			font-size: 1.25em;
		}
	</style>
@endpush

@section('blockless-body')
	<div class="container body-block root-checklist">
		<div class="form-summary panel panel-default">
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-6">
						<small>Report period</small>
						<rich-date-range :dates="dates" />
					</div>
					<div class="col-sm-6">
						<small>Checked items</small>
						@{{ checkedItems }}
					</div>
				</div>
			</div>
		</div>

		<print-view-checklist v-bind="meritReport">
		</print-view-checklist>

		<div v-if="meritReport.notes" v-cloak
				class="panel panel-default notes-container">
			<div class="panel-heading">
				Notes
			</div>
			<div class="panel-body">
				<textarea class="form-control"
					:value="meritReport.notes" readonly>
				</textarea>
			</div>
		</div>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-merit-reports.js') }}"></script>
	<script>
		var propsData = {
			user: {!! $user->toJson() !!},
			meritReport: {!! $report->toJson() !!}
		};

		createMeritReportPrintView('main', propsData);
	</script>
@endpush

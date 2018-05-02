@extends('app')

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-merit-reports.css') }}" />
@endpush

@section('blockless-body')
	<div class="container body-block">
		<merit-checklist v-bind="JSON.parse(form.form)" :user="user" readonly previewing />
	</div>
@endsection

@push('scripts')
	<script src="{{ elixir('js/vue-merit-reports.js') }}"></script>
	<script>
		var propsData = {
			user: {!! $user->toJson() !!},
			form: {!! $form->toJson() !!}
		};

		var vm = createViewMeritReportForm('main', propsData);
	</script>
@endpush

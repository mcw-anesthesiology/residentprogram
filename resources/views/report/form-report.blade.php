@extends("app")

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-reports.css') }}" />
@endpush

@section('blockless-body')
	<form-report :users="users"></form-report>
@endsection

@push('scripts')
	<script src="{{ elixir('js/vue-reports.js') }}"></script>
	<script>
		createFormReport('main');
	</script>
@endpush

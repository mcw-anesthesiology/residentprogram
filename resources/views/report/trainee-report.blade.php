@extends("app")

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-reports.css') }}" />
@endpush

@section('blockless-body')
	<trainee-report :users="users" :grouped-users="groupedUsers"></form-report>
@endsection

@push('scripts')
	<script src="{{ elixir('js/vue-reports.js') }}"></script>
	<script>
		createTraineeReport('main');
	</script>
@endpush

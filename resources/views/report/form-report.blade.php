@extends("app")

@section('blockless-body')
	<form-report :users="users"></form-report>
@endsection

@push('scripts')
	<script>
		createFormReport('main');
	</script>
@endpush

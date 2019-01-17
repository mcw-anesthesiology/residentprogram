@extends("app")

@section('blockless-body')
	<trainee-report :users="users" :grouped-users="groupedUsers"></form-report>
@endsection

@push('scripts')
	<script>
		createTraineeReport('main');
	</script>
@endpush

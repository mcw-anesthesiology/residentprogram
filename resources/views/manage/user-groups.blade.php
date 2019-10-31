@extends('app')

@section('blockless-body')
@verbatim
	<div class="container body-block">
		<h1>User groups</h1>

		<user-groups></user-groups>
	</div>
@endverbatim
@endsection

@push('scripts')
	<script>
		createManageUserGroups('main');
	</script>
@endpush

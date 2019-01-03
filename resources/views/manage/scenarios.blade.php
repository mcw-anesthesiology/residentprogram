@extends('app')

@section('blockless-body')
@verbatim
	<div class="container body-block">
		<h1>Scenarios</h1>

	</div>

	<router-view></router-view>
@endverbatim
@endsection

@push('scripts')
	<script>
		createManageScenarios('main');
	</script>
@endpush

@extends('base')

@section('pre-main')
	{{-- TODO: Should not do this, use inheretence --}}
	@if(empty($noNavbar) || !$noNavbar)
		@include("navbar")
	@endif
		<div id="alert-container">
	@if(session("success"))
			<div class="container">
				<div class="alert alert-success alert-dismissable" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					{{ session("success") }}
				</div>
			</div>
	@endif
	@if(session("error"))
			<div class="container">
				<div class="alert alert-danger alert-dismissable" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<strong>Error: </strong>{{ session("error") }}
				</div>
			</div>
	@endif
	@if(session("info"))
			<div class="container">
				<div class="alert alert-info alert-dismissable" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					{{ session("info") }}
				</div>
			</div>
	@endif
		</div>
		<div id="global-alert-list"></div>
@endsection

@section('main')
	@if(View::hasSection('body'))
			<div class="container body-block">
				@yield("body")
			</div>
	@endif

			@yield("blockless-body")
			@stack('bodies')
@endsection

@push('pre-scripts')
	<script>

	@if(empty($noNavbar) || !$noNavbar)
		createNews('#global-news-dropdown');
	@endif

		window.globalAlertVm = createGlobalAlerts('#global-alert-list');

		checkCookies(
			document.getElementById('alert-container'),
			'{{ config('app.admin_email') }}'
		);
	</script>
@endpush

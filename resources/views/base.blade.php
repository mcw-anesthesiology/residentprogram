<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
		<meta name="description" content="Milestone and competency based evaluation system for health care professionals">
		<meta name="author" content="Jacob Mischka">
		<meta name="csrf-token" content="{{ csrf_token() }}" />
		<link rel="shortcut icon" href="/favicon.ico">

		<title>{{ config('app.name') }}{{ Auth::check() ? ' | ' . Auth::user()->full_name : '' }}</title>

	@if (Auth::check())
		<script>
			var RESIDENTPROGRAM_USER = {
				id: {!! json_encode(Auth::user()->id) !!},
				username: {!! json_encode(Auth::user()->username) !!},
				email: {!! json_encode(Auth::user()->email) !!}
			};
		</script>
	@endif

	@if (App::environment("production"))
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-70580800-1', 'auto');
			ga('send', 'pageview');
		</script>
	@endif
		<link rel="stylesheet" href="{{ mix('vendor-styles.css') }}" />
		<link rel="stylesheet" href="{{ mix('global-styles.css') }}" />
		<link rel="stylesheet" href="{{ mix('common.css') }}" />
		<link rel="stylesheet" href="{{ mix('app.css') }}" />

		@yield('head')
		@stack('stylesheets')
		@stack('styles')
	</head>
	<body>

		@yield('pre-main')

		<main>
			@yield('main')
		</main>

		@yield('post-main')

		<script src="{{ mix('polyfills.js') }}"></script>
		<script src="{{ mix('common.js') }}"></script>
		<script src="{{ mix('vendor.js') }}"></script>
		<script src="{{ mix('app.js') }}"></script>

		@stack('pre-scripts')
		@yield('script')
		@stack('scripts')
	</body>
</html>

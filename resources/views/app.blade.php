<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Milestone and competency based evaluation system for health care professionals">
		<meta name="author" content="Jacob Mischka">
		<meta name="csrf-token" content="{{ csrf_token() }}" />
		<link rel="shortcut icon" href="/favicon.ico">

		<title>Resident Program Evaluation System</title>

	@if(App::environment("production"))
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-70580800-1', 'auto');
			ga('send', 'pageview');
		</script>
	@endif
		<link href="/css/vendor.css" rel="stylesheet" />
		<link href="/css/all.css" rel="stylesheet" />

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		  <script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		  <script src="//oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		@yield("head")
	</head>
	<body>
		<div class="container-fluid">
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
			@if(session("info"))
				<div class="container">
					<div class="alert alert-info alert-dismissable" role="alert">
						<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						{{ session("info") }}
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
			</div>
			<div class="container body-block">
				@yield("body")
			</div>
		</div>

	@if(empty($noNavbar) || !$noNavbar)
		@include("modals")
	@endif
		<script type="text/javascript" src="/js/vendor.js"></script>
		<script type="text/javascript" src="/js/all.js"></script>
		@yield("script")
	</body>
</html>

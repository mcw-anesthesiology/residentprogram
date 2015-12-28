<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Milestone and competency based evaluation system for health care professionals">
		<meta name="author" content="Jacob Mischka">
		<link rel="shortcut icon" href="/favicon.ico">

		<title>Resident Program Evaluation System</title>

	@if(App::environment("production"))
		<script src="/js/google-analytics.js"></script>
	@endif

		<!-- Bootstrap core CSS -->
		<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
		<link href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet">

		<!-- Select2 -->
		<link href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css" rel="stylesheet" />
		<link href="/css/select2-bootstrap.min.css" rel="stylesheet" />

		<!-- Custom styles for this template -->
		<link href="/css/main.css" rel="stylesheet" />
		<!-- <link href="https://cdn.datatables.net/1.10.1/css/jquery.dataTables.css" rel="stylesheet"> -->
		<link href="//cdn.datatables.net/responsive/2.0.0/css/responsive.dataTables.min.css" rel="stylesheet" />
		<link href="//cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet" />

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
			<div class="container body-block">
				@yield("body")
			</div>
		</div>

	@if(empty($noNavbar) || !$noNavbar)
		@include("modals")
	@endif
		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script type="text/javascript" src="/js/modernizr-custom.js"></script>
		<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="//cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript" src="//cdn.datatables.net/responsive/2.0.0/js/dataTables.responsive.min.js"></script>
		<script type="text/javascript" src="//cdn.datatables.net/fixedcolumns/3.0.4/js/dataTables.fixedColumns.min.js"></script>
		<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="//cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.js"></script>
		<script type="text/javascript" src="//code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js"></script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
		<script type="text/javascript" src="//cdn.datatables.net/plug-ins/1.10.9/sorting/datetime-moment.js"></script>
		<script type="text/javascript" src="/js/placeholders.jquery.min.js"></script>
		<script type="text/javascript" src="/js/main.js"></script>
		@yield("script")
	</body>
</html>

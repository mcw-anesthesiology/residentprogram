<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="sitelock-site-verification" content="1956" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Resident evaluation system">
		<meta name="author" content="Jacob Mischka">
		<link rel="shortcut icon" href="/favicon.ico">

		<title>Resident Program Evaluation System</title>

		<!-- Bootstrap core CSS -->
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
		<link href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet">

		<!-- Custom styles for this template -->
		<link href="/css/main.css" rel="stylesheet">
		<!-- <link href="https://cdn.datatables.net/1.10.1/css/jquery.dataTables.css" rel="stylesheet"> -->
		<link href="https://cdn.datatables.net/plug-ins/1.10.7/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<style>
			body {
				padding-top: 40px;
				padding-bottom: 40px;
				background-color: #eee;
			}

			.form-signin {
				max-width: 330px;
				padding: 15px;
				margin: 0 auto;
			}
			.form-signin .form-signin-heading,
			.form-signin .checkbox {
				margin-bottom: 10px;
			}
			.form-signin .checkbox {
				font-weight: normal;
			}
			.form-signin .form-control {
				position: relative;
				height: auto;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				padding: 10px;
				font-size: 16px;
			}
			.form-signin .form-control:focus {
				z-index: 2;
			}
			.form-signin input[type="email"] {
				margin-bottom: -1px;
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
			}
			.form-signin input[type="password"] {
				margin-bottom: 10px;
				border-top-left-radius: 0;
				border-top-right-radius: 0;
			}

			#info {
				margin: auto;
				text-align: center;
				width: 50%;
			}

			.btn-50 {
				width: 45%;
			}

			#home-button {
				float: right;
			}
		</style>
		@yield("head")
	</head>
	<body>
		<div class="container-fluid">
			@yield("body")
		</div>
		<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script>
			$("#home-button").click(function(){
				window.location.href = "/";
			});
		</script>
	</body>
</html>
